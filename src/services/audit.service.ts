interface SaveAuditPayload {
  email: string;
  companyName?: string;
  role?: string;
  companyFax?: string;
  selectedTool: string;
  selectedPlan: string;
  monthlySpend: number;
  teamSize: number;
  result: any;
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
        "Content-Type":"application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
}