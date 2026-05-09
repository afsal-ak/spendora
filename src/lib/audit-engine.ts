interface AuditInput {
  tool: string;
  plan: string;
  teamSize: number;
  monthlySpend: number;
  useCase: string;
}

interface AuditResult {
  recommendedPlan: string;
  estimatedSavingsUSD: number;
  estimatedSavingsINR: number;
  reason: string;
}

export function generateAudit({
  tool,
  plan,
  teamSize,
  monthlySpend,
  useCase,
}: AuditInput): AuditResult {
  // ChatGPT Business → Plus
  if (tool === "ChatGPT" && plan === "business" && teamSize <= 1) {
    return {
      recommendedPlan: "plus",
      estimatedSavingsUSD: 5,
      estimatedSavingsINR: 400,
      reason:
        "ChatGPT Business is typically unnecessary for solo users. ChatGPT Plus may provide similar value at a lower cost.",
    };
  }

  // ChatGPT Pro → Plus
  if (tool === "ChatGPT" && plan === "pro" && monthlySpend < 50) {
    return {
      recommendedPlan: "plus",
      estimatedSavingsUSD: 80,
      estimatedSavingsINR: 8700,
      reason:
        "Your usage pattern suggests ChatGPT Pro may be excessive for your current workload.",
    };
  }

  // Small teams on Enterprise
  if (tool === "ChatGPT" && plan === "enterprise" && teamSize < 10) {
    return {
      recommendedPlan: "business",
      estimatedSavingsUSD: 35,
      estimatedSavingsINR: 3000,
      reason:
        "Enterprise plans are generally better suited for large organizations with advanced compliance requirements.",
    };
  }

  // Default fallback
  return {
    recommendedPlan: plan,
    estimatedSavingsUSD: 0,
    estimatedSavingsINR: 0,
    reason:
      "Your current setup appears reasonably aligned with your reported usage.",
  };
}