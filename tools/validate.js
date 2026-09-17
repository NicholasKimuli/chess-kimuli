#!/usr/bin/env node
// tools/validate.js — sanity-check every opening in openings.js before deploy
//
//   node tools/validate.js
//
// Checks, per opening:
//   • all required fields present, slugs well formed, route == side/opening/variation
//   • ply numbering is 1..N with no gaps
//   • the piece named in "piece" really is on the "from" square at that point
//   • "capture" agrees with the SAN (x in san ⇔ capture set)
//   • SAN piece letters agree with "piece"; castling uses the right "special"
//   • the headline "line" matches the first moves of the lesson
//   • the lesson replays end to end without landing a piece on an occupied square
//
// Exits non-zero if anything fails (CI runs this before build.js).

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const ctx = { console };
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(path.join(ROOT, "board.js"), "utf8") + "\n" +
  fs.readFileSync(path.join(ROOT, "openings.js"), "utf8") + "\n" +
  ";this.__API__ = { OPENINGS: OPENINGS, initial: getInitialBoardState, apply: applyStep };",
  ctx
);

const { OPENINGS, initial, apply } = ctx.__API__;
const errors = [];
const notes = [];

const fail = (where, msg) => errors.push(`${where}: ${msg}`);

// ── legal-move geometry ──────────────────────────────────────────────────────
const FILES = "abcdefgh";
const fileOf = sq => FILES.indexOf(sq[0]);
const rankOf = sq => Number(sq[1]);
const typeOf = code => code[1];
const colorOf = code => code[0];

function pathClear(from, to, st) {
  const df = Math.sign(fileOf(to) - fileOf(from));
  const dr = Math.sign(rankOf(to) - rankOf(from));
  let f = fileOf(from) + df, r = rankOf(from) + dr;
  while (f !== fileOf(to) || r !== rankOf(to)) {
    if (st[FILES[f] + r]) return false;
    f += df; r += dr;
  }
  return true;
}

// Is the move geometrically possible for this piece (ignoring pins/checks)?
function geometryOk(m, st) {
  const df = fileOf(m.to) - fileOf(m.from);
  const dr = rankOf(m.to) - rankOf(m.from);
  const adf = Math.abs(df), adr = Math.abs(dr);
  const type = typeOf(m.piece);
  const forward = colorOf(m.piece) === "w" ? 1 : -1;

  switch (type) {
    case "N":
      return (adf === 1 && adr === 2) || (adf === 2 && adr === 1);
    case "B":
      return adf === adr && adf > 0 && pathClear(m.from, m.to, st);
    case "R":
      return (adf === 0) !== (adr === 0) && pathClear(m.from, m.to, st);
    case "Q":
      return ((adf === adr && adf > 0) || (adf === 0) !== (adr === 0)) && pathClear(m.from, m.to, st);
    case "K":
      return adf <= 1 && adr <= 1 && adf + adr > 0;
    case "P": {
      if (df === 0) {
        if (dr === forward) return !st[m.to];
        if (dr === 2 * forward) {
          const startRank = forward === 1 ? 2 : 7;
          const mid = FILES[fileOf(m.from)] + (rankOf(m.from) + forward);
          return rankOf(m.from) === startRank && !st[mid] && !st[m.to];
        }
        return false;
      }
      return adf === 1 && dr === forward;   // diagonal: only as a capture (checked separately)
    }
    default:
      return false;
  }
}

// Castling: right rook, squares between empty, king on its home square.
function castleError(m, st) {
  const white = colorOf(m.piece) === "w";
  const rank = white ? "1" : "8";
  const king = (white ? "w" : "b") + "K";
  const rook = (white ? "w" : "b") + "R";
  if (st["e" + rank] !== king) return `castling with the king not on e${rank}`;
  if (m.special === "castle-kingside") {
    if (m.to !== "g" + rank) return `kingside castling must end on g${rank}`;
    if (st["h" + rank] !== rook) return `no rook on h${rank} to castle with`;
    for (const f of ["f", "g"]) if (st[f + rank]) return `${f}${rank} is occupied`;
  } else if (m.special === "castle-queenside") {
    if (m.to !== "c" + rank) return `queenside castling must end on c${rank}`;
    if (st["a" + rank] !== rook) return `no rook on a${rank} to castle with`;
    for (const f of ["b", "c", "d"]) if (st[f + rank]) return `${f}${rank} is occupied`;
  }
  return null;
}

function checkMove(where, m, i, st) {
  if (m.ply !== i + 1) fail(where, `ply is ${m.ply}, expected ${i + 1}`);

  for (const f of ["san", "from", "to", "piece", "title", "explanation"]) {
    if (m[f] === undefined || m[f] === "") fail(where, `move ${m.ply} is missing "${f}"`);
  }
  if (!/^[a-h][1-8]$/.test(m.from) || !/^[a-h][1-8]$/.test(m.to)) {
    fail(where, `move ${m.ply} has a malformed square (${m.from} → ${m.to})`);
  }
  if (!/^[wb][KQRBNP]$/.test(m.piece)) fail(where, `move ${m.ply} has bad piece code "${m.piece}"`);

  const onFrom = st[m.from];
  if (!onFrom) fail(where, `move ${m.ply} (${m.san}): no piece on ${m.from}`);
  else if (onFrom !== m.piece) fail(where, `move ${m.ply} (${m.san}): ${m.from} holds ${onFrom}, not ${m.piece}`);

  if (m.capture && st[m.to] !== m.capture) {
    fail(where, `move ${m.ply} (${m.san}): expected ${m.capture} on ${m.to}, found ${st[m.to]}`);
  }
  if (!m.capture && st[m.to]) {
    fail(where, `move ${m.ply} (${m.san}): ${m.to} is occupied by ${st[m.to]} but capture is null`);
  }
  if (m.capture && colorOf(m.capture) === colorOf(m.piece)) {
    fail(where, `move ${m.ply} (${m.san}): capture target ${m.capture} is the same colour as ${m.piece}`);
  }

  // geometry / castling legality
  if (onFrom === m.piece) {
    if (m.special) {
      const ce = castleError(m, st);
      if (ce) fail(where, `move ${m.ply} (${m.san}): ${ce}`);
    } else if (!geometryOk(m, st)) {
      fail(where, `move ${m.ply} (${m.san}): ${m.piece} at ${m.from} cannot legally move to ${m.to}`);
    }
    if (typeOf(m.piece) === "P" && fileOf(m.from) !== fileOf(m.to) && !m.capture) {
      fail(where, `move ${m.ply} (${m.san}): pawn moves diagonally to ${m.to} but nothing is captured`);
    }
  }

  const san = String(m.san || "");
  if (san === "O-O" || san === "O-O-O") {
    const want = san === "O-O" ? "castle-kingside" : "castle-queenside";
    if (m.special !== want) fail(where, `move ${m.ply}: ${san} needs special "${want}", got ${m.special}`);
  } else {
    if (m.special) fail(where, `move ${m.ply} (${san}): unexpected special "${m.special}"`);
    const isPiece = /^[NBRQK]/.test(san);
    if (isPiece && san[0] !== m.piece[1]) fail(where, `move ${m.ply}: SAN piece "${san[0]}" != piece ${m.piece}`);
    if (!isPiece && m.piece[1] !== "P") fail(where, `move ${m.ply} (${san}): looks like a pawn move but piece is ${m.piece}`);
    if (san.includes("x") !== !!m.capture) fail(where, `move ${m.ply} (${san}): capture flag mismatch`);
  }
}

function checkOpening(key, o) {
  const where = `[${key}]`;
  const required = ["key", "side", "opening", "variation", "route", "name", "subtitle", "line", "blurb", "intro", "boardFlip", "moves"];
  for (const f of required) {
    if (o[f] === undefined || o[f] === "") fail(where, `missing field "${f}"`);
  }
  if (!["white", "black"].includes(o.side)) fail(where, `side must be "white" or "black" (got "${o.side}")`);
  for (const f of ["opening", "variation"]) {
    if (!SLUG.test(o[f] || "")) fail(where, `"${f}" must be a lowercase slug (got "${o[f]}")`);
  }
  const expected = `${o.side}/${o.opening}/${o.variation}`;
  if (o.route !== expected) fail(where, `route "${o.route}" should be "${expected}"`);
  if (typeof o.boardFlip !== "boolean") fail(where, "boardFlip must be a boolean");
  if (o.side === "black" && o.boardFlip !== true) fail(where, "black lessons should set boardFlip: true");
  if (o.side === "white" && o.boardFlip === true) fail(where, "white lessons should keep boardFlip: false");

  if (!Array.isArray(o.moves) || !o.moves.length) {
    fail(where, "moves array is empty");
    return;
  }

  // headline line must match the opening moves
  const san = String(o.moves[0].san);
  const wantFirst = san.replace(/^(\d+)?\.*/, "");
  const lineTokens = String(o.line).split(/\s+/).map(t => t.replace(/^\d+\.+/, "")).filter(Boolean);
  if (lineTokens.length && lineTokens[0] !== wantFirst) {
    fail(where, `headline line starts "${lineTokens[0]}" but the lesson starts "${wantFirst}"`);
  } else {
    lineTokens.forEach((t, i) => {
      if (o.moves[i] && o.moves[i].san !== t) {
        fail(where, `headline line token ${i + 1} is "${t}" but move ${i + 1} is "${o.moves[i].san}"`);
      }
    });
  }

  // replay
  let st = initial();
  const captured = [];
  o.moves.forEach((m, i) => {
    checkMove(where, m, i, st);
    if (m.capture) captured.push(m.capture);
    st = apply(m, st);
  });

  const counts = {};
  Object.values(st).forEach(p => counts[p] = (counts[p] || 0) + 1);
  const kings = (counts.wK || 0) + (counts.bK || 0);
  if (kings !== 2) fail(where, `lesson ends with ${kings} kings (expected 2)`);

  notes.push(
    `${key.padEnd(18)} ${String(o.moves.length).padStart(2)} moves  route ${o.route.padEnd(28)}` +
    ` pieces left ${Object.values(counts).reduce((a, b) => a + b, 0)}  captured ${captured.length}`
  );
}

// ── run ──────────────────────────────────────────────────────────────────────
const keys = Object.keys(OPENINGS);
const seenRoutes = new Map();
for (const key of keys) {
  const o = OPENINGS[key];
  if (o.key !== key) fail(`[${key}]`, `registry key "${key}" != entry key "${o.key}"`);
  if (seenRoutes.has(o.route)) fail(`[${key}]`, `route "${o.route}" already used by "${seenRoutes.get(o.route)}"`);
  seenRoutes.set(o.route, key);
  checkOpening(key, o);
}

console.log("validate.js — opening data check\n");
notes.forEach(n => console.log("  ✓ " + n));

if (errors.length) {
  console.log(`\n${errors.length} problem(s):`);
  errors.forEach(e => console.log("  ✗ " + e));
  process.exit(1);
}
console.log(`\n${keys.length} opening(s) valid.`);
