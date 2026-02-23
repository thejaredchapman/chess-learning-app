import { Lesson } from '../models/lesson.model';

export const OPENING_LESSONS: Lesson[] = [
  // ─── Lesson 1: Control the Center ───────────────────────────────────
  {
    id: 'opening-center',
    title: 'Control the Center',
    description:
      'Learn why occupying and controlling the central squares is the most important opening principle.',
    category: 'openings',
    icon: '📖',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The center of the board — the squares d4, d5, e4, and e5 — is the most important territory in chess. Pieces placed in or near the center control more squares and can reach both sides of the board quickly.',
      },
      {
        type: 'highlight',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'These four squares form the heart of the board. A pawn or piece on e4 controls more of the board than one sitting on a3. Aim to occupy or attack these squares from the very first move.',
        highlightSquares: ['d4', 'd5', 'e4', 'e5'],
      },
      {
        type: 'make-move',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The most popular first move in chess is 1.e4 — push your king pawn two squares forward. This immediately stakes a claim in the center and opens lines for your bishop and queen.',
        correctMove: { from: 'e2', to: 'e4' },
      },
      {
        type: 'make-move',
        fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        text: 'Another classical opening move is 1.d4. Try pushing the queen pawn two squares. Together e4 and d4 form a strong pawn center that limits your opponent\'s options.',
        correctMove: { from: 'd7', to: 'd5' },
        orientation: 'black',
      },
      {
        type: 'highlight',
        fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2',
        text: 'Now both sides have a pawn in the center. This symmetrical position is the start of many classical openings. Notice how the center pawns influence the squares around them — each pawn controls two diagonal squares.',
        highlightSquares: ['d5', 'e4', 'c4', 'e3', 'd4', 'f3', 'c6', 'e6', 'd6', 'f6'],
      },
    ],
  },

  // ─── Lesson 2: Develop Your Pieces ──────────────────────────────────
  {
    id: 'opening-development',
    title: 'Develop Your Pieces',
    description:
      'Get your knights and bishops into the game early. A piece on its starting square does nothing!',
    category: 'openings',
    icon: '📖',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
        text: 'After the first pawn moves, your next priority is development — bringing your knights and bishops off the back rank and into active positions. A piece still on its starting square is not contributing to the game.',
      },
      {
        type: 'make-move',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
        text: 'Develop your king-side knight to f3. Knights should usually come out before bishops because they have fewer good squares. Nf3 attacks the e5 pawn and helps control the center.',
        correctMove: { from: 'g1', to: 'f3' },
      },
      {
        type: 'make-move',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
        text: 'Black should develop too. Bring the queen-side knight to c6 to defend the e5 pawn and fight for the center. "Knights before bishops" is a reliable guideline.',
        correctMove: { from: 'b8', to: 'c6' },
        orientation: 'black',
      },
      {
        type: 'make-move',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
        text: 'Now develop the bishop. Place it on c4 where it targets the f7 square — the weakest point in Black\'s position at the start of the game. This is the beginning of the Italian Game.',
        correctMove: { from: 'f1', to: 'c4' },
      },
      {
        type: 'highlight',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
        text: 'After just three moves, White has two pieces developed and the center secured. Compare this to the pieces still on the back rank. The developed side has more options and flexibility. Avoid moving the same piece twice or bringing the queen out too early!',
        highlightSquares: ['f3', 'c4'],
      },
    ],
  },

  // ─── Lesson 3: King Safety ──────────────────────────────────────────
  {
    id: 'opening-king-safety',
    title: 'King Safety',
    description:
      'Castle early to tuck your king away. A king stuck in the center is a target for attacks.',
    category: 'openings',
    icon: '📖',
    steps: [
      {
        type: 'explain',
        fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        text: 'Once you have developed your knight and bishop on the king-side, you should castle as soon as possible. Castling moves your king to safety behind a wall of pawns and activates your rook at the same time.',
      },
      {
        type: 'highlight',
        fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        text: 'The king on e1 is exposed in the center. The e-file could open up, and the king blocks the rooks from connecting. Notice the clear path between the king and the h1 rook — everything is ready for king-side castling.',
        highlightSquares: ['e1', 'f1', 'g1', 'h1'],
      },
      {
        type: 'make-move',
        fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        text: 'Castle king-side now! Move your king from e1 to g1. The rook will automatically jump from h1 to f1. This single move improves your king safety and rook activity.',
        correctMove: { from: 'e1', to: 'g1' },
      },
      {
        type: 'highlight',
        fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4',
        text: 'Excellent! The king is now safely tucked on g1 behind the f2, g2, and h2 pawns. The rook on f1 is active and connected to the center. This is a solid, safe king position.',
        highlightSquares: ['g1', 'f2', 'g2', 'h2', 'f1'],
      },
      {
        type: 'explain',
        fen: 'r1bq1rk1/ppppnppp/2n5/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 6',
        text: 'Here both sides have castled. Their kings are safe, and both players can focus on the middlegame — fighting for control and launching attacks. Remember: if you delay castling, your opponent may rip open the center and attack your exposed king. Castle early, castle often!',
      },
    ],
  },

  // ─── Lesson 4: Common Openings ──────────────────────────────────────
  {
    id: 'opening-common',
    title: 'Common Openings',
    description:
      'A tour of three famous openings: the Italian Game, the Sicilian Defense, and the Queen\'s Gambit.',
    category: 'openings',
    icon: '📖',
    steps: [
      {
        type: 'auto-play',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The Italian Game begins with 1.e4 e5 2.Nf3 Nc6 3.Bc4. White develops quickly and aims the bishop at f7, the weakest square near Black\'s king. This is one of the oldest and most natural openings in chess.',
        autoPlayMoves: [
          { from: 'e2', to: 'e4' },
          { from: 'e7', to: 'e5' },
          { from: 'g1', to: 'f3' },
          { from: 'b8', to: 'c6' },
          { from: 'f1', to: 'c4' },
        ],
      },
      {
        type: 'highlight',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
        text: 'This is the Italian Game position. White\'s bishop on c4 eyes the f7 pawn, and the knight on f3 pressures e5. Black often responds with 3...Bc5 or 3...Nf6. This opening leads to open, tactical games.',
        highlightSquares: ['c4', 'f3', 'f7'],
      },
      {
        type: 'auto-play',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The Sicilian Defense starts with 1.e4 c5. Instead of meeting e4 with e5, Black plays c5, fighting for the center asymmetrically. The Sicilian is the most popular response to 1.e4 at the top level and leads to sharp, unbalanced positions.',
        autoPlayMoves: [
          { from: 'e2', to: 'e4' },
          { from: 'c7', to: 'c5' },
          { from: 'g1', to: 'f3' },
          { from: 'd7', to: 'd6' },
          { from: 'd2', to: 'd4' },
        ],
      },
      {
        type: 'auto-play',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The Queen\'s Gambit begins with 1.d4 d5 2.c4. White offers the c4 pawn to lure Black\'s d5 pawn away from the center. It is not a true sacrifice — if Black takes, White can easily win the pawn back. This classic opening leads to rich strategic play.',
        autoPlayMoves: [
          { from: 'd2', to: 'd4' },
          { from: 'd7', to: 'd5' },
          { from: 'c2', to: 'c4' },
        ],
      },
      {
        type: 'highlight',
        fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2',
        text: 'This is the Queen\'s Gambit. White\'s c4 pawn challenges Black\'s d5 pawn. Black can accept with 2...dxc4, decline with 2...e6 (Queen\'s Gambit Declined), or play 2...c6 (the Slav Defense). Each choice leads to very different kinds of games. Experiment and find the opening that suits your style!',
        highlightSquares: ['c4', 'd5', 'd4'],
      },
    ],
  },
];
