export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="rounded-full bg-cyan-700/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-800 uppercase dark:text-cyan-300">
        Crispina Dive POS
      </span>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Point-of-sale &amp; reporting
      </h1>
      <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        Project scaffolded. Offline-first PWA shell is in place — screens land
        in the next milestones.
      </p>
    </main>
  );
}
