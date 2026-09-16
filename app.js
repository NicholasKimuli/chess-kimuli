// app.js — wires board, moves, and UI controls

document.addEventListener("DOMContentLoaded", function () {

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

  var stepIndex = -1; // -1 = starting position, 0..22 = after MOVES[stepIndex]

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
      moveTitle.textContent       = "Italian Game — Giuoco Piano";
      moveExplanation.innerHTML   = "Click <strong>Next</strong> to begin the lesson. White will play the Italian Game, one of the oldest and most respected openings in chess history, refined over five centuries of play.";
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
