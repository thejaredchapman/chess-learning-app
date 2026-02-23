import { Lesson } from '../models/lesson.model';

export const RULES_LESSONS: Lesson[] = [
  // ─── Lesson 1: Castling ───────────────────────────────────────────────
  {
    id: 'rules-castling',
    title: 'Castling',
    description:
      'Learn kingside and queenside castling — the only move where two pieces move at once.',
    category: 'rules',
    icon: '♚',
    steps: [
      {
        type: 'explain',
        fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
        text: 'Castling is a special move that lets you move your King two squares toward a Rook, and the Rook jumps to the other side of the King. It is the only move in chess where two pieces move at the same time. Castling helps you tuck your King into safety while activating your Rook.',
      },
      {
        type: 'highlight',
        fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
        text: 'Kingside castling (also called "castling short"): The King moves two squares toward the h-file Rook, and the Rook jumps to the square the King crossed. For White the King goes from e1 to g1, and the Rook goes from h1 to f1.',
        highlightSquares: ['e1', 'g1', 'h1', 'f1'],
      },
      {
        type: 'make-move',
        fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
        text: 'Try it! Castle kingside by moving the White King from e1 to g1.',
        correctMove: { from: 'e1', to: 'g1' },
      },
      {
        type: 'highlight',
        fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
        text: 'Queenside castling (also called "castling long"): The King moves two squares toward the a-file Rook. For White the King goes from e1 to c1, and the Rook goes from a1 to d1. Note that the Rook crosses three squares but the King still moves only two.',
        highlightSquares: ['e1', 'c1', 'a1', 'd1'],
      },
      {
        type: 'explain',
        fen: 'r3k2r/pppppppp/8/8/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
        text: 'Castling is NOT allowed if: (1) the King or the involved Rook has already moved, (2) there are pieces between the King and the Rook, (3) the King is currently in check, (4) the King would pass through a square attacked by an enemy piece, or (5) the King would land on an attacked square. Always make sure the path is safe!',
      },
    ],
  },

  // ─── Lesson 2: En Passant ─────────────────────────────────────────────
  {
    id: 'rules-en-passant',
    title: 'En Passant',
    description:
      'Master the tricky en passant capture — a special pawn-takes-pawn move that surprises beginners.',
    category: 'rules',
    icon: '♟',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'En passant (French for "in passing") is a special pawn capture. It can only happen immediately after an opponent pushes a pawn two squares forward from its starting rank, landing beside one of your pawns. Your pawn captures it as if it had only moved one square.',
      },
      {
        type: 'highlight',
        fen: 'rnbqkbnr/pppp1ppp/8/4pP2/8/8/PPPPP1PP/RNBQKBNR w KQkq e6 0 1',
        text: 'Here Black just advanced the e-pawn two squares from e7 to e5, landing right beside the White pawn on f5. The FEN records the en passant target square as e6. White can capture "in passing" by moving the f5-pawn diagonally to e6, removing the Black pawn on e5.',
        highlightSquares: ['f5', 'e5', 'e6'],
      },
      {
        type: 'make-move',
        fen: 'rnbqkbnr/pppp1ppp/8/4pP2/8/8/PPPPP1PP/RNBQKBNR w KQkq e6 0 1',
        text: 'Capture en passant! Move the White pawn from f5 to e6. The Black pawn on e5 will be removed.',
        correctMove: { from: 'f5', to: 'e6' },
      },
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppp1ppp/4P3/8/8/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1',
        text: 'After the en passant capture, the White pawn sits on e6 and the Black e5-pawn is gone. The captured pawn is removed even though the capturing pawn did not land on its square — that is what makes en passant unique.',
      },
      {
        type: 'explain',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        text: 'Key rule: en passant must be done on the very next move after the opponent advances the pawn two squares. If you play any other move first, you lose the right to capture en passant. It is a "now or never" opportunity!',
      },
    ],
  },

  // ─── Lesson 3: Pawn Promotion ─────────────────────────────────────────
  {
    id: 'rules-promotion',
    title: 'Pawn Promotion',
    description:
      'Learn what happens when a pawn reaches the other side of the board — it transforms into a more powerful piece.',
    category: 'rules',
    icon: '♛',
    steps: [
      {
        type: 'explain',
        fen: '8/4P3/8/8/8/8/8/4K2k w - - 0 1',
        text: 'When a pawn reaches the last rank (the 8th rank for White, or the 1st rank for Black), it must be promoted. Promotion means you replace the pawn with a Queen, Rook, Bishop, or Knight of the same color. You cannot keep it as a pawn or turn it into a King.',
      },
      {
        type: 'highlight',
        fen: '8/4P3/8/8/8/8/8/4K2k w - - 0 1',
        text: 'The White pawn on e7 is one square away from promotion. When it moves to e8, the player must choose a piece to promote to. Almost every time, players choose a Queen because it is the most powerful piece.',
        highlightSquares: ['e7', 'e8'],
      },
      {
        type: 'make-move',
        fen: '8/4P3/8/8/8/8/8/4K2k w - - 0 1',
        text: 'Push the pawn forward! Move the White pawn from e7 to e8 to promote it.',
        correctMove: { from: 'e7', to: 'e8' },
      },
      {
        type: 'explain',
        fen: '4Q3/8/8/8/8/8/8/4K2k w - - 0 1',
        text: 'The pawn has been promoted to a Queen! You can now use this new Queen like any other Queen on the board. It is possible to have multiple Queens (or other pieces) if you promote more than one pawn.',
      },
      {
        type: 'explain',
        fen: '8/8/8/8/8/2k5/1K1P4/8 w - - 0 1',
        text: 'Sometimes promoting to a Queen causes stalemate, so skilled players occasionally "under-promote" to a Knight, Rook, or Bishop instead. A Knight promotion is the most common alternative because a Knight can deliver checks a Queen cannot. Choosing the right promotion piece is part of chess mastery!',
      },
    ],
  },

  // ─── Lesson 4: Check & Checkmate ──────────────────────────────────────
  {
    id: 'rules-check-checkmate',
    title: 'Check & Checkmate',
    description:
      'Understand check, checkmate, and stalemate — the core concepts that decide every chess game.',
    category: 'rules',
    icon: '♔',
    steps: [
      {
        type: 'explain',
        fen: 'rnbqkbnr/ppppp1pp/8/5p2/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
        text: 'Check means the King is under direct attack by an enemy piece. When your King is in check, you MUST deal with the threat on your very next move. You can escape check in three ways: (1) move the King to a safe square, (2) block the attack with another piece, or (3) capture the attacking piece.',
      },
      {
        type: 'highlight',
        fen: 'rnbqkbnr/ppppp1pp/8/5p2/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
        text: 'White can play the Queen to h5, giving check to the Black King. The Queen on h5 attacks the King on e8 along the diagonal. Black will need to respond to the check immediately.',
        highlightSquares: ['d1', 'h5', 'e8'],
      },
      {
        type: 'make-move',
        fen: 'rnbqkbnr/ppppp1pp/8/5p2/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
        text: 'Deliver check! Move the White Queen from d1 to h5.',
        correctMove: { from: 'd1', to: 'h5' },
      },
      {
        type: 'highlight',
        fen: 'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 0 1',
        text: 'Checkmate occurs when the King is in check and there is NO legal move to escape. Here, the Black Queen on h4 gives check to the White King on e1. The King cannot move to a safe square, no piece can block, and nothing can capture the Queen. This is the famous "Scholar\'s Mate" pattern. The game is over — Black wins!',
        highlightSquares: ['h4', 'e1'],
      },
      {
        type: 'explain',
        fen: '5k2/5P2/5K2/8/8/8/8/8 b - - 0 1',
        text: 'Stalemate happens when a player is NOT in check but has no legal moves. Here it is Black to move: the King on f8 is not in check, but every possible square is either occupied or attacked. The game ends in a draw. Be careful not to accidentally stalemate your opponent when you are winning!',
      },
    ],
  },
];
