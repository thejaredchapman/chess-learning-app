import { Lesson } from '../models/lesson.model';

export const STRATEGY_LESSONS: Lesson[] = [
  // ─── Lesson 1: Piece Values & Trades ───────────────────────────────
  {
    id: 'strategy-piece-values',
    title: 'Piece Values & Trades',
    description:
      'Learn the relative value of each piece and when trading material is advantageous.',
    category: 'strategy',
    icon: '🧠',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text:
          'Every piece has a relative point value that helps you evaluate trades. ' +
          'Pawn = 1, Knight = 3, Bishop = 3, Rook = 5, Queen = 9. ' +
          'The King is invaluable since losing it means losing the game. ' +
          'These values are guidelines, not absolute rules -- position matters too.',
      },
      {
        type: 'highlight',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text:
          'Here is the starting position. The minor pieces (knights and bishops) on b1, g1, c1, f1 are ' +
          'each worth about 3 pawns. Notice there are two of each -- together a knight and bishop pair ' +
          'equals roughly a rook (5) plus a pawn.',
        highlightSquares: ['b1', 'g1', 'c1', 'f1'],
      },
      {
        type: 'explain',
        fen: 'r1bqkb1r/pppppppp/2n2n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 2 3',
        text:
          'A favorable trade is one where you capture a higher-value piece with a lower-value one. ' +
          'For example, trading a knight (3) for a rook (5) wins you 2 points of material. ' +
          'This is called "winning the exchange." Always count the points before making a capture.',
      },
      {
        type: 'highlight',
        fen: 'r2qkb1r/ppp1pppp/2n2n2/3p1b2/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 4 4',
        text:
          'Consider this position. White could play exd5, trading a center pawn for Black\'s d5 pawn -- ' +
          'an equal trade (1 for 1). But capturing Nxd5 would allow Nxd5, still equal at 3 for 3. ' +
          'Equal trades are fine when you are ahead in material, but avoid them when behind.',
        highlightSquares: ['e4', 'd5', 'c3', 'f6'],
      },
      {
        type: 'make-move',
        fen: 'r2qkb1r/ppp2ppp/2n1pn2/3p4/3PP1b1/2NB1N2/PPP2PPP/R1BQK2R w KQkq - 0 6',
        text:
          'White\'s e4 pawn is attacked by Black\'s d5 pawn. Rather than let Black capture favorably, ' +
          'push the pawn forward with e5 to attack the knight on f6 (worth 3). Advance the pawn!',
        correctMove: { from: 'e4', to: 'e5' },
      },
    ],
  },

  // ─── Lesson 2: Forks, Pins & Skewers ──────────────────────────────
  {
    id: 'strategy-tactics',
    title: 'Forks, Pins & Skewers',
    description:
      'Master the three most important tactical motifs: forks, pins, and skewers.',
    category: 'strategy',
    icon: '🧠',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text:
          'Tactics are short sequences of moves that win material or deliver checkmate. ' +
          'The three most common tactical motifs are forks, pins, and skewers. ' +
          'Learning to spot these patterns will dramatically improve your game.',
      },
      {
        type: 'highlight',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
        text:
          'A FORK is when one piece attacks two or more enemy pieces at the same time. ' +
          'Knights are especially dangerous forking pieces because they jump over others. ' +
          'Here, White\'s queen on h5 eyes both the e5 pawn and the f7 pawn (the Scholar\'s Mate idea). ' +
          'The f7 square is only defended by the king.',
        highlightSquares: ['h5', 'e5', 'f7'],
      },
      {
        type: 'highlight',
        fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1b2P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4',
        text:
          'A PIN is when a piece cannot move because doing so would expose a more valuable piece behind it. ' +
          'Here, Black\'s bishop on b4 pins the knight on c3 to the king on e1. ' +
          'The knight cannot move without exposing the king to check!',
        highlightSquares: ['b4', 'c3', 'e1'],
        arrowFrom: 'b4',
        arrowTo: 'e1',
      },
      {
        type: 'explain',
        fen: 'r4rk1/ppp2ppp/2n2n2/3pp3/1bPq4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
        text:
          'A SKEWER is the reverse of a pin: a high-value piece is attacked and must move, ' +
          'exposing a less valuable piece behind it to capture. For example, a bishop checking a king ' +
          'along a diagonal where a rook sits behind the king -- once the king moves, the rook is lost. ' +
          'Always look for alignments of enemy pieces on ranks, files, and diagonals.',
      },
      {
        type: 'make-move',
        fen: 'r1bqk2r/pppp1ppp/2n5/4p3/2B1n3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
        text:
          'White can exploit the exposed f7 square with a fork! Move the bishop from c4 to f7, ' +
          'delivering check to the king while also attacking the queen. Play Bxf7+!',
        correctMove: { from: 'c4', to: 'f7' },
      },
    ],
  },

  // ─── Lesson 3: Pawn Structure ──────────────────────────────────────
  {
    id: 'strategy-pawns',
    title: 'Pawn Structure',
    description:
      'Understand doubled, isolated, and passed pawns and how they shape the game.',
    category: 'strategy',
    icon: '🧠',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text:
          'Pawns are the soul of chess. Unlike pieces, pawns cannot move backwards, so every ' +
          'pawn move permanently changes the structure of the position. A strong pawn structure ' +
          'provides outposts for your pieces, controls key squares, and can produce passed pawns ' +
          'in the endgame.',
      },
      {
        type: 'highlight',
        fen: 'r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2PP4/PP3PPP/RNBQKBNR b KQkq - 0 3',
        text:
          'DOUBLED PAWNS occur when two pawns of the same color are on the same file. ' +
          'Here, White has pawns on c3 and d3. While not always bad, doubled pawns ' +
          'are weaker because they cannot protect each other and the rear pawn is often blockaded. ' +
          'Avoid doubling pawns unless you gain compensation such as an open file.',
        highlightSquares: ['c3', 'd3'],
      },
      {
        type: 'highlight',
        fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3PP3/2P2N2/PP3PPP/RNBQKB1R w KQkq - 0 5',
        text:
          'An ISOLATED PAWN has no friendly pawns on adjacent files to support it. ' +
          'If White plays exd5 and Black recaptures exd5, the Black d5 pawn will be isolated -- ' +
          'no pawns on the c-file or e-file can protect it. Isolated pawns need piece support ' +
          'and can become targets in the endgame.',
        highlightSquares: ['d5', 'c5', 'e6'],
      },
      {
        type: 'highlight',
        fen: '4k3/8/8/3P4/8/8/p7/4K3 w - - 0 1',
        text:
          'A PASSED PAWN has no enemy pawns blocking or guarding its path to promotion. ' +
          'White\'s pawn on d5 is passed -- there are no Black pawns on the c, d, or e files ahead of it. ' +
          'Black\'s a2 pawn is also passed. Passed pawns are powerful in endgames because they ' +
          'force the opponent to use pieces to stop them from promoting.',
        highlightSquares: ['d5', 'a2'],
      },
      {
        type: 'make-move',
        fen: '4k3/8/8/3P4/8/8/8/4K3 w - - 0 1',
        text:
          'In this simplified endgame, White has a passed pawn on d5. Advance it toward promotion! ' +
          'Push the pawn to d6. Each step closer to the eighth rank makes it more dangerous.',
        correctMove: { from: 'd5', to: 'd6' },
      },
    ],
  },

  // ─── Lesson 4: Planning ────────────────────────────────────────────
  {
    id: 'strategy-planning',
    title: 'Planning',
    description:
      'Learn how to form a plan: improve your worst piece, create weaknesses, and coordinate your forces.',
    category: 'strategy',
    icon: '🧠',
    steps: [
      {
        type: 'explain',
        fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
        text:
          'A plan is a series of moves aimed at a specific goal. Without a plan, your moves ' +
          'lack coordination and purpose. To form a plan, ask yourself three questions: ' +
          '(1) What are the imbalances in the position? (2) Which side of the board should I play on? ' +
          '(3) What is the ideal square for each of my pieces?',
      },
      {
        type: 'highlight',
        fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
        text:
          'The first principle of planning: IMPROVE YOUR WORST PIECE. Look at all your pieces and ' +
          'find the one doing the least. Here, White\'s bishop on c1 is hemmed in behind the d3 pawn ' +
          'and the c3 knight. A good plan would be to reroute it -- perhaps via e3 or g5 -- ' +
          'where it actively targets the center or kingside.',
        highlightSquares: ['c1', 'e3', 'g5'],
      },
      {
        type: 'explain',
        fen: 'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPP1QPPP/R1B2RK1 w - - 0 8',
        text:
          'The second principle: CREATE WEAKNESSES in your opponent\'s position. A weakness is a ' +
          'square or pawn that is difficult to defend. You can create weaknesses by advancing pawns ' +
          'to provoke your opponent, exchanging key defenders, or redirecting your pieces to apply ' +
          'pressure on a specific point.',
      },
      {
        type: 'highlight',
        fen: 'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPP1QPPP/R1B2RK1 w - - 0 8',
        text:
          'The third principle: COORDINATE YOUR FORCES. Pieces working together are far more ' +
          'powerful than pieces operating alone. Here, White\'s queen on e2 and bishop on c4 both ' +
          'target the e6 and f7 squares. The knight on f3 also supports a future d4 or Ng5 push. ' +
          'Aim to have multiple pieces pointing at the same target.',
        highlightSquares: ['e2', 'c4', 'f3', 'f7'],
        arrowFrom: 'c4',
        arrowTo: 'f7',
      },
      {
        type: 'make-move',
        fen: 'r1bq1rk1/1pp2ppp/p1np1n2/2b1p3/2B1P3/2NP1N2/PPP1QPPP/R1B2RK1 w - - 0 8',
        text:
          'Time to improve the worst piece! White\'s c1 bishop is passive. Develop it to g5, ' +
          'where it pins the f6 knight to the queen on d8 and increases pressure on the kingside. ' +
          'Play Bg5!',
        correctMove: { from: 'c1', to: 'g5' },
      },
    ],
  },
];
