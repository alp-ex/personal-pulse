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
          // 6. Be3 e5 — English Attack setup
          { from: "c1", to: "e3", san: "Be3" },
          {
            from: "e7",
            to: "e5",
            san: "e5",
            explanation:
              "A bold reaction to the English Attack! You kick White's knight away from d4 and grab central space. Yes, you leave a backward pawn on d6, but the active piece play you get is worth it.",
            hint: "White just played Be3 eyeing a kingside attack. But the real target is the knight on d4. How can you challenge it while grabbing central space?",
          },
          // 7. Nb3 Be6
          { from: "d4", to: "b3", san: "Nb3" },
          {
            from: "c8",
            to: "e6",
            san: "Be6",
            explanation:
              "Develop your light-squared bishop to a great square. It eyes White's b3-knight, controls central squares, and keeps an eye on the kingside.",
            hint: "Your light-squared bishop is still at home. Where can it go to pressure White's queenside and support your center?",
          },
          // 8. f3 Be7
          { from: "f2", to: "f3", san: "f3" },
          {
            from: "f8",
            to: "e7",
            san: "Be7",
            explanation:
              "Develop your dark-squared bishop and prepare to castle. White's f3 hints at a kingside pawn storm, so you need to get your king safe quickly.",
            hint: "White just played f3, preparing a kingside attack. Which piece still needs to develop so you can castle?",
          },
          // 9. Qd2 O-O
          { from: "d1", to: "d2", san: "Qd2" },
          {
            from: "e8",
            to: "g8",
            san: "O-O",
            explanation:
              "Castle kingside! Your king is safe, your rook is connected. White will castle queenside next — that means opposite-side castling and a race of pawn attacks.",
            hint: "Your king is still in the center with danger coming. What's the priority before White's attack arrives?",
          },
          // 10. O-O-O Nbd7
          { from: "e1", to: "c1", san: "O-O-O" },
          {
            from: "b8",
            to: "d7",
            san: "Nbd7",
            explanation:
              "Develop your last minor piece. The b8-knight goes to d7 where it supports the coming ...b5 attack and can reroute flexibly. Now your development is complete and you're ready to race on the queenside.",
            hint: "You've castled — now develop the last sleepy piece. Which knight still needs to come out, and where does it support your queenside counterplay?",
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
          // 6. Be3 Bg7 — Yugoslav Attack setup
          { from: "c1", to: "e3", san: "Be3" },
          {
            from: "f8",
            to: "g7",
            san: "Bg7",
            explanation:
              "Complete the fianchetto! Your bishop now rules the long diagonal, aiming straight at White's queenside. This is the Dragon's main weapon.",
            hint: "You prepared this last move. Put the bishop where it aims at the queenside and supports your whole position.",
          },
          // 7. f3 O-O
          { from: "f2", to: "f3", san: "f3" },
          {
            from: "e8",
            to: "g8",
            san: "O-O",
            explanation:
              "Castle kingside. Yes, White is preparing a scary kingside pawn storm, but you need your king safe and your rook active. The race is on.",
            hint: "White's f3 is the first step of a kingside attack. What should you do before it gets dangerous?",
          },
          // 8. Qd2 Nc6
          { from: "d1", to: "d2", san: "Qd2" },
          {
            from: "b8",
            to: "c6",
            san: "Nc6",
            explanation:
              "Develop your last knight naturally. It puts pressure on d4 and is ready to jump to e5 or a5 depending on how the game unfolds.",
            hint: "You still have a knight at home. Which square develops it actively and pressures White's center?",
          },
          // 9. Bc4 Bd7
          { from: "f1", to: "c4", san: "Bc4" },
          {
            from: "c8",
            to: "d7",
            san: "Bd7",
            explanation:
              "Develop your light-squared bishop to d7 — it clears c8 for the rook and supports your coming attack down the c-file.",
            hint: "Your last bishop needs a home. Think about where to put it so your rook can come to c8 next move.",
          },
          // 10. O-O-O Rc8
          { from: "e1", to: "c1", san: "O-O-O" },
          {
            from: "a8",
            to: "c8",
            san: "Rc8",
            explanation:
              "Rook to the open file! The c-file is your highway to White's king. This is classic Dragon attacking play — rook on c8, ready to storm the queenside.",
            hint: "White just castled queenside. Which of your rooks can join the attack down an open file?",
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
          // 6. Bg5 e6 — Richter-Rauzer Attack
          { from: "c1", to: "g5", san: "Bg5" },
          {
            from: "e7",
            to: "e6",
            san: "e6",
            explanation:
              "Build a solid pawn wall and prepare to develop your bishop. White's Bg5 pins your knight, so you want to reinforce the center and get ready to develop the f8 bishop.",
            hint: "White is pinning your knight with Bg5. Which pawn move controls key squares and prepares your kingside development?",
          },
          // 7. Qd2 a6
          { from: "d1", to: "d2", san: "Qd2" },
          {
            from: "a7",
            to: "a6",
            san: "a6",
            explanation:
              "A flexible move that prevents Nb5 and prepares ...b5 for your own queenside expansion. White is preparing to castle long, so you need to generate queenside counterplay.",
            hint: "White is preparing to castle queenside where your attack should land. Which flexible pawn move prepares your queenside expansion?",
          },
          // 8. O-O-O Bd7
          { from: "e1", to: "c1", san: "O-O-O" },
          {
            from: "c8",
            to: "d7",
            san: "Bd7",
            explanation:
              "Develop your light-squared bishop and prepare ...Rc8 to use the half-open c-file. Classic opposite-side castling plan.",
            hint: "White just castled where you want to attack. Which bishop should develop to help open lines against White's king?",
          },
          // 9. f4 Be7
          { from: "f2", to: "f4", san: "f4" },
          {
            from: "f8",
            to: "e7",
            san: "Be7",
            explanation:
              "Develop your last bishop and prepare to castle kingside. You need your king safe before the pawn race heats up.",
            hint: "White's f4 hints at further kingside expansion. Which piece still needs to develop so you can castle?",
          },
          // 10. Nxc6 Bxc6
          { from: "d4", to: "c6", san: "Nxc6" },
          {
            from: "d7",
            to: "c6",
            san: "Bxc6",
            explanation:
              "Recapture with the bishop! Your bishop now sits beautifully on c6, eyeing e4 and the kingside. Your pawn structure stays intact and you're ready to castle.",
            hint: "White just captured your knight on c6. Which piece should take back to keep your position harmonious?",
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
          // 6. Be2 a6 — Classical Scheveningen
          { from: "f1", to: "e2", san: "Be2" },
          {
            from: "a7",
            to: "a6",
            san: "a6",
            explanation:
              "The classic Sicilian waiting move. It prevents Nb5 and Bb5, and prepares ...b5 for queenside play. In the Scheveningen, this is almost always part of your setup.",
            hint: "White just developed calmly. What useful flexible pawn move prevents annoying jumps and prepares queenside expansion?",
          },
          // 7. O-O Be7
          { from: "e1", to: "g1", san: "O-O" },
          {
            from: "f8",
            to: "e7",
            san: "Be7",
            explanation:
              "Develop your bishop and prepare to castle. The bishop on e7 is modest but useful — it defends the kingside and supports the ...d5 break later.",
            hint: "White just castled. Which piece still needs to develop so you can do the same?",
          },
          // 8. f4 O-O
          { from: "f2", to: "f4", san: "f4" },
          {
            from: "e8",
            to: "g8",
            san: "O-O",
            explanation:
              "Castle kingside. Your king is safe behind the Scheveningen pawn wall. White is gaining space with f4, but your position is compact and hard to crack.",
            hint: "White's f4 shows aggressive intent. What should you do to keep your king safe?",
          },
          // 9. Be3 Qc7
          { from: "c1", to: "e3", san: "Be3" },
          {
            from: "d8",
            to: "c7",
            san: "Qc7",
            explanation:
              "Queen to c7 — a key Scheveningen move. She protects e5, eyes the c-file, and prepares to coordinate with your rooks on the queenside.",
            hint: "Your queen has been at home long enough. Which square gets her active, supports your center, and points at White's queenside?",
          },
          // 10. Qd2 Nc6
          { from: "d1", to: "d2", san: "Qd2" },
          {
            from: "b8",
            to: "c6",
            san: "Nc6",
            explanation:
              "Finish your development. The b8-knight joins the party, adding pressure on d4 and e5. Now all your pieces are active and you're ready for the middlegame.",
            hint: "Your last piece at home is a knight. Which square develops it actively, hitting the center?",
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
          // 5. Nc3 Bg7
          { from: "b1", to: "c3", san: "Nc3" },
          {
            from: "f8",
            to: "g7",
            san: "Bg7",
            explanation:
              "Complete your fianchetto. The bishop on g7 is your best piece — it controls the long diagonal and aims right at White's queenside.",
            hint: "You prepared this last move. Where does your dark-squared bishop belong?",
          },
          // 6. Be3 Nf6
          { from: "c1", to: "e3", san: "Be3" },
          {
            from: "g8",
            to: "f6",
            san: "Nf6",
            explanation:
              "Develop your knight to its natural square. It attacks e4 and supports your setup. Classic piece play.",
            hint: "Time to get the knight off g8. Which square develops it with tempo on White's center?",
          },
          // 7. Bc4 O-O
          { from: "f1", to: "c4", san: "Bc4" },
          {
            from: "e8",
            to: "g8",
            san: "O-O",
            explanation:
              "Castle. With your king safe and the fianchettoed bishop roaring on g7, you're ready to start playing for the initiative.",
            hint: "White just developed aggressively toward your king. What's the priority?",
          },
          // 8. Bb3 d6
          { from: "c4", to: "b3", san: "Bb3" },
          {
            from: "d7",
            to: "d6",
            san: "d6",
            explanation:
              "Solidify the center. The d6 pawn prevents White's e5 push and keeps your structure rock-solid — classic Dragon pawn structure.",
            hint: "White is eyeing e5 to disrupt your kingside. Which modest pawn move stops that cold?",
          },
          // 9. f3 Bd7
          { from: "f2", to: "f3", san: "f3" },
          {
            from: "c8",
            to: "d7",
            san: "Bd7",
            explanation:
              "Develop your last minor piece. The bishop on d7 supports the queenside plan and clears c8 for your rook.",
            hint: "Your light-squared bishop is still sleeping. Where should it go to complete development?",
          },
          // 10. Qd2 Nxd4
          { from: "d1", to: "d2", san: "Qd2" },
          {
            from: "c6",
            to: "d4",
            san: "Nxd4",
            explanation:
              "Trade knights to relieve tension and simplify. After the recapture, the c-file opens up for your rook, which is exactly where you want to attack.",
            hint: "White's knight is a central pillar. Which trade opens lines for your attack down the c-file?",
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
          // 5. Nb5 d6
          { from: "d4", to: "b5", san: "Nb5" },
          {
            from: "d7",
            to: "d6",
            san: "d6",
            explanation:
              "Defend c7 and block the knight. White's Nb5 threatens Nd6+ winning material, so you must close that square. The pawn on d6 is backward but solid.",
            hint: "White's knight on b5 is threatening a nasty fork. Which pawn move defends c7 and blocks the knight?",
          },
          // 6. N1c3 Nf6
          { from: "b1", to: "c3", san: "N1c3" },
          {
            from: "g8",
            to: "f6",
            san: "Nf6",
            explanation:
              "Develop your kingside knight to its natural square. It attacks e4 and gets you ready to complete development. This transposes into the mainline Sveshnikov.",
            hint: "You still have a knight at home. Which natural square attacks White's center and prepares castling?",
          },
          // 7. Bg5 a6
          { from: "c1", to: "g5", san: "Bg5" },
          {
            from: "a7",
            to: "a6",
            san: "a6",
            explanation:
              "Kick the b5 knight! This classic Sveshnikov move forces the knight to the edge and starts your queenside expansion. White's pin on f6 is annoying, but you'll deal with it.",
            hint: "White's knight on b5 is still eyeing d6. Which pawn move chases it away and prepares queenside expansion?",
          },
          // 8. Na3 b5
          { from: "b5", to: "a3", san: "Na3" },
          {
            from: "b7",
            to: "b5",
            san: "b5",
            explanation:
              "Grab queenside space! The knight on a3 looks silly, and ...b5 stops it from getting back into the game via c4. You're already dictating the queenside.",
            hint: "White's knight is stuck on a3. Which pawn move takes away its best escape square and claims queenside space?",
          },
          // 9. Nd5 Be7
          { from: "c3", to: "d5", san: "Nd5" },
          {
            from: "f8",
            to: "e7",
            san: "Be7",
            explanation:
              "Develop the bishop and unpin your f6 knight. The bishop on e7 also prepares to recapture on f6 if White decides to exchange the pin.",
            hint: "White's knight just landed on d5. Which piece should develop to break the pin and prepare castling?",
          },
          // 10. Bxf6 Bxf6
          { from: "g5", to: "f6", san: "Bxf6" },
          {
            from: "e7",
            to: "f6",
            san: "Bxf6",
            explanation:
              "Recapture with the bishop. Your bishop now stands proudly on f6, covering the long diagonal. You have the famous Sveshnikov bishop pair, full central pawns, and the initiative on the queenside.",
            hint: "White just traded bishop for knight on f6. Which piece should take back to keep your position strong?",
          },
        ],
      },
    ],
  },
];
