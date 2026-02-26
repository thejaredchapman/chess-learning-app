import { Lesson } from '../models/lesson.model';

export const ENDGAME_LESSONS: Lesson[] = [
  {
    id: 'endgame-kq-vs-k',
    title: 'King + Queen vs King',
    description: 'Learn the box technique to checkmate with King and Queen',
    category: 'endgames',
    icon: '♕',
    steps: [
      {
        type: 'explain',
        fen: '8/8/8/8/3k4/8/8/KQ6 w - - 0 1',
        text: 'King + Queen vs a lone King is the most basic checkmate. The key concept is the "box technique" — use your Queen to restrict the enemy King to a smaller and smaller rectangle, then bring your King up to help deliver checkmate.',
      },
      {
        type: 'explain',
        fen: '8/8/8/8/3k4/8/8/KQ6 w - - 0 1',
        text: 'Step 1: Use the Queen to create a wall. The Queen can cut off ranks and files to restrict the enemy King. Place the Queen so it limits the King to one side of the board.',
        highlightSquares: ['b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
      },
      {
        type: 'make-move',
        fen: '8/8/8/8/3k4/8/8/KQ6 w - - 0 1',
        text: 'Move the Queen to b4 to create a barrier. The black King will be confined to ranks 5-8.',
        correctMove: { from: 'b1', to: 'b4' },
      },
      {
        type: 'explain',
        fen: '8/8/4k3/8/1Q6/8/8/K7 w - - 0 1',
        text: 'Step 2: When the enemy King approaches the Queen, move the Queen to maintain the barrier while shrinking the box. Always try to restrict the King to fewer squares.',
      },
      {
        type: 'explain',
        fen: '4k3/8/4Q3/8/8/8/8/4K3 w - - 0 1',
        text: 'Step 3: Once the King is pushed to the edge, bring your own King up to support the Queen. The checkmate always happens on the edge of the board.',
        highlightSquares: ['e1', 'e2', 'e3'],
      },
      {
        type: 'make-move',
        fen: '4k3/8/4Q3/8/8/8/8/4K3 w - - 0 1',
        text: 'Bring your King forward to support the Queen. Move the King to e2.',
        correctMove: { from: 'e1', to: 'e2' },
      },
      {
        type: 'explain',
        fen: '4k3/4Q3/8/8/8/8/8/4K3 w - - 0 1',
        text: 'The final position: with the King on the edge and your Queen controlling the escape squares, checkmate is achieved. Remember: never stalemate! Always leave the enemy King one move, then checkmate.',
        highlightSquares: ['d8', 'e8', 'f8'],
      },
    ],
  },
  {
    id: 'endgame-kr-vs-k',
    title: 'King + Rook vs King',
    description: 'Master the cutting off technique for Rook checkmates',
    category: 'endgames',
    icon: '♖',
    steps: [
      {
        type: 'explain',
        fen: '8/8/8/4k3/8/8/8/R3K3 w - - 0 1',
        text: 'King + Rook vs King requires patience but follows a clear method. The Rook cuts off the enemy King along a rank or file, then your King approaches to help push the enemy King to the edge.',
      },
      {
        type: 'explain',
        fen: '8/8/8/4k3/R7/8/8/4K3 w - - 0 1',
        text: 'The "cutting off" technique: Place your Rook on the 4th rank. Now the black King cannot cross to ranks 1-3. We\'ve restricted the King to half the board.',
        highlightSquares: ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
      },
      {
        type: 'make-move',
        fen: '8/8/8/4k3/8/8/8/R3K3 w - - 0 1',
        text: 'Cut off the black King by playing Ra4! This restricts the King to ranks 5-8.',
        correctMove: { from: 'a1', to: 'a4' },
      },
      {
        type: 'explain',
        fen: '8/4k3/8/8/R7/8/4K3/8 w - - 0 1',
        text: 'Step 2: Now bring your King up, approaching the enemy King. Your King needs to get to the 6th rank to help force the enemy King back.',
        highlightSquares: ['e2', 'e3', 'e4', 'e5'],
      },
      {
        type: 'make-move',
        fen: '8/4k3/8/8/R7/8/4K3/8 w - - 0 1',
        text: 'Advance your King toward the action. Play Ke3.',
        correctMove: { from: 'e2', to: 'e3' },
      },
      {
        type: 'explain',
        fen: '3k4/8/3K4/8/8/8/8/R7 w - - 0 1',
        text: 'When both Kings face each other on the same file with one rank between them, wait with the Rook. The black King must step aside, and then you push the barrier forward.',
        highlightSquares: ['d6', 'd8'],
      },
      {
        type: 'explain',
        fen: '3k4/R7/3K4/8/8/8/8/8 w - - 0 1',
        text: 'Finally, when the enemy King is on the edge, bring the Rook to the back rank for checkmate. The pattern: Kings opposed, Rook delivers the final blow on the edge rank.',
        highlightSquares: ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
      },
    ],
  },
  {
    id: 'endgame-kp',
    title: 'King + Pawn Endgames',
    description: 'Key squares, the square of the pawn, and promotion technique',
    category: 'endgames',
    icon: '♙',
    steps: [
      {
        type: 'explain',
        fen: '8/8/8/8/4P3/8/8/4K2k w - - 0 1',
        text: 'King and Pawn endgames are the foundation of all endgames. The most important concept is "key squares" — squares that, if your King reaches them, guarantee the pawn promotes.',
      },
      {
        type: 'explain',
        fen: '8/8/8/3KP3/8/8/8/4k3 w - - 0 1',
        text: 'For a pawn on e5, the key squares are d6, e6, and f6. If the White King stands on any of these squares, the pawn will promote regardless of whose turn it is.',
        highlightSquares: ['d6', 'e6', 'f6'],
      },
      {
        type: 'explain',
        fen: '8/8/8/4P3/8/8/8/4K2k w - - 0 1',
        text: 'The "Square of the Pawn": Draw a diagonal from the pawn to the promotion square — this forms a square. If the enemy King can step inside this square on their turn, they can catch the pawn.',
        highlightSquares: ['e5', 'e6', 'e7', 'e8', 'f5', 'f6', 'f7', 'f8', 'g5', 'g6', 'g7', 'g8', 'h5', 'h6', 'h7', 'h8'],
      },
      {
        type: 'make-move',
        fen: '8/8/8/4P3/8/8/8/4K2k w - - 0 1',
        text: 'The Black King on h1 is outside the square of the pawn on e5. Push the pawn forward! Play e6.',
        correctMove: { from: 'e5', to: 'e6' },
      },
      {
        type: 'explain',
        fen: '4k3/8/8/8/3KP3/8/8/8 w - - 0 1',
        text: 'The Rule of Opposition: When Kings face each other with one square between them, the side NOT to move has the "opposition." This is a crucial advantage in pawn endgames because the other King must give way.',
        highlightSquares: ['d4', 'e8'],
      },
      {
        type: 'make-move',
        fen: '4k3/8/8/8/3KP3/8/8/8 w - - 0 1',
        text: 'Take a step forward with your King toward the key squares. Play Kd5!',
        correctMove: { from: 'd4', to: 'd5' },
      },
      {
        type: 'explain',
        fen: '4k3/8/3K4/4P3/8/8/8/8 w - - 0 1',
        text: 'With the King on d6 controlling the key square, and the pawn on e5, the pawn will promote. The defending King cannot prevent it.',
        highlightSquares: ['d6', 'e6', 'f6'],
      },
    ],
  },
  {
    id: 'endgame-opposition',
    title: 'Opposition',
    description: 'Direct opposition, distant opposition, and zugzwang',
    category: 'endgames',
    icon: '♔',
    steps: [
      {
        type: 'explain',
        fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1',
        text: 'Opposition is one of the most important concepts in King and Pawn endgames. Two Kings are in "direct opposition" when they stand on the same rank or file with exactly one square between them.',
        highlightSquares: ['e6', 'e8'],
      },
      {
        type: 'explain',
        fen: '4k3/8/4K3/4P3/8/8/8/8 b - - 0 1',
        text: 'The side that does NOT have to move "has the opposition." Here, Black must move, so White has the opposition. The Black King must step aside, and White can advance.',
        highlightSquares: ['d8', 'f8'],
      },
      {
        type: 'make-move',
        fen: '3k4/8/4K3/4P3/8/8/8/8 w - - 0 1',
        text: 'Black moved to d8. Now advance to d6 to maintain the opposition and control the key squares for the pawn.',
        correctMove: { from: 'e6', to: 'd6' },
      },
      {
        type: 'explain',
        fen: '8/8/8/4k3/8/4K3/8/8 w - - 0 1',
        text: 'Distant Opposition: Kings are in "distant opposition" when they are separated by an odd number of squares (3, 5, 7) on the same rank or file. The same principle applies — the side not to move has the advantage.',
        highlightSquares: ['e3', 'e5'],
      },
      {
        type: 'make-move',
        fen: '8/8/8/4k3/8/4K3/8/8 w - - 0 1',
        text: 'Take the opposition! Move Ke4 to get directly in front of the enemy King.',
        correctMove: { from: 'e3', to: 'e4' },
      },
      {
        type: 'explain',
        fen: '8/4k3/8/4K3/4P3/8/8/8 b - - 0 1',
        text: 'Zugzwang means "compulsion to move" — a situation where any move worsens your position. In King and Pawn endgames, zugzwang is everywhere. Here Black is in zugzwang: any King move allows White to advance.',
        highlightSquares: ['d8', 'f8', 'd7', 'f7'],
      },
      {
        type: 'explain',
        fen: '4k3/8/4PK2/8/8/8/8/8 w - - 0 1',
        text: 'The winning technique combines opposition and key squares. Here White controls the key square f6, the pawn is ready to advance to e7, and checkmate or promotion is inevitable. Master these concepts and you will win many endgames!',
        highlightSquares: ['e6', 'f6', 'e8'],
      },
    ],
  },
];
