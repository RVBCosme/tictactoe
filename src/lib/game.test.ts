import { describe, expect, it } from "vitest";
import { EMPTY_BOARD, WIN_LINES, getOutcome, otherPlayer, playMove, type Board } from "./game";

const board = (s: string): Board =>
  s.split("").map((c) => (c === "X" || c === "O" ? c : null));

describe("getOutcome", () => {
  it("is still playing on an empty board", () => {
    expect(getOutcome(EMPTY_BOARD)).toEqual({ kind: "playing" });
  });

  for (const line of WIN_LINES) {
    it(`detects a win on line ${line.join("-")}`, () => {
      const b: Board = Array(9).fill(null);
      for (const i of line) b[i] = "O";
      expect(getOutcome(b)).toEqual({ kind: "win", winner: "O", line });
    });
  }

  it("detects a draw on a full board with no line", () => {
    expect(getOutcome(board("XOXXOOOXX"))).toEqual({ kind: "draw" });
  });

  it("counts a win on the last move as a win, not a draw", () => {
    expect(getOutcome(board("XOXOXOOXX")).kind).toBe("win");
  });

  it("keeps playing when the board is partly filled with no line", () => {
    expect(getOutcome(board("XO.......")).kind).toBe("playing");
  });
});

describe("playMove", () => {
  it("places the mark without changing the original board", () => {
    const next = playMove(EMPTY_BOARD, 4, "X");
    expect(next[4]).toBe("X");
    expect(EMPTY_BOARD[4]).toBeNull();
  });

  it("ignores a move on a taken cell", () => {
    const b = board("X........");
    expect(playMove(b, 0, "O")).toBe(b);
  });

  it("ignores moves after the game is won", () => {
    const won = board("XXX.OO...");
    expect(playMove(won, 6, "O")).toBe(won);
  });

  it("ignores out-of-range indexes", () => {
    expect(playMove(EMPTY_BOARD, 9, "X")).toBe(EMPTY_BOARD);
    expect(playMove(EMPTY_BOARD, -1, "X")).toBe(EMPTY_BOARD);
  });
});

describe("otherPlayer", () => {
  it("switches turns", () => {
    expect(otherPlayer("X")).toBe("O");
    expect(otherPlayer("O")).toBe("X");
  });
});
