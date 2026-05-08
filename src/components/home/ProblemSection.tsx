export default function ProblemSection() {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-black">
            Most Teams Overspend on AI
          </h2>

          <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">
            Companies often pay for overlapping subscriptions, unnecessary
            enterprise plans, and unused AI tooling.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-black">
              Duplicate Subscriptions
            </h3>

            <p className="text-zinc-600">
              Teams unknowingly pay for tools with overlapping capabilities.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-black">
              Expensive Plans
            </h3>

            <p className="text-zinc-600">
              Startups often use enterprise plans without needing them.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3 text-black">
              No Spend Visibility
            </h3>

            <p className="text-zinc-600">
              Spendora provides instant insights into your AI stack spending.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}