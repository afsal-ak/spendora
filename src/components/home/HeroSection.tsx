export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-5">
        AI Spend Intelligence
      </p>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight text-black">
        Stop Overpaying
        <br />
        for AI Tools
      </h1>

      <p className="mt-8 text-lg text-zinc-600 max-w-2xl mx-auto leading-8">
        Spendora helps startups analyze AI subscriptions, uncover hidden
        overspending, and optimize monthly AI costs in minutes.
      </p>

      <div className="mt-10 flex items-center justify-center gap-4">
        <button className="px-7 py-4 rounded-2xl bg-black text-white font-semibold hover:opacity-90 transition">
          Start Free Audit
        </button>

        <button className="px-7 py-4 rounded-2xl border border-zinc-300 hover:bg-zinc-100 transition">
          View Demo
        </button>
      </div>
    </section>
  );
}