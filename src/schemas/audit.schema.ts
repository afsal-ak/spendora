import { z } from "zod";

export const auditSchema = z.object({
  selectedTool: z.string(),

  selectedPlan: z.string(),

  monthlySpend: z
    .number({
      error: "Monthly spend is required",
    })
    .min(1, "Monthly spend must be at least 1"),

  teamSize: z
    .number({
      error: "Team size is required",
    })
    .min(1, "Team size must be at least 1"),

  useCase: z.string(),
});

export type AuditFormData = z.infer<
  typeof auditSchema
>;