import { AuditResult } from "@/types/audit";

interface SaveAuditPayload {
  email: string;
  companyName?: string;
  role?: string;
  companyFax?: string;
  selectedTool: string;
  selectedPlan: string;
  monthlySpend: number;
  teamSize: number;
  result: AuditResult;
  summary: string;
}
export async function saveAudit(
  payload: SaveAuditPayload
) {
  const response = await fetch(
    "/api/save-audit",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        payload
      ),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to save audit"
    );
  }

  return data;
}