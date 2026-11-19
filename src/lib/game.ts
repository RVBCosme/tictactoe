export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export const EMPTY_BOARD: Board = Array(9).fill(null);

// Every row, column and diagonal of the 3x3 board, as cell indexes 0-8.
export const WIN_LINES: readonly [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type Outcome =
  | { kind: "playing" }
  | { kind: "win"; winner: Player; line: [number, number, number] }
  | { kind: "draw" };

export function getOutcome(board: Board): Outcome {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const mark = board[a];
    if (mark && mark === board[b] && mark === board[c]) {
      return { kind: "win", winner: mark, line };
    }
  }
  return board.every((cell) => cell !== null) ? { kind: "draw" } : { kind: "playing" };
}

export function otherPlayer(player: Player): Player {
  return player === "X" ? "O" : "X";
}

// Returns a new board with the move applied, or the same board if the move is not allowed
// (cell already taken, index out of range, or the game is already over).
export function playMove(board: Board, index: number, player: Player): Board {
  if (index < 0 || index > 8 || board[index] !== null) return board;
  if (getOutcome(board).kind !== "playing") return board;
  const next = board.slice();
  next[index] = player;
  return next;
}
