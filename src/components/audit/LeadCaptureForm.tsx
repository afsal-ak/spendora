"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  leadCaptureSchema,
  LeadCaptureFormData,
} from "@/schemas/lead-capture.schema";

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
    },
  });

  const onSubmit = async (
    values: LeadCaptureFormData
  ) => {
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
            ...values,

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

      if (data.success) {
        alert("Audit saved successfully");

        router.push(
          `/audit/${data.auditId}`
        );
      }
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
          Receive your AI spend audit
          report and optimization
          insights.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 grid gap-4 md:grid-cols-2"
      >


        {/* Email */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none focus:border-black"
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
            {...register("role")}
            placeholder="Optional"
            className="h-12 w-full rounded-xl border border-zinc-300 px-4 outline-none focus:border-black"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 h-12 w-full rounded-xl bg-black font-semibold text-white transition hover:opacity-90 disabled:opacity-50 md:col-span-2"
        >
          {isLoading
            ? "Saving Audit..."
            : "Send My Audit Report"}
        </button>
      </form>
    </div>
  );
}