"use client";

import { ChatGPTPlans } from "@/enums/chatgpt";
 import { useMemo, useState } from "react";
 
const tools = {
  ChatGPT: Object.values(ChatGPTPlans),
};

export default function AuditFormSection() {
  const [selectedTool, setSelectedTool] = useState("ChatGPT");

  const plans = useMemo(() => {
    return tools[selectedTool as keyof typeof tools] || [];
  }, [selectedTool]);

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-10 shadow-sm">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-black">
              Start Your Free AI Spend Audit
            </h2>

            <p className="mt-4 text-zinc-600">
              Enter your current AI tooling and monthly spend.
            </p>
          </div>

          <form className="grid md:grid-cols-2 gap-6">
            {/* AI Tool */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                AI Tool
              </label>

              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition"
              >
                <option>ChatGPT</option>
              </select>
            </div>

            {/* Plan */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Plan
              </label>

              <select className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition">
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>

            {/* Monthly Spend */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Monthly Spend
              </label>

              <input
                type="number"
                placeholder="$200"
                className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black placeholder:text-zinc-400 outline-none focus:border-black transition"
              />
            </div>

            {/* Team Size */}
            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Team Size
              </label>

              <input
                type="number"
                placeholder="5"
                className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black placeholder:text-zinc-400 outline-none focus:border-black transition"
              />
            </div>

            {/* Use Case */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-zinc-700">
                Primary Use Case
              </label>

              <select className="w-full h-12 rounded-xl border border-zinc-300 bg-white px-4 text-black outline-none focus:border-black transition">
                <option>Coding</option>
                <option>Writing</option>
                <option>Research</option>
                <option>Mixed</option>
              </select>
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition">
                Generate Audit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}