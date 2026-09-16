// Italian Game — Giuoco Piano main line
// 12 full moves (23 half-moves / plies)
// Line: 1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d4 exd4 6.cxd4 Bb4+
//       7.Bd2 Bxd2+ 8.Nbxd2 O-O 9.O-O d6 10.Re1 Nd7 11.Nf1 Nf6 12.Ng3

const MOVES = [
  {
    ply: 1, san: "e4", from: "e2", to: "e4", piece: "wP",
    capture: null, special: null,
    title: "1. e4 — Seize the Center",
    explanation: "White's first move stakes an immediate claim in the center. The e4 pawn controls d5 and f5, opens lines for the queen and bishop, and signals aggressive intent. This single pawn move sets the tone for one of chess's most exciting opening systems."
  },
  {
    ply: 2, san: "e5", from: "e7", to: "e5", piece: "bP",
    capture: null, special: null,
    title: "1… e5 — Mirror in the Center",
    explanation: "Black responds symmetrically, fighting for an equal share of the center. The e5 pawn controls d4 and f4, giving Black immediate influence on key squares. This direct reply leads to open, tactical play — exactly what the Italian Game is about."
  },
  {
    ply: 3, san: "Nf3", from: "g1", to: "f3", piece: "wN",
    capture: null, special: null,
    title: "2. Nf3 — Develop with a Threat",
    explanation: "The knight develops to its best square while immediately attacking the e5 pawn. White follows a core opening principle: every move should improve piece position and threaten something. Nf3 also prepares to castle kingside and controls the central d4 square."
  },
  {
    ply: 4, san: "Nc6", from: "b8", to: "c6", piece: "bN",
    capture: null, special: null,
    title: "2… Nc6 — Defend and Develop",
    explanation: "Black defends the e5 pawn with the most natural developing move. The c6 knight is well-placed, controlling the center and connecting pieces. Black refuses to give ground without compensation — this is the most principled response."
  },
  {
    ply: 5, san: "Bc4", from: "f1", to: "c4", piece: "wB",
    capture: null, special: null,
    title: "3. Bc4 — The Italian Bishop",
    explanation: "Welcome to the Italian Game! The bishop goes to c4, targeting the f7 pawn — the weakest point in Black's position (defended only by the king). This 'Italian bishop' is one of the most dangerous pieces in the opening, eyeing a quick attack on f7 and supporting a future d4 break."
  },
  {
    ply: 6, san: "Bc5", from: "f8", to: "c5", piece: "bB",
    capture: null, special: null,
    title: "3… Bc5 — The Giuoco Piano",
    explanation: "Black mirrors White's strategy, placing the bishop on the powerful c5 diagonal. This is the Giuoco Piano (Italian for 'quiet game'). Black's bishop eyes f2 — White's equivalent weak point. Both sides have active bishops and the position is dynamically balanced."
  },
  {
    ply: 7, san: "c3", from: "c2", to: "c3", piece: "wP",
    capture: null, special: null,
    title: "4. c3 — Prepare the Center Break",
    explanation: "A key move in the Giuoco Piano. White prepares to play d4, challenging Black's center and seizing more space. The c3 pawn also prevents Black's knight from jumping to b4. White's plan is clear: build a strong two-pawn center and use it to outplay Black in the middlegame."
  },
  {
    ply: 8, san: "Nf6", from: "g8", to: "f6", piece: "bN",
    capture: null, special: null,
    title: "4… Nf6 — Strike at e4!",
    explanation: "Black develops with aggression, immediately targeting White's e4 pawn. Black doesn't wait for White to build a big center — the f6 knight strikes at it right now. This knight is superbly placed, controlling d5 and e4, preparing to recapture if the center opens."
  },
  {
    ply: 9, san: "d4", from: "d2", to: "d4", piece: "wP",
    capture: null, special: null,
    title: "5. d4 — Strike in the Center!",
    explanation: "White executes the plan. The d4 pawn opens the game and challenges Black's e5 pawn directly. If Black captures exd4, White recaptures with cxd4 and gains a strong two-pawn center. This is the moment the Giuoco Piano sheds its 'quiet' label and becomes a real battleground."
  },
  {
    ply: 10, san: "exd4", from: "e5", to: "d4", piece: "bP",
    capture: "wP", special: null,
    title: "5… exd4 — Accept the Challenge",
    explanation: "Black captures the d4 pawn, opening the e-file and releasing central tension. Black takes the pawn but White will recapture and gain a strong center. The game is opening up significantly — both sides now need accurate play."
  },
  {
    ply: 11, san: "cxd4", from: "c3", to: "d4", piece: "wP",
    capture: "bP", special: null,
    title: "6. cxd4 — The Powerful Center",
    explanation: "White recaptures and now has a mighty pawn duo on d4 and e4, controlling the heart of the board. These two pawns give White space and restrict Black's pieces. The open c-file also becomes available for White's rooks in the future. White's position is brimming with energy."
  },
  {
    ply: 12, san: "Bb4+", from: "c5", to: "b4", piece: "bB",
    capture: null, special: null,
    title: "6… Bb4+ — A Timely Check!",
    explanation: "Before White consolidates, Black strikes with this bishop check. The check forces White to react immediately, potentially disrupting development. Black is saying: 'You have a strong center, but I won't give it to you for free.' White must now choose how to block."
  },
  {
    ply: 13, san: "Bd2", from: "c1", to: "d2", piece: "wB",
    capture: null, special: null,
    title: "7. Bd2 — Block and Invite the Trade",
    explanation: "White blocks the check with the c1 bishop, inviting Black to exchange. This is the solid, principled response: White willingly trades bishops to maintain the strong pawn center. After the exchange, White's knight will recapture on d2, developing a piece with tempo."
  },
  {
    ply: 14, san: "Bxd2+", from: "b4", to: "d2", piece: "bB",
    capture: "wB", special: null,
    title: "7… Bxd2+ — Forced Trade",
    explanation: "Black captures the bishop, maintaining the check and forcing White to react once more. The bishops are traded: Black has given up the active Italian bishop for White's 'bad' c1 bishop. The position simplifies slightly, but White's strong center and development lead remain intact."
  },
  {
    ply: 15, san: "Nbxd2", from: "b1", to: "d2", piece: "wN",
    capture: "bB", special: null,
    title: "8. Nbxd2 — Develop with Tempo",
    explanation: "The b1 knight develops to d2, recapturing the bishop and keeping the center solid. White now has both knights actively developed and the pawn center intact. The d2 knight has a clear plan: Nd2–f1–g3, heading to the kingside to support an attack. White's position is harmonious."
  },
  {
    ply: 16, san: "O-O", from: "e8", to: "g8", piece: "bK",
    capture: null, special: "castle-kingside",
    title: "8… O-O — Black Castles to Safety",
    explanation: "Black castles kingside, putting the king in a safe location and connecting the rooks. This is correct chess: when the center opens, castle early! Black's king will be much safer behind the kingside pawns than in the center. The h8 rook now becomes part of the game."
  },
  {
    ply: 17, san: "O-O", from: "e1", to: "g1", piece: "wK",
    capture: null, special: "castle-kingside",
    title: "9. O-O — White Castles Too",
    explanation: "White castles kingside, securing the king and bringing the h1 rook toward the center. Both kings are now safe. White's plan is to place a rook on e1 to control the e-file, then reroute the d2 knight to g3 via f1 for kingside pressure."
  },
  {
    ply: 18, san: "d6", from: "d7", to: "d6", piece: "bP",
    capture: null, special: null,
    title: "9… d6 — Solidify the Structure",
    explanation: "Black plays d6 to solidify the position and give the c8 bishop room to develop later. This is the Giuoco Pianissimo setup for Black: solid, flexible, no weaknesses. Black will aim to challenge White's center with …c6 and …d5 once fully developed."
  },
  {
    ply: 19, san: "Re1", from: "f1", to: "e1", piece: "wR",
    capture: null, special: null,
    title: "10. Re1 — Control the Open File",
    explanation: "The rook moves to e1, taking control of the semi-open e-file. This rook immediately becomes active: it supports the e4 pawn, eyes the e8 square, and can support a future e5 advance. This is textbook rook play — place rooks on open or half-open files where they have maximum influence."
  },
  {
    ply: 20, san: "Nd7", from: "f6", to: "d7", piece: "bN",
    capture: null, special: null,
    title: "10… Nd7 — Regroup the Knight",
    explanation: "Black's f6 knight moves to d7, regrouping to a more flexible square. From d7, the knight can go to f8 (defending the kingside), to f6 again, or support a central break with …c6 and …d5. Black keeps a solid formation and waits to challenge White's center at the right moment."
  },
  {
    ply: 21, san: "Nf1", from: "d2", to: "f1", piece: "wN",
    capture: null, special: null,
    title: "11. Nf1 — The Knight Maneuver Begins",
    explanation: "The d2 knight begins its journey to the kingside: Nd2–f1–g3. This maneuver is a hallmark of the Italian Game. From g3, the knight supports a kingside attack, can leap to f5 or h5, and reinforces the e4 pawn. Patient maneuvering like this is how White converts the opening advantage into a middlegame attack."
  },
  {
    ply: 22, san: "Nf6", from: "d7", to: "f6", piece: "bN",
    capture: null, special: null,
    title: "11… Nf6 — Back to the Best Square",
    explanation: "Black returns the knight to f6, its most active post. From here it attacks e4, defends against kingside threats, and controls key central squares. Black is completing development and preparing to counterattack White's center. The game is entering the early middlegame with rich play ahead for both sides."
  },
  {
    ply: 23, san: "Ng3", from: "f1", to: "g3", piece: "wN",
    capture: null, special: null,
    title: "12. Ng3 — The Knight Arrives!",
    explanation: "The knight completes its maneuver to g3 — an ideal kingside square. From g3, it eyes f5 (an outpost deep in Black's camp), supports an h4–h5 pawn storm, and adds pressure toward Black's king. White has achieved a textbook Italian Game position: strong center, active pieces, and genuine kingside attacking chances. Now the real chess begins!"
  }
];
