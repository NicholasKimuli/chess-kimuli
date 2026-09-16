// openings.js — the opening registry for chess.kimuli.me
//
// OPENINGS[key] = {
//   key        : string  — query-string id (?o=<key>)
//   side       : "white" | "black" — the side the lesson teaches
//   name       : string  — opening name (header + <title>)
//   subtitle   : string  — variation / guide subtitle
//   line       : string  — headline SAN line (landing page card)
//   intro      : string  — start-position copy (HTML allowed)
//   boardFlip  : boolean — true → render from Black's perspective
//   moves      : [ { ply, san, from, to, piece, capture, special, title, explanation } ]
// }
//
// special: null | "castle-kingside" | "castle-queenside"
// capture: null | piece code ("wP", "bN", …)

const OPENINGS = {

  // ─────────────────────────────────────────────────────────────
  // WHITE — Italian Game (Giuoco Piano main line)
  // 1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d4 exd4 6.cxd4 Bb4+
  // 7.Bd2 Bxd2+ 8.Nbxd2 O-O 9.O-O d6 10.Re1 Nd7 11.Nf1 Nf6 12.Ng3
  // ─────────────────────────────────────────────────────────────
  "italian": {
    key: "italian",
    side: "white",
    name: "Italian Game",
    subtitle: "Giuoco Piano — Step-by-Step Guide",
    line: "1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d4 exd4 6.cxd4",
    intro: "Click <strong>Next</strong> to begin the lesson. White will play the Italian Game, one of the oldest and most respected openings in chess history, refined over five centuries of play.",
    boardFlip: false,
    moves: [
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
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // BLACK — Sicilian Defence, Najdorf (main line / English Attack)
  // 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5
  // 7.Nb3 Be6 8.f3 Be7 9.Qd2 O-O 10.O-O-O Nbd7 11.g4 b5
  // ─────────────────────────────────────────────────────────────
  "sicilian-najdorf": {
    key: "sicilian-najdorf",
    side: "black",
    name: "Sicilian Defence",
    subtitle: "Najdorf — Main Line",
    line: "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5",
    intro: "Click <strong>Next</strong> to begin the lesson. Black will play the Sicilian Defence — the most ambitious answer to 1.e4 and the highest-scoring defence in the game. We follow the Najdorf, the most popular Sicilian in the world, in its modern main line.",
    boardFlip: true,
    moves: [
      {
        ply: 1, san: "e4", from: "e2", to: "e4", piece: "wP",
        capture: null, special: null,
        title: "1. e4 — White Takes the Center",
        explanation: "White's most popular first move: the e4 pawn grabs central space and opens lines for the queen and light-squared bishop. As a Sicilian player this is exactly the move you want to see — it gives Black the chance to unbalance the position from move one."
      },
      {
        ply: 2, san: "c5", from: "c7", to: "c5", piece: "bP",
        capture: null, special: null,
        title: "1… c5 — The Sicilian!",
        explanation: "The most ambitious answer to 1.e4, and the highest-scoring defence for Black at every level. Instead of mirroring with 1…e5, Black attacks the center from the wing: the c5 pawn fights for d4 and creates the asymmetry that gives Black real winning chances rather than a balanced game. Bobby Fischer and Garry Kasparov both made this their main weapon."
      },
      {
        ply: 3, san: "Nf3", from: "g1", to: "f3", piece: "wN",
        capture: null, special: null,
        title: "2. Nf3 — Develop and Prepare d4",
        explanation: "White develops toward the center and prepares d4 — the move that defines the Open Sicilian. The knight controls e5 and d4 and supports White's central expansion."
      },
      {
        ply: 4, san: "d6", from: "d7", to: "d6", piece: "bP",
        capture: null, special: null,
        title: "2… d6 — The Najdorf Move",
        explanation: "Black supports a future …e5, keeps the e-pawn flexible, and clears a path for the c8 bishop. This modest-looking pawn move identifies the Najdorf — the most popular Sicilian variation in the world, with well over 100,000 master games in the database."
      },
      {
        ply: 5, san: "d4", from: "d2", to: "d4", piece: "wP",
        capture: null, special: null,
        title: "3. d4 — The Open Sicilian",
        explanation: "White strikes in the center and opens the position. This is the Open Sicilian: White accepts an unbalanced fight with chances for both sides. If Black now dodges the tension, White gets a comfortable space advantage — so Black must take on d4."
      },
      {
        ply: 6, san: "cxd4", from: "c5", to: "d4", piece: "bP",
        capture: "wP", special: null,
        title: "3… cxd4 — A Wing Pawn for a Center Pawn",
        explanation: "Black trades the c5 pawn for White's central d4 pawn. In return Black gets the half-open c-file for the queen and rook, and the position loses its symmetry — which is the whole point of the Sicilian. Black may be slightly behind in space, but the resulting structure is full of dynamic chances."
      },
      {
        ply: 7, san: "Nxd4", from: "f3", to: "d4", piece: "wN",
        capture: "bP", special: null,
        title: "4. Nxd4 — White Recaptures",
        explanation: "White recaptures with the knight, which now sits in the center. From d4 the knight controls key squares — but it can also become a target for Black's pieces, which is part of Black's plan."
      },
      {
        ply: 8, san: "Nf6", from: "g8", to: "f6", piece: "bN",
        capture: null, special: null,
        title: "4… Nf6 — Hit e4 at Once",
        explanation: "Black develops with tempo, attacking the e4 pawn immediately. White must now spend a move defending it, which buys Black time to finish the queenside expansion. Every developing move that also creates a threat is a double win in the Sicilian."
      },
      {
        ply: 9, san: "Nc3", from: "b1", to: "c3", piece: "wN",
        capture: null, special: null,
        title: "5. Nc3 — Defend e4",
        explanation: "White defends the e4 pawn and develops a second piece. Forcing White into this natural but defensive setup is exactly what Black wants: Black now has a clear plan on the queenside while White must keep an eye on the e4 pawn."
      },
      {
        ply: 10, san: "a6", from: "a7", to: "a6", piece: "bP",
        capture: null, special: null,
        title: "5… a6 — The Najdorf Signature",
        explanation: "The defining move of the Najdorf. Black takes the b5 square away from White's pieces (no …Bb5+ check, no Nb5 jump) and prepares the queenside expansion …b5. It looks like a waiting move; in fact it is the first shot of Black's counterattack."
      },
      {
        ply: 11, san: "Be3", from: "c1", to: "e3", piece: "wB",
        capture: null, special: null,
        title: "6. Be3 — The English Attack",
        explanation: "White's most popular choice in modern practice. The bishop develops to the safe e3 square, ready to meet …Ng4 with Bg5 (or Bc1), and White prepares to castle queenside. White's plan is now clear: a kingside pawn storm — g4, h4, g5. Black must counter in the center and on the queenside."
      },
      {
        ply: 12, san: "e5", from: "e7", to: "e5", piece: "bP",
        capture: null, special: null,
        title: "6… e5 — Space with Tempo",
        explanation: "Black claims the center and kicks the d4-knight with tempo. This is the heart of the Najdorf: Black accepts the d5 hole in exchange for space, activity, and a clear plan. The pawn on e5 also takes f4 and d4 away from White's pieces, blunting the kingside attack."
      },
      {
        ply: 13, san: "Nb3", from: "d4", to: "b3", piece: "wN",
        capture: null, special: null,
        title: "7. Nb3 — The Knight Steps Aside",
        explanation: "The knight must retreat from d4. On b3 it is less active but keeps an eye on a5 and c5, and supports a future a4–a5 advance on the queenside. White has spent two moves on this knight, while Black's pieces are heading for good squares."
      },
      {
        ply: 14, san: "Be6", from: "c8", to: "e6", piece: "bB",
        capture: null, special: null,
        title: "7… Be6 — The Light-Square Bishop",
        explanation: "Black develops the 'problem' bishop to an active square. From e6 it covers d5 — the one real hole in Black's position — and eyes the b3 knight. Getting this bishop out before the center closes is a key goal of the Najdorf."
      },
      {
        ply: 15, san: "f3", from: "f2", to: "f3", piece: "wP",
        capture: null, special: null,
        title: "8. f3 — Building the Storm",
        explanation: "White prepares g4 and h4 to storm the castled king, and the pawn on f3 supports g4 without allowing …Ng4 tricks. White has committed to the attack — there is no turning back now."
      },
      {
        ply: 16, san: "Be7", from: "f8", to: "e7", piece: "bB",
        capture: null, special: null,
        title: "8… Be7 — Quiet Development",
        explanation: "Black develops the last bishop and clears the way to castle. Every quiet improving move that Black gets in while White prepares the attack counts double — the kingside storm takes time to build."
      },
      {
        ply: 17, san: "Qd2", from: "d1", to: "d2", piece: "wQ",
        capture: null, special: null,
        title: "9. Qd2 — Preparing to Castle Long",
        explanation: "White clears d1, connects the queen with the dark-squared bishop, and prepares queenside castling. The queen on d2 also supports the coming g5 push and the plan of Bh6 to trade off Black's defensive bishop."
      },
      {
        ply: 18, san: "O-O", from: "e8", to: "g8", piece: "bK",
        capture: null, special: "castle-kingside",
        title: "9… O-O — Castle Before the Storm",
        explanation: "Black castles into the coming attack — deliberately. The king is far safer behind the pawns than in the center, and the f8 rook will support the …f5 break or help defend the kingside. In a race like this, a king stuck in the middle loses."
      },
      {
        ply: 19, san: "O-O-O", from: "e1", to: "c1", piece: "wK",
        capture: null, special: "castle-queenside",
        title: "10. O-O-O — Opposite Sides: The Race Begins",
        explanation: "White castles long: the game is now a pure race. White storms the kingside with g4–g5 and h4–h5, Black storms the queenside with …b5–b4. Every tempo matters — this is the essence of the Najdorf, and why it has been the world's top players' choice for over fifty years."
      },
      {
        ply: 20, san: "Nbd7", from: "b8", to: "d7", piece: "bN",
        capture: null, special: null,
        title: "10… Nbd7 — The Last Piece Joins",
        explanation: "Black develops the final knight, opening the way for …b5 (the b8-knight no longer blocks the b-file). From d7 the knight can swing to b6 to hit c4 and a4, or to c5 — and it defends key squares around the king if needed."
      },
      {
        ply: 21, san: "g4", from: "g2", to: "g4", piece: "wP",
        capture: null, special: null,
        title: "11. g4 — The Attack Begins",
        explanation: "White launches the pawn storm. The plan is g4–g5, driving the f6-knight away and opening lines toward Black's king, with h4–h5 to follow and Bh6 to trade the defender on e7. Black must answer on the other wing immediately — defending passively here is a slow loss."
      },
      {
        ply: 22, san: "b5", from: "b7", to: "b5", piece: "bP",
        capture: null, special: null,
        title: "11… b5 — Counterattack on the Queenside",
        explanation: "This is the Najdorf's essence: while White attacks your king, you attack his. The move …b5–b4 will chase the c3-knight away, open lines against White's king on c1, and hand Black a pawn storm of his own. From here the game is razor-sharp — and Black's active pieces fully compensate for White's play on the kingside."
      }
    ]
  }
};
