interface GenerateSummaryPayload {
  tool: string;
  plan: string;
  teamSize: number;
  monthlySpend: number;
  recommendedPlan: string;
  savings: number;
  reason: string;
}

export async function generateSummary(
  payload: GenerateSummaryPayload
) {
  const response = await fetch(
    "/api/generate-summary",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(payload),
    }
  );

  return response.json();
}