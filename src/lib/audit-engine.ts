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
  // -------------------------
  // ChatGPT Rules
  // -------------------------

  if (tool === "ChatGPT" && plan === "business" && teamSize <= 1) {
    return {
      recommendedPlan: "plus",
      estimatedSavingsUSD: 5,
      estimatedSavingsINR: 400,
      reason:
        "ChatGPT Business is typically unnecessary for solo users.",
    };
  }

  if (tool === "ChatGPT" && plan === "pro" && monthlySpend < 50) {
    return {
      recommendedPlan: "plus",
      estimatedSavingsUSD: 80,
      estimatedSavingsINR: 8700,
      reason:
        "ChatGPT Pro may be excessive for your current workload.",
    };
  }

  if (tool === "ChatGPT" && plan === "enterprise" && teamSize < 10) {
    return {
      recommendedPlan: "business",
      estimatedSavingsUSD: 35,
      estimatedSavingsINR: 3000,
      reason:
        "Enterprise plans are generally more suitable for larger organizations.",
    };
  }

  // -------------------------
  // Claude Rules
  // -------------------------

  if (tool === "Claude" && plan === "max" && monthlySpend < 50) {
    return {
      recommendedPlan: "pro",
      estimatedSavingsUSD: 80,
      estimatedSavingsINR: 6800,
      reason:
        "Claude Max may be unnecessary for moderate usage levels.",
    };
  }

  if (tool === "Claude" && plan === "teamPremium" && teamSize < 5) {
    return {
      recommendedPlan: "teamStandard",
      estimatedSavingsUSD: 80,
      estimatedSavingsINR: 6800,
      reason:
        "Premium team seats may be excessive for smaller teams.",
    };
  }

  // -------------------------
  // Gemini Rules
  // -------------------------

  if (tool === "Gemini" && plan === "ultra" && monthlySpend < 100) {
    return {
      recommendedPlan: "pro",
      estimatedSavingsUSD: 230,
      estimatedSavingsINR: 18000,
      reason:
        "Gemini Ultra is best suited for advanced AI power users.",
    };
  }

  if (tool === "Gemini" && plan === "pro" && teamSize <= 1) {
    return {
      recommendedPlan: "plus",
      estimatedSavingsUSD: 12,
      estimatedSavingsINR: 1500,
      reason:
        "Gemini Plus may provide enough functionality for solo workflows.",
    };
  }

  // -------------------------
  // Cursor Rules
  // -------------------------

  if (tool === "Cursor" && plan === "ultra" && teamSize <= 2) {
    return {
      recommendedPlan: "proPlus",
      estimatedSavingsUSD: 140,
      estimatedSavingsINR: 12000,
      reason:
        "Cursor Ultra may be excessive for smaller development teams.",
    };
  }

  if (tool === "Cursor" && plan === "teams" && teamSize <= 1) {
    return {
      recommendedPlan: "pro",
      estimatedSavingsUSD: 20,
      estimatedSavingsINR: 1700,
      reason:
        "Cursor Teams is generally more suitable for collaborative engineering teams.",
    };
  }

  // -------------------------
  // Default
  // -------------------------

  return {
    recommendedPlan: plan,
    estimatedSavingsUSD: 0,
    estimatedSavingsINR: 0,
    reason:
      "Your current setup appears reasonably aligned with your reported usage.",
  };
}