"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  leadCaptureSchema,
  LeadCaptureFormData,
} from "@/schemas/lead-capture.schema";
import { saveAudit } from "@/services/audit.service";
import { AuditResult } from "@/types/audit";


interface LeadCaptureFormProps {
  result: AuditResult;
  summary: string;
  selectedTool: string;
  selectedPlan: string;
  monthlySpend: number;
  teamSize: number;
  isGeneratingSummary: boolean;
}
export default function LeadCaptureForm({
  result,
  summary,
  selectedTool,
  selectedPlan,
  monthlySpend,
  teamSize,
  isGeneratingSummary

}: LeadCaptureFormProps) {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadCaptureFormData>({
    resolver: zodResolver(
      leadCaptureSchema
    ),
    defaultValues: {
      email: "",
      companyName: "",
      role: "",
      companyFax: "s",

    },
  });

  const onSubmit = async (
    values: LeadCaptureFormData
  ) => {
    try {
      setIsLoading(true);

      const data = await saveAudit({
        ...values,
        selectedTool,
        selectedPlan,
        monthlySpend,
        teamSize,
        result,
        summary,
      });

      if (data.success) {
        toast.success("Audit saved successfully");

        router.push(`/audit/${data.auditId}`);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-2xl font-bold text-black">
          Get Your Audit Report
        </h3>

        <p className="mt-2 text-zinc-600">
          Generate a personalized AI
          spend audit report with
          workflow optimization insights
          and receive a copy in your
          email inbox.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="mt-6 grid gap-4 md:grid-cols-2"
      >
        <input
          type="text"
          {...register("companyFax")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Email */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none transition focus:border-black"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Company Name
          </label>

          <input
            type="text"
            {...register("companyName")}
            placeholder="Optional"
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none transition focus:border-black"
          />
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Role
          </label>

          <input
            type="text"
            {...register("role")}
            placeholder="Optional"
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none transition focus:border-black"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || isGeneratingSummary}
          className="mt-2 h-12 w-full rounded-xl bg-black font-semibold text-white transition hover:opacity-90 disabled:opacity-50 md:col-span-2"
        >
          {isGeneratingSummary
            ? "Generating AI Summary..."
            : isLoading
              ? "Preparing Report..."
              : "Generate Full Audit Report"}
        </button>

        <p className="text-center text-xs text-zinc-500 md:col-span-2">
          No spam. Your information is
          only used to deliver your
          audit report.
        </p>
      </form>
    </div>
  );
}