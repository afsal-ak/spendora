export default function FaqSection() {
  const faqs = [
    {
      question:
        "How does the AI spend audit work?",
      answer:
        "The audit analyzes your current AI tools, plans, team size, and monthly spend to identify pricing inefficiencies and optimization opportunities.",
    },

    {
      question:
        "Is the audit free?",
      answer:
        "Yes. The audit is completely free to use and does not require account creation before generating results.",
    },

    {
      question:
        "Are recommendations generated using AI?",
      answer:
        "AI is only used for generating personalized summaries. Pricing recommendations are based on deterministic audit rules and pricing data.",
    },

    {
      question:
        "Does the platform support API pricing?",
      answer:
        "Yes. The audit supports both subscription-based AI tools and API-based usage pricing models.",
    },

    {
      question:
        "Is company information included in public share links?",
      answer:
        "No. Public audit links exclude sensitive company and contact information.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-black">
            Frequently Asked
            Questions
          </h2>

          <p className="mt-4 text-zinc-600">
            Common questions about
            the AI spend audit
            platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
            >
              <h3 className="text-lg font-semibold text-black">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}