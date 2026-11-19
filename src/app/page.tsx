import TicTacToe from "@/components/TicTacToe";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-10 bg-linear-to-b from-sky-200 via-sky-50 to-amber-100 px-4 py-10">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Tic-Tac-Toe
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          <span className="text-amber-600">☀️ Araw</span>
          <span className="mx-3 text-slate-400">vs</span>
          <span className="text-sky-700">Ulan 🌧️</span>
        </h1>
        <p className="mt-3 text-slate-600">Sun or rain: who takes the board? Two players, one screen.</p>
      </header>

      <TicTacToe />

      <footer className="text-center text-sm text-slate-500">
        Built by{" "}
        <a
          className="font-medium text-slate-700 underline-offset-4 hover:underline"
          href="https://renevincentcosme.vercel.app"
        >
          Rene Vincent Cosme
        </a>{" "}
        with Next.js, React and Tailwind CSS ·{" "}
        <a
          className="font-medium text-slate-700 underline-offset-4 hover:underline"
          href="https://github.com/RVBCosme/tictactoe"
        >
          Source
        </a>
      </footer>
    </main>
  );
}
