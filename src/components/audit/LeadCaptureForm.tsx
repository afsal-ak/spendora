"use client";

import { useState } from "react";

interface LeadCaptureFormProps {
  result: any;
  summary: string;
  selectedTool: string;
  selectedPlan: string;
  monthlySpend: number;
  teamSize: number;
}

export default function LeadCaptureForm({
  result,
  summary,
  selectedTool,
  selectedPlan,
  monthlySpend,
  teamSize,
}: LeadCaptureFormProps) {

  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] =useState("");

  const [role, setRole] = useState("");

  const [isLoading, setIsLoading] =useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "/api/save-audit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            companyName,
            role,
            selectedTool,
            selectedPlan,
            monthlySpend,
            teamSize,
            result,
            summary,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      alert("Audit saved successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-2xl font-bold text-black">
          Get Full Audit Report
        </h3>

        <p className="mt-2 text-zinc-600">
          Receive your AI spend audit report and
          optimization insights.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Email */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none focus:border-black"
          />
        </div>

        {/* Company */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Company Name
          </label>

          <input
            type="text"
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
            placeholder="Optional"
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none focus:border-black"
          />
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Role
          </label>

          <input
            type="text"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            placeholder="Optional"
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none focus:border-black"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-6 h-12 w-full rounded-xl bg-black font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isLoading
          ? "Saving Audit..."
          : "Send My Audit Report"}
      </button>
    </div>
  );
}