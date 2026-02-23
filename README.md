# Chess Learning App

An interactive chess learning application built with Angular 19 that teaches beginners how to play chess through tutorials, lets them play against another person or Stockfish (WASM), and provides strategy lessons and tactical puzzles. Runs entirely client-side with no backend required.

## Features

- **Interactive Chessboard** — CSS grid board with click-to-move, legal move indicators, last-move highlights, and check highlights
- **Two-Player Mode** — Play against a friend on the same device
- **Play vs Computer** — Challenge Stockfish WASM at four difficulty levels (Beginner, Intermediate, Advanced, Master)
- **Step-by-Step Lessons** — 18 guided lessons across 5 categories with interactive board positions
- **Tactical Puzzles** — 20 puzzles including mate-in-1, mate-in-2, forks, pins, skewers, and more
- **Progress Tracking** — Lesson and puzzle progress saved to localStorage
- **Audio Feedback** — Move, capture, check, and game-over sound cues via Web Audio API
- **Responsive Design** — Scales from desktop to mobile viewports

## Tech Stack

- **Angular 19** — Standalone components, signals, new control flow (`@if`, `@for`, `@switch`)
- **chess.js** — Move validation, legal move generation, FEN/PGN, game state
- **Stockfish WASM** — Computer opponent loaded in a Web Worker
- **Angular CDK** — Drag-and-drop support
- **SCSS** — Styling

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install and Run

```bash
cd chess-learning-app
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Build for Production

```bash
ng build
```

Output is written to `dist/chess-learning-app/`.

## Project Structure

```
src/app/
├── models/
│   ├── chess.model.ts          # Square, Piece, GameState, MoveResult types
│   └── lesson.model.ts         # Lesson, LessonStep, Puzzle types
├── services/
│   ├── chess-engine.service.ts  # chess.js wrapper with signals-based state
│   ├── stockfish.service.ts     # Web Worker bridge to Stockfish WASM (UCI)
│   ├── lesson.service.ts        # Lesson/puzzle data + localStorage progress
│   └── sound.service.ts         # Web Audio API sound cues
├── components/
│   ├── chessboard/              # Core reusable board (CSS grid + unicode pieces)
│   ├── piece/                   # Individual piece rendering
│   ├── move-history/            # Scrollable algebraic notation move list
│   ├── game-controls/           # Undo, flip, new game, resign buttons
│   └── lesson-card/             # Card UI for lesson/puzzle selection
├── pages/
│   ├── home/                    # Landing page
│   ├── play/                    # Game setup + active game (vs human or computer)
│   ├── learn/                   # Lesson category browser
│   ├── lesson/                  # Individual lesson viewer
│   └── puzzles/                 # Puzzle browser + solver
├── data/
│   ├── piece-lessons.ts         # How each piece moves (6 lessons)
│   ├── rules-lessons.ts         # Castling, en passant, promotion, check (4 lessons)
│   ├── opening-lessons.ts       # Opening principles + common openings (4 lessons)
│   ├── strategy-lessons.ts      # Tactics, pawn structure, planning (4 lessons)
│   └── puzzles-data.ts          # 20 tactical puzzles (FEN + solutions)
├── app.component.ts             # Shell with nav + router-outlet
└── app.routes.ts                # Lazy-loaded routes
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing page with Learn / Play / Puzzles cards |
| `/play` | Play | Game setup (mode, color, difficulty) and active game |
| `/learn` | Learn | Lesson category browser with progress indicators |
| `/learn/:id` | Lesson | Individual lesson with step navigation |
| `/puzzles` | Puzzles | Puzzle browser with filtering and solver UI |

## Lesson Content

| Category | Lessons | Topics |
|----------|---------|--------|
| Piece Basics | 6 | King, Queen, Rook, Bishop, Knight, Pawn |
| Special Rules | 4 | Castling, En Passant, Pawn Promotion, Check & Checkmate |
| Opening Principles | 4 | Center Control, Development, King Safety, Common Openings |
| Strategy | 4 | Piece Values, Forks/Pins/Skewers, Pawn Structure, Planning |

## Stockfish Difficulty Levels

| Level | Search Depth | Description |
|-------|-------------|-------------|
| Beginner | 2 | Perfect for learning |
| Intermediate | 6 | A fair challenge |
| Advanced | 12 | Strong play |
| Master | 18 | Near-perfect chess |

## Design

- White background with light gray sections
- Board: green (`#779952`) and cream (`#edeed1`) squares (lichess-style)
- Accent: blue (`#1976d2`) for buttons and highlights
- System font stack
- Card-based layout with progress bars
