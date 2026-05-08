export default function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-black">
            How It Works
          </h2>

          <p className="mt-4 text-zinc-600">
            Get a personalized AI spend audit in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition">
            <span className="text-4xl font-bold text-zinc-300">
              01
            </span>

            <h3 className="text-xl font-semibold mt-4 text-black">
              Enter Your AI Stack
            </h3>

            <p className="mt-3 text-zinc-600">
              Add your tools, plans, team size, and monthly spending.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition">
            <span className="text-4xl font-bold text-zinc-300">
              02
            </span>

            <h3 className="text-xl font-semibold mt-4 text-black">
              Analyze Your Costs
            </h3>

            <p className="mt-3 text-zinc-600">
              Spendora identifies unnecessary spending and optimization
              opportunities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition">
            <span className="text-4xl font-bold text-zinc-300">
              03
            </span>

            <h3 className="text-xl font-semibold mt-4 text-black">
              Save More Every Month
            </h3>

            <p className="mt-3 text-zinc-600">
              Get actionable recommendations to reduce your AI expenses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}