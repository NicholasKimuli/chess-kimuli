// app.js — wires the selected opening to the board and UI controls
//
// The opening is chosen with ?o=<key> (see openings.js). Title, copy, board
// orientation and move data all come from the registry, so adding an opening
// is a data change only.

document.addEventListener("DOMContentLoaded", function () {

  // ── Select the opening ───────────────────────────────────────
  // Priority: baked-in key (generated route page) → ?o= → URL path
  // (/{side}/{opening}/{variation}).
  function resolveKey() {
    if (window.OPENING_KEY) return window.OPENING_KEY;

    var query = new URLSearchParams(window.location.search).get("o");
    if (query) return query;

    var route = window.location.pathname.replace(/^\/+|\/+$/g, "");
    if (route) {
      for (var k in OPENINGS) {
        if (OPENINGS[k].route === route) return k;
      }
    }
    return null;
  }

  var key = resolveKey();
  var opening = (typeof OPENINGS !== "undefined" && key) ? OPENINGS[key] : null;

  if (!opening) {
    window.location.replace("/");   // unknown / missing → landing page
    return;
  }

  var MOVES = opening.moves;
  var startTitle = opening.name + " — " + opening.subtitle.split(" — ")[0];

  // Board orientation must be set before the board is built
  BOARD_FLIP = !!opening.boardFlip;

  // ── Header, badge and document metadata ──────────────────────
  document.getElementById("opening-name").textContent = opening.name;
  document.getElementById("opening-subtitle").textContent = opening.subtitle;

  var backLink = document.getElementById("back-link");
  if (backLink) {
    backLink.href = "/" + opening.side + "/";
    backLink.textContent = "← All " + (opening.side === "white" ? "White" : "Black") + " openings";
  }

  var badge = document.getElementById("side-badge");
  badge.textContent = opening.side === "white" ? "♙ Playing as White" : "♟ Playing as Black";
  badge.classList.add(opening.side === "white" ? "badge-white" : "badge-black");

  document.title = opening.name + " — " + opening.subtitle + " | chess.kimuli.me";
  var metaDesc = document.getElementById("page-description");
  if (metaDesc) {
    metaDesc.setAttribute("content",
      opening.name + " (" + opening.subtitle + ") — a step-by-step chess opening guide, move by move.");
  }

  // ── Board setup ──────────────────────────────────────────────
  var boardContainer = document.getElementById("board-container");
  var refs = createBoard(boardContainer);
  var svg = refs.svg;
  var squareLookup = refs.squareLookup;
  var pieceLookup = new Map();

  // Pre-compute all board states (0 = initial, N = after MOVES[N-1])
  var allBoardStates = [getInitialBoardState()];
  for (var i = 0; i < MOVES.length; i++) {
    allBoardStates.push(applyStep(MOVES[i], allBoardStates[i]));
  }

  // Render starting position
  renderPosition(allBoardStates[0], svg, pieceLookup);

  var stepIndex = -1; // -1 = starting position, 0..N-1 = after MOVES[stepIndex]

  // ── UI element refs ──────────────────────────────────────────
  var prevBtn        = document.getElementById("prev-btn");
  var nextBtn        = document.getElementById("next-btn");
  var stepCounter    = document.getElementById("step-counter");
  var moveTitle      = document.getElementById("move-title");
  var moveExplanation= document.getElementById("move-explanation");
  var moveListEl     = document.getElementById("move-list");

  // ── Build move list ──────────────────────────────────────────
  (function buildMoveList() {
    var html = "";
    for (var m = 0; m < MOVES.length; m += 2) {
      var moveNum = Math.floor(m / 2) + 1;
      var white = MOVES[m];
      var black = MOVES[m + 1];
      html += "<span class='move-pair'>";
      html += "<span class='move-num'>" + moveNum + ".</span>";
      html += "<span class='move white-move' data-ply='" + m + "'>" + white.san + "</span>";
      if (black) {
        html += "<span class='move black-move' data-ply='" + (m + 1) + "'>" + black.san + "</span>";
      }
      html += "</span> ";
    }
    moveListEl.innerHTML = html;
  })();

  // ── UI update ─────────────────────────────────────────────────
  function updateUI() {
    // Step counter
    if (stepIndex < 0) {
      stepCounter.textContent = "Start";
    } else {
      stepCounter.textContent = "Step " + (stepIndex + 1) + " of " + MOVES.length;
    }

    // Button states
    prevBtn.disabled = stepIndex < 0;
    nextBtn.disabled = stepIndex >= MOVES.length - 1;

    // Title and explanation
    if (stepIndex >= 0) {
      moveTitle.textContent       = MOVES[stepIndex].title;
      moveExplanation.innerHTML   = MOVES[stepIndex].explanation;
    } else {
      moveTitle.textContent       = startTitle;
      moveExplanation.innerHTML   = opening.intro;
    }

    // Move list highlighting
    var allMoveSpans = moveListEl.querySelectorAll(".move");
    for (var k = 0; k < allMoveSpans.length; k++) {
      allMoveSpans[k].classList.remove("active");
    }
    if (stepIndex >= 0) {
      var activeEl = moveListEl.querySelector(".move[data-ply='" + stepIndex + "']");
      if (activeEl) activeEl.classList.add("active");
    }
  }

  // ── Navigation ────────────────────────────────────────────────
  function goNext() {
    if (stepIndex >= MOVES.length - 1) return;
    stepIndex++;
    var step = MOVES[stepIndex];
    animateStep(step, pieceLookup, svg);
    highlightSquares(step.from, step.to, squareLookup);
    updateUI();
  }

  function goPrev() {
    if (stepIndex < 0) return;
    stepIndex--;
    var prevState = allBoardStates[stepIndex + 1];
    renderPosition(prevState, svg, pieceLookup);
    if (stepIndex >= 0) {
      var prevStep = MOVES[stepIndex];
      highlightSquares(prevStep.from, prevStep.to, squareLookup);
    } else {
      highlightSquares(null, null, squareLookup);
    }
    updateUI();
  }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft")  goPrev();
  });

  updateUI();
});
