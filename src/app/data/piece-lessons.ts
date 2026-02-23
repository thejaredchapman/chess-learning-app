import { Lesson } from '../models/lesson.model';

export const PIECE_LESSONS: Lesson[] = [
  // ===== KING =====
  {
    id: 'piece-king',
    title: 'The King',
    description: 'Learn how the King moves and why it is the most important piece on the board.',
    category: 'pieces',
    icon: '\u2654',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The King is the most important piece in chess. If your King is checkmated, you lose the game. In the starting position, the white King sits on e1 and the black King on e8.'
      },
      {
        type: 'highlight',
        fen: '8/8/8/8/4K3/8/8/8 w - - 0 1',
        text: 'The King can move exactly one square in any direction: horizontally, vertically, or diagonally. Here you can see all the squares the King on e4 can reach.',
        highlightSquares: ['d3', 'd4', 'd5', 'e3', 'e5', 'f3', 'f4', 'f5']
      },
      {
        type: 'make-move',
        fen: '8/8/8/8/4K3/8/8/8 w - - 0 1',
        text: 'Move the King one square forward from e4 to e5.',
        correctMove: { from: 'e4', to: 'e5' }
      },
      {
        type: 'make-move',
        fen: '8/8/8/4K3/8/8/8/8 w - - 0 1',
        text: 'Great! Now move the King diagonally from e5 to d6.',
        correctMove: { from: 'e5', to: 'd6' }
      },
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'Tips: The King may seem weak since it only moves one square at a time, but it becomes a powerful piece in the endgame. Always keep your King safe in the opening and middlegame, and never forget: the King can never move into check!'
      }
    ]
  },

  // ===== QUEEN =====
  {
    id: 'piece-queen',
    title: 'The Queen',
    description: 'Learn how the Queen moves and why it is the most powerful piece on the board.',
    category: 'pieces',
    icon: '\u2655',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The Queen is the most powerful piece in chess. She combines the movement of both the Rook and the Bishop. In the starting position, the white Queen sits on d1 and the black Queen on d8.'
      },
      {
        type: 'highlight',
        fen: '8/8/8/8/3Q4/8/8/8 w - - 0 1',
        text: 'The Queen can move any number of squares in a straight line: horizontally, vertically, or diagonally. Here are the squares she can reach from d4.',
        highlightSquares: [
          'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4',
          'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8',
          'a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8',
          'a7', 'b6', 'c5', 'e3', 'f2', 'g1'
        ]
      },
      {
        type: 'make-move',
        fen: '8/8/8/8/3Q4/8/8/8 w - - 0 1',
        text: 'Move the Queen from d4 all the way across the board to d8.',
        correctMove: { from: 'd4', to: 'd8' }
      },
      {
        type: 'make-move',
        fen: '3Q4/8/8/8/8/8/8/8 w - - 0 1',
        text: 'Excellent! Now move the Queen diagonally from d8 to h4.',
        correctMove: { from: 'd8', to: 'h4' }
      },
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'Tips: The Queen is worth about 9 points, making her the most valuable piece after the King. Avoid bringing your Queen out too early in the opening, as she can become a target. Place her where she controls the most squares and coordinates with your other pieces.'
      }
    ]
  },

  // ===== ROOK =====
  {
    id: 'piece-rook',
    title: 'The Rook',
    description: 'Learn how the Rook moves along ranks and files.',
    category: 'pieces',
    icon: '\u2656',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The Rook is a powerful piece that moves in straight lines. In the starting position, white Rooks sit on a1 and h1, while black Rooks occupy a8 and h8.'
      },
      {
        type: 'highlight',
        fen: '8/8/8/8/4R3/8/8/8 w - - 0 1',
        text: 'The Rook can move any number of squares along a rank (row) or file (column). It cannot move diagonally. Here are all the squares the Rook on e4 can reach.',
        highlightSquares: [
          'a4', 'b4', 'c4', 'd4', 'f4', 'g4', 'h4',
          'e1', 'e2', 'e3', 'e5', 'e6', 'e7', 'e8'
        ]
      },
      {
        type: 'make-move',
        fen: '8/8/8/8/4R3/8/8/8 w - - 0 1',
        text: 'Move the Rook from e4 to e8, sliding all the way up the e-file.',
        correctMove: { from: 'e4', to: 'e8' }
      },
      {
        type: 'make-move',
        fen: '4R3/8/8/8/8/8/8/8 w - - 0 1',
        text: 'Well done! Now move the Rook horizontally from e8 to a8.',
        correctMove: { from: 'e8', to: 'a8' }
      },
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'Tips: The Rook is worth about 5 points. Rooks are most powerful on open files (columns with no pawns) and on the 7th rank where they can attack the opponent\'s pawns. Try to connect your Rooks so they defend each other along the back rank.'
      }
    ]
  },

  // ===== BISHOP =====
  {
    id: 'piece-bishop',
    title: 'The Bishop',
    description: 'Learn how the Bishop moves along diagonals.',
    category: 'pieces',
    icon: '\u2657',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The Bishop moves diagonally across the board. Each player starts with two Bishops: one on light squares and one on dark squares. The white Bishops begin on c1 and f1.'
      },
      {
        type: 'highlight',
        fen: '8/8/8/8/4B3/8/8/8 w - - 0 1',
        text: 'The Bishop can move any number of squares diagonally. A Bishop always stays on the same color square it started on. Here are the squares the Bishop on e4 can reach.',
        highlightSquares: [
          'b1', 'c2', 'd3', 'f5', 'g6', 'h7',
          'd5', 'c6', 'b7', 'a8',
          'f3', 'g2', 'h1'
        ]
      },
      {
        type: 'make-move',
        fen: '8/8/8/8/4B3/8/8/8 w - - 0 1',
        text: 'Move the Bishop diagonally from e4 to b7.',
        correctMove: { from: 'e4', to: 'b7' }
      },
      {
        type: 'make-move',
        fen: '8/1B6/8/8/8/8/8/8 w - - 0 1',
        text: 'Nice! Now move the Bishop from b7 to f3.',
        correctMove: { from: 'b7', to: 'f3' }
      },
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'Tips: The Bishop is worth about 3 points. Two Bishops working together (the "Bishop pair") are very strong because they cover both light and dark squares. Bishops love open diagonals and become more powerful as the board opens up in the middlegame and endgame.'
      }
    ]
  },

  // ===== KNIGHT =====
  {
    id: 'piece-knight',
    title: 'The Knight',
    description: 'Learn how the Knight moves in its unique L-shape pattern.',
    category: 'pieces',
    icon: '\u2658',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'The Knight is the trickiest piece to learn. It moves in an L-shape and is the only piece that can jump over other pieces. The white Knights start on b1 and g1.'
      },
      {
        type: 'highlight',
        fen: '8/8/8/8/4N3/8/8/8 w - - 0 1',
        text: 'The Knight moves in an L-shape: two squares in one direction and then one square perpendicular, or one square in one direction and two squares perpendicular. From e4, here are all 8 squares it can reach.',
        highlightSquares: ['d2', 'f2', 'c3', 'g3', 'c5', 'g5', 'd6', 'f6']
      },
      {
        type: 'make-move',
        fen: '8/8/8/8/4N3/8/8/8 w - - 0 1',
        text: 'Move the Knight from e4 to f6 using its L-shaped move.',
        correctMove: { from: 'e4', to: 'f6' }
      },
      {
        type: 'make-move',
        fen: '8/8/5N2/8/8/8/8/8 w - - 0 1',
        text: 'Excellent! Now move the Knight from f6 to e4, jumping it back to the center.',
        correctMove: { from: 'f6', to: 'e4' }
      },
      {
        type: 'highlight',
        fen: '8/8/8/8/4N3/8/8/8 w - - 0 1',
        text: 'Notice how the Knight always lands on the opposite color square from where it started. A Knight on a light square will always land on a dark square and vice versa.',
        highlightSquares: ['d2', 'f2', 'c3', 'g3', 'c5', 'g5', 'd6', 'f6']
      },
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'Tips: The Knight is worth about 3 points. Knights are strongest in closed positions with lots of pawns, where they can hop over obstacles. A Knight in the center of the board controls more squares than one on the edge. Remember the saying: "A Knight on the rim is dim!"'
      }
    ]
  },

  // ===== PAWN =====
  {
    id: 'piece-pawn',
    title: 'The Pawn',
    description: 'Learn how the Pawn moves, captures, and promotes.',
    category: 'pieces',
    icon: '\u2659',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'Pawns are the most numerous pieces. Each side starts with 8 pawns on the second rank. Though small, pawns are the soul of chess. They determine the structure of the game.'
      },
      {
        type: 'highlight',
        fen: '8/8/8/8/8/8/4P3/8 w - - 0 1',
        text: 'A Pawn moves forward one square at a time. From its starting rank (rank 2 for white), it has the option to move forward two squares on its first move. The Pawn on e2 can move to e3 or e4.',
        highlightSquares: ['e3', 'e4']
      },
      {
        type: 'make-move',
        fen: '8/8/8/8/8/8/4P3/8 w - - 0 1',
        text: 'Move the Pawn forward two squares from e2 to e4. This is the most popular opening move in chess!',
        correctMove: { from: 'e2', to: 'e4' }
      },
      {
        type: 'highlight',
        fen: '8/8/8/3p1p2/4P3/8/8/8 w - - 0 1',
        text: 'Pawns capture differently from how they move. They capture one square diagonally forward. This Pawn on e4 can capture the black pawns on d5 or f5, but it cannot move straight ahead if a piece blocks it.',
        highlightSquares: ['d5', 'f5']
      },
      {
        type: 'make-move',
        fen: '8/8/8/3p1p2/4P3/8/8/8 w - - 0 1',
        text: 'Capture the black pawn on d5 by moving the white Pawn from e4 to d5.',
        correctMove: { from: 'e4', to: 'd5' }
      },
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'Tips: Pawns are worth 1 point each. If a Pawn reaches the other side of the board (rank 8 for white, rank 1 for black), it promotes and becomes a Queen, Rook, Bishop, or Knight. Most players choose a Queen. Protect your pawns and advance them wisely to control the center!'
      }
    ]
  }
];
