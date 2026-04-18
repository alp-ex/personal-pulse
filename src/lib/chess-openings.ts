import type { Opening } from "./chess-types";

export const OPENINGS: Opening[] = [
  {
    id: "sicilian-defense",
    name: "Sicilian Defense",
    description:
      "The most popular response to 1.e4. Black fights for the center asymmetrically, creating rich and complex positions.",
    icon: "♟",
    paths: [
      {
        id: "sicilian-najdorf",
        name: "Najdorf Variation",
        description:
          "The sharpest and most popular Sicilian. Flexible and ambitious.",
        playerColor: "black",
        moves: [
          // 1. e4 c5
          { from: "e2", to: "e4", san: "e4" },
          {
            from: "c7",
            to: "c5",
            san: "c5",
            explanation:
              "The Sicilian move! You fight for the center and create an asymmetrical position where Black has real winning chances.",
            hint: "What's Black's most aggressive answer to 1.e4? Think about challenging the center from the side.",
          },
          // 2. Nf3 d6
          { from: "g1", to: "f3", san: "Nf3" },
          {
            from: "d7",
            to: "d6",
            san: "d6",
            explanation:
              "Preparing to develop the knight to f6 and keeping your options open. This is the most flexible approach in the Open Sicilian.",
            hint: "You need to prepare your knight development. Which pawn move supports Nf6 and keeps things flexible?",
          },
          // 3. d4 cxd4
          { from: "d2", to: "d4", san: "d4" },
          {
            from: "c5",
            to: "d4",
            san: "cxd4",
            explanation:
              "Capture the d4 pawn! This is the key Sicilian exchange — you trade a flank pawn for a center pawn, which gives you long-term structural advantages.",
            hint: "White is offering a trade in the center. In the Sicilian, you always accept this exchange. Which pawn takes?",
          },
          // 4. Nxd4 Nf6
          { from: "f3", to: "d4", san: "Nxd4" },
          {
            from: "g8",
            to: "f6",
            san: "Nf6",
            explanation:
              "Develop your knight to its most natural square. It attacks the e4 pawn immediately and prepares to castle kingside.",
            hint: "Time to develop a piece. Which knight move puts pressure on White's center right away?",
          },
          // 5. Nc3 a6
          { from: "b1", to: "c3", san: "Nc3" },
          {
            from: "a7",
            to: "a6",
            san: "a6",
            explanation:
              "The Najdorf move! This little pawn move prevents Nb5 and Bb5, and prepares a future queenside expansion with ...b5. It's incredibly flexible.",
            hint: "Think about what White's knight on d4 could do next. Which small move prevents annoying jumps and prepares queenside expansion?",
          },
        ],
      },
      {
        id: "sicilian-dragon",
        name: "Dragon Variation",
        description:
          "Fianchetto the bishop to g7 for a powerful long diagonal. Sharp and tactical.",
        playerColor: "black",
        moves: [
          // 1. e4 c5
          { from: "e2", to: "e4", san: "e4" },
          {
            from: "c7",
            to: "c5",
            san: "c5",
            explanation:
              "The Sicilian move! You fight for the center and create an asymmetrical position where Black has real winning chances.",
            hint: "What's Black's most aggressive answer to 1.e4? Think about challenging the center from the side.",
          },
          // 2. Nf3 d6
          { from: "g1", to: "f3", san: "Nf3" },
          {
            from: "d7",
            to: "d6",
            san: "d6",
            explanation:
              "Preparing to develop the knight to f6 and keeping your options open. This is the most flexible approach in the Open Sicilian.",
            hint: "You need to prepare your knight development. Which pawn move supports Nf6 and keeps things flexible?",
          },
          // 3. d4 cxd4
          { from: "d2", to: "d4", san: "d4" },
          {
            from: "c5",
            to: "d4",
            san: "cxd4",
            explanation:
              "Capture the d4 pawn! This is the key Sicilian exchange — you trade a flank pawn for a center pawn.",
            hint: "White is offering a trade in the center. In the Sicilian, you always accept this exchange. Which pawn takes?",
          },
          // 4. Nxd4 Nf6
          { from: "f3", to: "d4", san: "Nxd4" },
          {
            from: "g8",
            to: "f6",
            san: "Nf6",
            explanation:
              "Develop your knight to its most natural square. It attacks the e4 pawn immediately and prepares to castle.",
            hint: "Time to develop a piece. Which knight move puts pressure on White's center right away?",
          },
          // 5. Nc3 g6
          { from: "b1", to: "c3", san: "Nc3" },
          {
            from: "g7",
            to: "g6",
            san: "g6",
            explanation:
              "The Dragon move! You'll fianchetto your bishop to g7 where it becomes a monster on the long diagonal, aiming straight at White's queenside.",
            hint: "In this variation, your dark-squared bishop wants to be on the longest diagonal. How do you prepare that?",
          },
        ],
      },
      {
        id: "sicilian-classical",
        name: "Classical Variation",
        description:
          "Solid development with Nc6. Keeps maximum flexibility for Black.",
        playerColor: "black",
        moves: [
          // 1. e4 c5
          { from: "e2", to: "e4", san: "e4" },
          {
            from: "c7",
            to: "c5",
            san: "c5",
            explanation:
              "The Sicilian move! You fight for the center and create an asymmetrical position where Black has real winning chances.",
            hint: "What's Black's most aggressive answer to 1.e4? Think about challenging the center from the side.",
          },
          // 2. Nf3 d6
          { from: "g1", to: "f3", san: "Nf3" },
          {
            from: "d7",
            to: "d6",
            san: "d6",
            explanation:
              "Preparing to develop the knight to f6 and keeping your options open. This is the most flexible approach in the Open Sicilian.",
            hint: "You need to prepare your knight development. Which pawn move supports Nf6 and keeps things flexible?",
          },
          // 3. d4 cxd4
          { from: "d2", to: "d4", san: "d4" },
          {
            from: "c5",
            to: "d4",
            san: "cxd4",
            explanation:
              "Capture the d4 pawn! This is the key Sicilian exchange — you trade a flank pawn for a center pawn.",
            hint: "White is offering a trade in the center. In the Sicilian, you always accept this exchange. Which pawn takes?",
          },
          // 4. Nxd4 Nf6
          { from: "f3", to: "d4", san: "Nxd4" },
          {
            from: "g8",
            to: "f6",
            san: "Nf6",
            explanation:
              "Develop your knight to its most natural square. It attacks the e4 pawn immediately and prepares to castle.",
            hint: "Time to develop a piece. Which knight move puts pressure on White's center right away?",
          },
          // 5. Nc3 Nc6
          { from: "b1", to: "c3", san: "Nc3" },
          {
            from: "b8",
            to: "c6",
            san: "Nc6",
            explanation:
              "The Classical move. Develop your second knight naturally, putting pressure on d4 and keeping all your options open for the middlegame.",
            hint: "Think about natural piece development. Which piece isn't developed yet and can pressure the center?",
          },
        ],
      },
      {
        id: "sicilian-scheveningen",
        name: "Scheveningen Variation",
        description:
          "A solid pawn structure with d6+e6. Very flexible and hard to crack.",
        playerColor: "black",
        moves: [
          // 1. e4 c5
          { from: "e2", to: "e4", san: "e4" },
          {
            from: "c7",
            to: "c5",
            san: "c5",
            explanation:
              "The Sicilian move! You fight for the center and create an asymmetrical position where Black has real winning chances.",
            hint: "What's Black's most aggressive answer to 1.e4? Think about challenging the center from the side.",
          },
          // 2. Nf3 d6
          { from: "g1", to: "f3", san: "Nf3" },
          {
            from: "d7",
            to: "d6",
            san: "d6",
            explanation:
              "Preparing to develop the knight to f6 and keeping your options open. This is the most flexible approach in the Open Sicilian.",
            hint: "You need to prepare your knight development. Which pawn move supports Nf6 and keeps things flexible?",
          },
          // 3. d4 cxd4
          { from: "d2", to: "d4", san: "d4" },
          {
            from: "c5",
            to: "d4",
            san: "cxd4",
            explanation:
              "Capture the d4 pawn! This is the key Sicilian exchange — you trade a flank pawn for a center pawn.",
            hint: "White is offering a trade in the center. In the Sicilian, you always accept this exchange. Which pawn takes?",
          },
          // 4. Nxd4 Nf6
          { from: "f3", to: "d4", san: "Nxd4" },
          {
            from: "g8",
            to: "f6",
            san: "Nf6",
            explanation:
              "Develop your knight to its most natural square. It attacks the e4 pawn immediately and prepares to castle.",
            hint: "Time to develop a piece. Which knight move puts pressure on White's center right away?",
          },
          // 5. Nc3 e6
          { from: "b1", to: "c3", san: "Nc3" },
          {
            from: "e7",
            to: "e6",
            san: "e6",
            explanation:
              "The Scheveningen setup. You build a rock-solid pawn wall on d6 and e6. This is incredibly flexible — you can develop your bishop, play ...a6, ...Qc7 in many different orders.",
            hint: "Think about building a solid pawn structure. Which pawn move creates a wall in the center alongside d6?",
          },
        ],
      },
      {
        id: "sicilian-accelerated-dragon",
        name: "Accelerated Dragon",
        description:
          "Skip d6 and fianchetto immediately. Avoids some of White's sharpest lines.",
        playerColor: "black",
        moves: [
          // 1. e4 c5
          { from: "e2", to: "e4", san: "e4" },
          {
            from: "c7",
            to: "c5",
            san: "c5",
            explanation:
              "The Sicilian move! You fight for the center and create an asymmetrical position where Black has real winning chances.",
            hint: "What's Black's most aggressive answer to 1.e4? Think about challenging the center from the side.",
          },
          // 2. Nf3 Nc6
          { from: "g1", to: "f3", san: "Nf3" },
          {
            from: "b8",
            to: "c6",
            san: "Nc6",
            explanation:
              "Develop the knight early before playing d6. This move order lets you go straight for the fianchetto setup and avoids some of White's sharpest attacking lines.",
            hint: "In this variation, you develop a piece before any more pawn moves. Which knight comes out first?",
          },
          // 3. d4 cxd4
          { from: "d2", to: "d4", san: "d4" },
          {
            from: "c5",
            to: "d4",
            san: "cxd4",
            explanation:
              "Capture the d4 pawn — the key Sicilian exchange. You trade a flank pawn for a center pawn.",
            hint: "White is offering a trade in the center. In the Sicilian, you always accept this exchange. Which pawn takes?",
          },
          // 4. Nxd4 g6
          { from: "f3", to: "d4", san: "Nxd4" },
          {
            from: "g7",
            to: "g6",
            san: "g6",
            explanation:
              "Fianchetto immediately! Unlike the regular Dragon, you skip d6 and Nf6 to get the bishop to g7 faster. This avoids some of White's most dangerous attacking setups.",
            hint: "Your dark-squared bishop wants to dominate the long diagonal as quickly as possible. How do you make room for it?",
          },
        ],
      },
      {
        id: "sicilian-sveshnikov",
        name: "Sveshnikov Variation",
        description:
          "A bold central thrust with ...e5. Fighting chess with dynamic play.",
        playerColor: "black",
        moves: [
          // 1. e4 c5
          { from: "e2", to: "e4", san: "e4" },
          {
            from: "c7",
            to: "c5",
            san: "c5",
            explanation:
              "The Sicilian move! You fight for the center and create an asymmetrical position where Black has real winning chances.",
            hint: "What's Black's most aggressive answer to 1.e4? Think about challenging the center from the side.",
          },
          // 2. Nf3 Nc6
          { from: "g1", to: "f3", san: "Nf3" },
          {
            from: "b8",
            to: "c6",
            san: "Nc6",
            explanation:
              "Develop the knight early to prepare for the central ...e5 push. The knight on c6 supports this idea perfectly.",
            hint: "You need a piece developed to support a bold central push later. Which knight comes out first?",
          },
          // 3. d4 cxd4
          { from: "d2", to: "d4", san: "d4" },
          {
            from: "c5",
            to: "d4",
            san: "cxd4",
            explanation:
              "Capture the d4 pawn — the key Sicilian exchange. You trade a flank pawn for a center pawn.",
            hint: "White is offering a trade in the center. In the Sicilian, you always accept this exchange. Which pawn takes?",
          },
          // 4. Nxd4 e5
          { from: "f3", to: "d4", san: "Nxd4" },
          {
            from: "e7",
            to: "e5",
            san: "e5",
            explanation:
              "A bold central thrust! You push the knight away from d4 and grab space in the center. You accept a backward pawn on d6, but the activity you get is worth it. This is fighting chess.",
            hint: "This variation is about being bold in the center. Think about kicking White's knight away with a strong pawn push.",
          },
        ],
      },
    ],
  },
];
