"use client";

import { useState } from "react";
import {
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function RunReAuditButton() {
  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  async function handleReAudit() {
    try {
      setLoading(true);
      setMessage("");
      setSuccess(false);

      const res =
        await fetch(
          "/api/detect-changes",
          {
            method: "POST",
          }
        );

      const data =
        await res.json();

      if (data.success) {
        setSuccess(true);

        setMessage(
          `Re-audit completed successfully. ${data.affectedCount} audit(s) affected.`
        );
      } else {
        setSuccess(false);

        setMessage(
          data.message ||
            "Failed to run re-audit"
        );
      }
    } catch {
      setSuccess(false);

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-10 shadow-xl">
          
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Smart Pricing Detection
              </div>

              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white leading-tight">
                Run Pricing Change
                Re-Audit
              </h2>

              <p className="mt-4 text-slate-300 text-base leading-7">
                Trigger a manual re-audit to detect
                pricing changes and update affected
                audit recommendations instantly using
                the latest pricing snapshot.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4">
              <button
                onClick={
                  handleReAudit
                }
                disabled={
                  loading
                }
                className="group inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                <RefreshCw
                  className={`h-5 w-5 ${
                    loading
                      ? "animate-spin"
                      : "group-hover:rotate-180 transition-transform duration-500"
                  }`}
                />

                {loading
                  ? "Running Re-Audit..."
                  : "Run Re-Audit"}
              </button>

              {message && (
                <div
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-sm max-w-md ${
                    success
                      ? "border-green-500/30 bg-green-500/10 text-green-200"
                      : "border-red-500/30 bg-red-500/10 text-red-200"
                  }`}
                >
                  {success ? (
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                  )}

                  <p>{message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}