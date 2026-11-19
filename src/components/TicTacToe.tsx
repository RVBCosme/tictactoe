"use client";

import { useState } from "react";
import {
  EMPTY_BOARD,
  getOutcome,
  otherPlayer,
  playMove,
  type Board,
  type Player,
} from "@/lib/game";

// X is the sun (Araw) and O is the rain (Ulan): Filipino words for sun and rain.
const PLAYERS: Record<
  Player,
  { name: string; icon: string; text: string; ring: string; soft: string }
> = {
  X: {
    name: "Araw",
    icon: "☀️",
    text: "text-amber-700",
    ring: "ring-amber-400",
    soft: "bg-amber-100",
  },
  O: {
    name: "Ulan",
    icon: "🌧️",
    text: "text-sky-700",
    ring: "ring-sky-400",
    soft: "bg-sky-100",
  },
};

type Scores = { X: number; O: number; draws: number };

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [starter, setStarter] = useState<Player>("X");
  const [turn, setTurn] = useState<Player>("X");
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 });

  const outcome = getOutcome(board);
  const winLine: readonly number[] = outcome.kind === "win" ? outcome.line : [];
  const winner = outcome.kind === "win" ? PLAYERS[outcome.winner] : null;

  function handleClick(index: number) {
    const next = playMove(board, index, turn);
    if (next === board) return;
    setBoard(next);

    const result = getOutcome(next);
    if (result.kind === "win") {
      setScores((s) => ({ ...s, [result.winner]: s[result.winner] + 1 }));
    } else if (result.kind === "draw") {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    } else {
      setTurn(otherPlayer(turn));
    }
  }

  // Each new game, the other player moves first, so neither side keeps the first-move edge.
  function newGame() {
    const nextStarter = otherPlayer(starter);
    setStarter(nextStarter);
    setTurn(nextStarter);
    setBoard(EMPTY_BOARD);
  }

  function resetScores() {
    setScores({ X: 0, O: 0, draws: 0 });
  }

  let status: string;
  let statusClass = "text-slate-700";
  if (outcome.kind === "win") {
    const p = PLAYERS[outcome.winner];
    status = `${p.icon} ${p.name} wins!`;
    statusClass = p.text;
  } else if (outcome.kind === "draw") {
    status = "🌦️ It's a draw. Sun and rain share the sky.";
  } else {
    const p = PLAYERS[turn];
    status = `${p.icon} ${p.name}'s turn`;
    statusClass = p.text;
  }

  return (
    <section className="flex w-full max-w-md flex-col items-center gap-6">
      <div className="grid w-full grid-cols-3 gap-3" aria-label="Scoreboard">
        <ScoreCard
          label={`${PLAYERS.X.icon} ${PLAYERS.X.name}`}
          value={scores.X}
          active={outcome.kind === "playing" && turn === "X"}
          activeClass={`${PLAYERS.X.soft} ring-2 ${PLAYERS.X.ring}`}
        />
        <ScoreCard label="🤝 Draws" value={scores.draws} />
        <ScoreCard
          label={`${PLAYERS.O.icon} ${PLAYERS.O.name}`}
          value={scores.O}
          active={outcome.kind === "playing" && turn === "O"}
          activeClass={`${PLAYERS.O.soft} ring-2 ${PLAYERS.O.ring}`}
        />
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`min-h-8 text-center text-xl font-semibold ${statusClass}`}
      >
        {status}
      </p>

      <div
        className="grid grid-cols-3 gap-3 rounded-3xl bg-white/60 p-3 shadow-xl ring-1 ring-slate-900/5 backdrop-blur"
        role="grid"
        aria-label="Tic-tac-toe board"
      >
        {board.map((cell, i) => {
          const isWinning = winLine.includes(i);
          const canPlay = cell === null && outcome.kind === "playing";
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(i)}
              disabled={!canPlay}
              aria-label={`Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}: ${
                cell ? PLAYERS[cell].name : "empty"
              }`}
              className={[
                "group flex h-24 w-24 items-center justify-center rounded-2xl text-5xl transition",
                "sm:h-28 sm:w-28 sm:text-6xl",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400",
                isWinning && winner
                  ? `${winner.soft} ring-4 ${winner.ring} scale-105`
                  : "bg-white shadow-sm",
                canPlay ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md" : "cursor-default",
              ].join(" ")}
            >
              {cell ? (
                <span className="animate-pop" aria-hidden="true">
                  {PLAYERS[cell].icon}
                </span>
              ) : canPlay ? (
                <span className="opacity-0 transition group-hover:opacity-30" aria-hidden="true">
                  {PLAYERS[turn].icon}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={newGame}
          className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400"
        >
          New Game
        </button>
        <button
          type="button"
          onClick={resetScores}
          className="rounded-full bg-white px-6 py-3 font-semibold text-slate-700 shadow ring-1 ring-slate-900/10 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-400"
        >
          Reset Scores
        </button>
      </div>
      <p className="text-sm text-slate-500">
        {PLAYERS[starter].icon} {PLAYERS[starter].name} started this round. The first move
        switches every new game.
      </p>
    </section>
  );
}

function ScoreCard({
  label,
  value,
  active = false,
  activeClass = "",
}: {
  label: string;
  value: number;
  active?: boolean;
  activeClass?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl px-2 py-3 shadow-sm transition ${
        active ? activeClass : "bg-white/80"
      }`}
    >
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className="text-3xl font-bold tabular-nums text-slate-900">{value}</span>
    </div>
  );
}
