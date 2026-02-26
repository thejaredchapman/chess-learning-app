export interface Opening {
  eco: string;
  name: string;
  moves: string; // space-separated SAN moves
}

export const OPENINGS_BOOK: Opening[] = [
  // A00-A09: Irregular Openings
  { eco: 'A00', name: 'Grob Opening', moves: 'g4' },
  { eco: 'A01', name: "Nimzo-Larsen Attack", moves: 'b3' },
  { eco: 'A02', name: "Bird's Opening", moves: 'f4' },
  { eco: 'A04', name: "Reti Opening", moves: 'Nf3' },
  { eco: 'A06', name: "Reti Opening", moves: 'Nf3 d5 g3' },

  // A10-A39: English Opening
  { eco: 'A10', name: 'English Opening', moves: 'c4' },
  { eco: 'A13', name: 'English Opening: Agincourt Defense', moves: 'c4 e6' },
  { eco: 'A15', name: 'English Opening: Anglo-Indian Defense', moves: 'c4 Nf6' },
  { eco: 'A16', name: 'English Opening: Anglo-Indian Defense', moves: 'c4 Nf6 Nc3' },
  { eco: 'A20', name: 'English Opening: Reversed Sicilian', moves: 'c4 e5' },
  { eco: 'A22', name: 'English Opening: Two Knights', moves: 'c4 e5 Nc3 Nf6' },
  { eco: 'A30', name: 'English Opening: Symmetrical', moves: 'c4 c5' },

  // A40-A49: Queen's Pawn
  { eco: 'A40', name: "Queen's Pawn Game", moves: 'd4' },
  { eco: 'A43', name: 'Old Benoni Defense', moves: 'd4 c5' },
  { eco: 'A45', name: "Queen's Pawn: Indian Defense", moves: 'd4 Nf6' },
  { eco: 'A46', name: "Queen's Pawn: Indian Defense", moves: 'd4 Nf6 Nf3' },

  // A50-A79: Indian Systems
  { eco: 'A50', name: "Queen's Pawn: Indian Defense", moves: 'd4 Nf6 c4' },
  { eco: 'A51', name: 'Budapest Gambit', moves: 'd4 Nf6 c4 e5' },
  { eco: 'A52', name: 'Budapest Gambit Accepted', moves: 'd4 Nf6 c4 e5 dxe5' },
  { eco: 'A56', name: 'Benoni Defense', moves: 'd4 Nf6 c4 c5' },
  { eco: 'A57', name: 'Benko Gambit', moves: 'd4 Nf6 c4 c5 d5 b5' },
  { eco: 'A60', name: 'Modern Benoni', moves: 'd4 Nf6 c4 c5 d5 e6' },

  // A80-A99: Dutch Defense
  { eco: 'A80', name: 'Dutch Defense', moves: 'd4 f5' },
  { eco: 'A81', name: 'Dutch Defense', moves: 'd4 f5 g3' },
  { eco: 'A87', name: 'Dutch Defense: Leningrad', moves: 'd4 f5 g3 Nf6 Bg2 g6 c4 Bg7' },

  // B00-B09: Uncommon King's Pawn
  { eco: 'B00', name: "King's Pawn Game", moves: 'e4' },
  { eco: 'B01', name: 'Scandinavian Defense', moves: 'e4 d5' },
  { eco: 'B02', name: "Alekhine's Defense", moves: 'e4 Nf6' },
  { eco: 'B06', name: 'Modern Defense', moves: 'e4 g6' },
  { eco: 'B07', name: 'Pirc Defense', moves: 'e4 d6' },
  { eco: 'B07', name: 'Pirc Defense', moves: 'e4 d6 d4 Nf6 Nc3' },

  // B10-B19: Caro-Kann Defense
  { eco: 'B10', name: 'Caro-Kann Defense', moves: 'e4 c6' },
  { eco: 'B12', name: 'Caro-Kann: Advance Variation', moves: 'e4 c6 d4 d5 e5' },
  { eco: 'B13', name: 'Caro-Kann: Exchange Variation', moves: 'e4 c6 d4 d5 exd5 cxd5' },
  { eco: 'B15', name: 'Caro-Kann: Main Line', moves: 'e4 c6 d4 d5 Nc3' },
  { eco: 'B18', name: 'Caro-Kann: Classical', moves: 'e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5' },

  // B20-B99: Sicilian Defense
  { eco: 'B20', name: 'Sicilian Defense', moves: 'e4 c5' },
  { eco: 'B21', name: 'Sicilian: Smith-Morra Gambit', moves: 'e4 c5 d4' },
  { eco: 'B22', name: 'Sicilian: Alapin Variation', moves: 'e4 c5 c3' },
  { eco: 'B23', name: 'Sicilian: Closed', moves: 'e4 c5 Nc3' },
  { eco: 'B27', name: 'Sicilian Defense', moves: 'e4 c5 Nf3' },
  { eco: 'B30', name: 'Sicilian: Old Sicilian', moves: 'e4 c5 Nf3 Nc6' },
  { eco: 'B32', name: 'Sicilian: Open', moves: 'e4 c5 Nf3 Nc6 d4' },
  { eco: 'B33', name: 'Sicilian: Sveshnikov', moves: 'e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5' },
  { eco: 'B40', name: 'Sicilian Defense', moves: 'e4 c5 Nf3 e6' },
  { eco: 'B44', name: 'Sicilian: Taimanov', moves: 'e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6' },
  { eco: 'B50', name: 'Sicilian Defense', moves: 'e4 c5 Nf3 d6' },
  { eco: 'B54', name: 'Sicilian: Open', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4' },
  { eco: 'B60', name: 'Sicilian: Richter-Rauzer', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5' },
  { eco: 'B63', name: 'Sicilian: Richter-Rauzer', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 Nc6 Bg5 e6' },
  { eco: 'B70', name: 'Sicilian: Dragon', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6' },
  { eco: 'B76', name: 'Sicilian: Dragon Yugoslav Attack', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3' },
  { eco: 'B80', name: 'Sicilian: Scheveningen', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6' },
  { eco: 'B90', name: 'Sicilian: Najdorf', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6' },
  { eco: 'B96', name: 'Sicilian: Najdorf', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5' },
  { eco: 'B97', name: 'Sicilian: Najdorf Poisoned Pawn', moves: 'e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Bg5 e6 f4 Qb6' },

  // C00-C19: French Defense
  { eco: 'C00', name: 'French Defense', moves: 'e4 e6' },
  { eco: 'C01', name: 'French: Exchange Variation', moves: 'e4 e6 d4 d5 exd5' },
  { eco: 'C02', name: 'French: Advance Variation', moves: 'e4 e6 d4 d5 e5' },
  { eco: 'C03', name: 'French: Tarrasch Variation', moves: 'e4 e6 d4 d5 Nd2' },
  { eco: 'C10', name: 'French: Rubinstein Variation', moves: 'e4 e6 d4 d5 Nc3 dxe4' },
  { eco: 'C11', name: 'French: Classical', moves: 'e4 e6 d4 d5 Nc3 Nf6' },
  { eco: 'C15', name: 'French: Winawer', moves: 'e4 e6 d4 d5 Nc3 Bb4' },
  { eco: 'C18', name: 'French: Winawer Main Line', moves: 'e4 e6 d4 d5 Nc3 Bb4 e5 c5' },

  // C20-C29: King's Pawn (Open)
  { eco: 'C20', name: "King's Pawn Game", moves: 'e4 e5' },
  { eco: 'C21', name: "Center Game", moves: 'e4 e5 d4' },
  { eco: 'C23', name: "Bishop's Opening", moves: 'e4 e5 Bc4' },
  { eco: 'C25', name: 'Vienna Game', moves: 'e4 e5 Nc3' },
  { eco: 'C27', name: 'Vienna Gambit', moves: 'e4 e5 Nc3 Nf6 d4' },
  { eco: 'C29', name: 'Vienna Gambit', moves: 'e4 e5 Nc3 Nf6 f4' },

  // C30-C39: King's Gambit
  { eco: 'C30', name: "King's Gambit", moves: 'e4 e5 f4' },
  { eco: 'C33', name: "King's Gambit Accepted", moves: 'e4 e5 f4 exf4' },
  { eco: 'C36', name: "King's Gambit: Abbazia Defense", moves: 'e4 e5 f4 exf4 Nf3 d5' },

  // C40-C49: Open Games
  { eco: 'C41', name: "Philidor's Defense", moves: 'e4 e5 Nf3 d6' },
  { eco: 'C42', name: 'Russian (Petrov) Defense', moves: 'e4 e5 Nf3 Nf6' },
  { eco: 'C44', name: 'Scotch Game', moves: 'e4 e5 Nf3 Nc6 d4' },
  { eco: 'C45', name: 'Scotch Game', moves: 'e4 e5 Nf3 Nc6 d4 exd4 Nxd4' },
  { eco: 'C46', name: 'Three Knights Game', moves: 'e4 e5 Nf3 Nc6 Nc3' },
  { eco: 'C47', name: 'Four Knights Game', moves: 'e4 e5 Nf3 Nc6 Nc3 Nf6' },

  // C50-C59: Italian Game
  { eco: 'C50', name: 'Italian Game', moves: 'e4 e5 Nf3 Nc6 Bc4' },
  { eco: 'C50', name: "Giuoco Piano", moves: 'e4 e5 Nf3 Nc6 Bc4 Bc5' },
  { eco: 'C51', name: 'Evans Gambit', moves: 'e4 e5 Nf3 Nc6 Bc4 Bc5 b4' },
  { eco: 'C53', name: 'Giuoco Piano', moves: 'e4 e5 Nf3 Nc6 Bc4 Bc5 c3' },
  { eco: 'C54', name: 'Giuoco Piano', moves: 'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4' },
  { eco: 'C55', name: 'Two Knights Defense', moves: 'e4 e5 Nf3 Nc6 Bc4 Nf6' },
  { eco: 'C57', name: 'Fried Liver Attack', moves: 'e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5' },

  // C60-C99: Ruy Lopez
  { eco: 'C60', name: 'Ruy Lopez', moves: 'e4 e5 Nf3 Nc6 Bb5' },
  { eco: 'C63', name: 'Ruy Lopez: Schliemann Defense', moves: 'e4 e5 Nf3 Nc6 Bb5 f5' },
  { eco: 'C65', name: 'Ruy Lopez: Berlin Defense', moves: 'e4 e5 Nf3 Nc6 Bb5 Nf6' },
  { eco: 'C68', name: 'Ruy Lopez: Exchange Variation', moves: 'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6' },
  { eco: 'C69', name: 'Ruy Lopez: Exchange', moves: 'e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6' },
  { eco: 'C70', name: 'Ruy Lopez: Morphy Defense', moves: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4' },
  { eco: 'C78', name: 'Ruy Lopez: Morphy Defense', moves: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O' },
  { eco: 'C80', name: 'Ruy Lopez: Open', moves: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4' },
  { eco: 'C84', name: 'Ruy Lopez: Closed', moves: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7' },
  { eco: 'C88', name: 'Ruy Lopez: Closed', moves: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3' },
  { eco: 'C92', name: 'Ruy Lopez: Closed Zaitsev', moves: 'e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O' },

  // D00-D69: Queen's Gambit
  { eco: 'D00', name: "Queen's Pawn Game", moves: 'd4 d5' },
  { eco: 'D00', name: 'London System', moves: 'd4 d5 Bf4' },
  { eco: 'D01', name: 'Richter-Veresov Attack', moves: 'd4 d5 Nc3 Nf6 Bg5' },
  { eco: 'D02', name: "Queen's Pawn: London System", moves: 'd4 d5 Nf3 Nf6 Bf4' },
  { eco: 'D06', name: "Queen's Gambit", moves: 'd4 d5 c4' },
  { eco: 'D07', name: "Queen's Gambit: Chigorin Defense", moves: 'd4 d5 c4 Nc6' },
  { eco: 'D10', name: "Slav Defense", moves: 'd4 d5 c4 c6' },
  { eco: 'D15', name: 'Slav Defense', moves: 'd4 d5 c4 c6 Nf3 Nf6 Nc3' },
  { eco: 'D20', name: "Queen's Gambit Accepted", moves: 'd4 d5 c4 dxc4' },
  { eco: 'D30', name: "Queen's Gambit Declined", moves: 'd4 d5 c4 e6' },
  { eco: 'D35', name: "QGD: Exchange Variation", moves: 'd4 d5 c4 e6 Nc3 Nf6 cxd5' },
  { eco: 'D37', name: "QGD", moves: 'd4 d5 c4 e6 Nc3 Nf6 Nf3' },
  { eco: 'D53', name: "QGD", moves: 'd4 d5 c4 e6 Nc3 Nf6 Bg5' },

  // D70-D99: Grunfeld Defense
  { eco: 'D70', name: 'Grunfeld Defense', moves: 'd4 Nf6 c4 g6 Nc3 d5' },
  { eco: 'D80', name: 'Grunfeld Defense', moves: 'd4 Nf6 c4 g6 Nc3 d5 Bg5' },
  { eco: 'D85', name: 'Grunfeld: Exchange', moves: 'd4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5' },

  // E00-E09: Catalan
  { eco: 'E00', name: 'Catalan Opening', moves: 'd4 Nf6 c4 e6 g3' },
  { eco: 'E04', name: 'Catalan: Open', moves: 'd4 Nf6 c4 e6 g3 d5 Bg2 dxc4' },
  { eco: 'E06', name: 'Catalan: Closed', moves: 'd4 Nf6 c4 e6 g3 d5 Bg2 Be7' },

  // E10-E19: Queen's Indian
  { eco: 'E12', name: "Queen's Indian Defense", moves: 'd4 Nf6 c4 e6 Nf3 b6' },
  { eco: 'E15', name: "Queen's Indian", moves: 'd4 Nf6 c4 e6 Nf3 b6 g3' },

  // E20-E59: Nimzo-Indian
  { eco: 'E20', name: 'Nimzo-Indian Defense', moves: 'd4 Nf6 c4 e6 Nc3 Bb4' },
  { eco: 'E32', name: 'Nimzo-Indian: Classical', moves: 'd4 Nf6 c4 e6 Nc3 Bb4 Qc2' },
  { eco: 'E41', name: 'Nimzo-Indian: Hubner', moves: 'd4 Nf6 c4 e6 Nc3 Bb4 e3' },

  // E60-E99: King's Indian
  { eco: 'E60', name: "King's Indian Defense", moves: 'd4 Nf6 c4 g6' },
  { eco: 'E61', name: "King's Indian Defense", moves: 'd4 Nf6 c4 g6 Nc3' },
  { eco: 'E62', name: "King's Indian: Fianchetto", moves: 'd4 Nf6 c4 g6 Nc3 Bg7 Nf3 d6 g3' },
  { eco: 'E70', name: "King's Indian: Classical", moves: 'd4 Nf6 c4 g6 Nc3 Bg7 e4' },
  { eco: 'E76', name: "King's Indian: Four Pawns", moves: 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4' },
  { eco: 'E80', name: "King's Indian: Samisch", moves: 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3' },
  { eco: 'E90', name: "King's Indian: Classical Main", moves: 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3' },
  { eco: 'E97', name: "King's Indian: Mar del Plata", moves: 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6' },
];
