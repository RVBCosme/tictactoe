# Araw vs Ulan · Tic-Tac-Toe

A two-player Tic-Tac-Toe game where the sun (☀️ **Araw**) takes on the rain (🌧️ **Ulan**). *Araw* and *ulan* are the Filipino words for sun and rain.

**Live app:** https://araw-vs-ulan-tictactoe.vercel.app

## What it does

- Two players take turns on a 3×3 board, Araw (☀️) and Ulan (🌧️).
- The game announces the winner, highlights the winning line, or calls a draw.
- **New Game** clears the board. The first move switches to the other player every new game, so neither side keeps the first-move edge.
- **Scoreboard** counts Araw wins, Ulan wins and draws. **Reset Scores** sets it back to zero.
- Moves on a taken cell or after the game is over are ignored.
- Works on phones and desktops, with keyboard focus styles, screen-reader labels for every cell, and a live status message. The mark animation turns off for people who prefer reduced motion.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- Vitest for the game-logic tests
- Deployed on Vercel

## Project layout

- `src/lib/game.ts`: the game rules as pure functions (winner and draw detection, move validation).
- `src/lib/game.test.ts`: unit tests for every winning line, draws, a win on the last move, and blocked moves.
- `src/components/TicTacToe.tsx`: the board, status, scoreboard and buttons (a Client Component).
- `src/app/page.tsx`: the page layout.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # game-logic unit tests
npm run build    # production build
```

## Built with AI

Built with the help of an AI coding assistant (Claude Code). The game rules live in plain functions covered by unit tests, and I checked the result by playing it in the browser: a win, a draw, New Game, Reset Scores, and the phone layout.

By Rene Vincent Cosme · [Portfolio](https://renevincentcosme.vercel.app) · [GitHub](https://github.com/RVBCosme)
