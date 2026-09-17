// board.js — SVG chessboard renderer

var SQUARE_SIZE = 60;
var BOARD_SIZE = SQUARE_SIZE * 8; // 480
var MARGIN_LEFT   = 22; // space left of board for rank labels
var MARGIN_BOTTOM = 22; // space below board for file labels
var SVG_WIDTH  = BOARD_SIZE + MARGIN_LEFT;
var SVG_HEIGHT = BOARD_SIZE + MARGIN_BOTTOM;

// Orientation: false = White at the bottom (rank 1 on the last row);
// true = flipped, i.e. Black at the bottom (black repertoire view).
// Set this BEFORE createBoard() is called.
var BOARD_FLIP = false;

var PIECE_UNICODE = {
  wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
  // NB: bP is the only chess glyph with the Unicode Emoji property — iOS
  // renders it as a colour emoji unless the text-presentation selector
  // (U+FE0E) is appended, which is why it is spelled out here.
  bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "\u265F\uFE0E"
};

var LIGHT_SQUARE = "#f0d9b5";
var DARK_SQUARE  = "#b58863";
var HIGHLIGHT_FROM = "#cdd26a";
var HIGHLIGHT_TO   = "#aaa23a";

function squareToCoords(square) {
  var file = square.charCodeAt(0) - 97; // a=0, h=7
  var rank = parseInt(square[1], 10);   // 1–8
  var col = BOARD_FLIP ? 7 - file : file;
  var row = BOARD_FLIP ? rank - 1 : 8 - rank; // 0 = top row of the SVG
  return {
    x: MARGIN_LEFT + col * SQUARE_SIZE,
    y: row * SQUARE_SIZE
  };
}

function getInitialBoardState() {
  return {
    a1:"wR", b1:"wN", c1:"wB", d1:"wQ", e1:"wK", f1:"wB", g1:"wN", h1:"wR",
    a2:"wP", b2:"wP", c2:"wP", d2:"wP", e2:"wP", f2:"wP", g2:"wP", h2:"wP",
    a7:"bP", b7:"bP", c7:"bP", d7:"bP", e7:"bP", f7:"bP", g7:"bP", h7:"bP",
    a8:"bR", b8:"bN", c8:"bB", d8:"bQ", e8:"bK", f8:"bB", g8:"bN", h8:"bR"
  };
}

function applyStep(step, boardState) {
  // Shallow-copy the state
  var state = Object.assign({}, boardState);

  // Move the piece (overwrites any captured piece on `to`)
  state[step.to] = state[step.from];
  delete state[step.from];

  // Handle castling: also move the rook
  if (step.special === "castle-kingside") {
    if (step.piece === "wK") {
      state["f1"] = state["h1"]; delete state["h1"];
    } else {
      state["f8"] = state["h8"]; delete state["h8"];
    }
  } else if (step.special === "castle-queenside") {
    if (step.piece === "wK") {
      state["d1"] = state["a1"]; delete state["a1"];
    } else {
      state["d8"] = state["a8"]; delete state["a8"];
    }
  }

  return state;
}

function createBoard(container) {
  var svgNS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 " + SVG_WIDTH + " " + SVG_HEIGHT);
  svg.setAttribute("width", "100%");
  svg.style.display = "block";
  svg.id = "chess-svg";

  var squareLookup = new Map();

  // Draw 64 squares
  for (var rank = 8; rank >= 1; rank--) {
    for (var fi = 0; fi < 8; fi++) {
      var file = String.fromCharCode(97 + fi);
      var squareName = file + rank;
      var coords = squareToCoords(squareName);
      var x = coords.x;
      var y = coords.y;
      var isLight = (rank + fi) % 2 === 0;

      var rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", SQUARE_SIZE);
      rect.setAttribute("height", SQUARE_SIZE);
      rect.style.fill = isLight ? LIGHT_SQUARE : DARK_SQUARE;
      rect.classList.add("square");
      rect.dataset.square = squareName;
      rect.dataset.isLight = isLight ? "1" : "0";
      svg.appendChild(rect);
      squareLookup.set(squareName, rect);
    }
  }

  // Rank labels (1–8) — left of the board in the margin
  for (var r = 8; r >= 1; r--) {
    var lbl = document.createElementNS(svgNS, "text");
    lbl.setAttribute("x", MARGIN_LEFT - 5);
    var rankRow = BOARD_FLIP ? r - 1 : 8 - r;
    lbl.setAttribute("y", rankRow * SQUARE_SIZE + SQUARE_SIZE * 0.65);
    lbl.setAttribute("text-anchor", "end");
    lbl.setAttribute("fill", "#c8b890");
    lbl.classList.add("board-label");
    lbl.textContent = r;
    svg.appendChild(lbl);
  }

  // File labels (A–H) — below the board in the margin
  for (var fj = 0; fj < 8; fj++) {
    var flbl = document.createElementNS(svgNS, "text");
    var fileCol = BOARD_FLIP ? 7 - fj : fj;
    flbl.setAttribute("x", MARGIN_LEFT + fileCol * SQUARE_SIZE + SQUARE_SIZE / 2);
    flbl.setAttribute("y", BOARD_SIZE + MARGIN_BOTTOM - 4);
    flbl.setAttribute("text-anchor", "middle");
    flbl.setAttribute("fill", "#c8b890");
    flbl.classList.add("board-label");
    flbl.textContent = String.fromCharCode(65 + fj); // uppercase A–H
    svg.appendChild(flbl);
  }

  container.appendChild(svg);
  return { svg: svg, squareLookup: squareLookup };
}

function createPieceElement(pieceCode, square) {
  var svgNS = "http://www.w3.org/2000/svg";
  var g = document.createElementNS(svgNS, "g");
  g.classList.add("piece");
  g.dataset.square = square;

  var text = document.createElementNS(svgNS, "text");
  text.textContent = PIECE_UNICODE[pieceCode];
  text.setAttribute("x", SQUARE_SIZE / 2);
  text.setAttribute("y", Math.round(SQUARE_SIZE * 0.80));
  text.setAttribute("text-anchor", "middle");
  g.appendChild(text);

  var coords = squareToCoords(square);
  g.style.transform = "translate(" + coords.x + "px, " + coords.y + "px)";

  return g;
}

function renderPosition(boardState, svg, pieceLookup) {
  // Remove all existing piece elements from svg
  var existing = svg.querySelectorAll(".piece");
  for (var i = 0; i < existing.length; i++) {
    existing[i].parentNode.removeChild(existing[i]);
  }
  pieceLookup.clear();

  var squares = Object.keys(boardState);
  for (var j = 0; j < squares.length; j++) {
    var sq = squares[j];
    var code = boardState[sq];
    if (!code) continue;
    var el = createPieceElement(code, sq);
    svg.appendChild(el);
    pieceLookup.set(sq, el);
  }
}

function _movePieceInDom(fromSquare, toSquare, pieceLookup) {
  var el = pieceLookup.get(fromSquare);
  if (!el) return;
  var coords = squareToCoords(toSquare);
  el.style.transform = "translate(" + coords.x + "px, " + coords.y + "px)";
  el.dataset.square = toSquare;
  pieceLookup.delete(fromSquare);
  pieceLookup.set(toSquare, el);
}

function animateStep(step, pieceLookup, svg) {
  // Remove captured piece before moving piece arrives
  if (step.capture) {
    var captured = pieceLookup.get(step.to);
    if (captured && captured.parentNode) {
      captured.parentNode.removeChild(captured);
    }
    pieceLookup.delete(step.to);
  }

  // Animate the main piece
  _movePieceInDom(step.from, step.to, pieceLookup);

  // Handle castling: animate rook too
  if (step.special === "castle-kingside") {
    if (step.piece === "wK") {
      _movePieceInDom("h1", "f1", pieceLookup);
    } else {
      _movePieceInDom("h8", "f8", pieceLookup);
    }
  } else if (step.special === "castle-queenside") {
    if (step.piece === "wK") {
      _movePieceInDom("a1", "d1", pieceLookup);
    } else {
      _movePieceInDom("a8", "d8", pieceLookup);
    }
  }
}

function highlightSquares(fromSq, toSq, squareLookup) {
  squareLookup.forEach(function(rect, sq) {
    var fi = sq.charCodeAt(0) - 97;
    var rk = parseInt(sq[1], 10);
    var isLight = (rk + fi) % 2 === 0;
    rect.style.fill = isLight ? LIGHT_SQUARE : DARK_SQUARE;
  });
  if (fromSq && squareLookup.has(fromSq)) {
    squareLookup.get(fromSq).style.fill = HIGHLIGHT_FROM;
  }
  if (toSq && squareLookup.has(toSq)) {
    squareLookup.get(toSq).style.fill = HIGHLIGHT_TO;
  }
}
