
interface AuditInput {
  tool: string;
  plan: string;
  teamSize: number;
  monthlySpend: number;
  useCase: string;
}

interface AuditResult {
  recommendedTool?: string;
  recommendedPlan: string;
  estimatedSavingsUSD: number;
  estimatedSavingsINR: number;
  recommendationType:
    | "upgrade"
    | "downgrade"
    | "switch"
    | "keep";
  reason: string;
}

export function generateAudit({
  tool,
  plan,
  teamSize,
  monthlySpend,
  useCase,
}: AuditInput): AuditResult {
  // -----------------------------------
  // CHATGPT
  // -----------------------------------

  if (
    tool === "ChatGPT" &&
    plan === "business" &&
    teamSize <= 1
  ) {
    return {
      recommendedTool: "ChatGPT",
      recommendedPlan: "plus",
      recommendationType: "downgrade",
      estimatedSavingsUSD: 5,
      estimatedSavingsINR: 400,
      reason:
        "ChatGPT Business is usually unnecessary for solo users.",
    };
  }

  if (
    tool === "ChatGPT" &&
    plan === "enterprise" &&
    teamSize < 10
  ) {
    return {
      recommendedTool: "ChatGPT",
      recommendedPlan: "business",
      recommendationType: "downgrade",
      estimatedSavingsUSD: 25,
      estimatedSavingsINR: 2200,
      reason:
        "Enterprise plans are generally more suitable for larger organizations.",
    };
  }

  if (
    tool === "ChatGPT" &&
    useCase === "coding" &&
    monthlySpend > 20
  ) {
    return {
      recommendedTool: "Cursor",
      recommendedPlan: "pro",
      recommendationType: "switch",
      estimatedSavingsUSD: 0,
      estimatedSavingsINR: 0,
      reason:
        "Dedicated AI coding tools usually provide stronger engineering workflows than general-purpose chat assistants.",
    };
  }

  if (
    tool === "ChatGPT" &&
    useCase === "image"
  ) {
    return {
      recommendedTool: "Gemini",
      recommendedPlan: "pro",
      recommendationType: "switch",
      estimatedSavingsUSD: 0,
      estimatedSavingsINR: 0,
      reason:
        "Gemini Pro provides stronger multimodal and image-generation workflows for creative tasks.",
    };
  }

  if (
    tool === "ChatGPT" &&
    useCase === "video"
  ) {
    return {
      recommendedTool: "Gemini",
      recommendedPlan: "ultra",
      recommendationType: "upgrade",
      estimatedSavingsUSD: 0,
      estimatedSavingsINR: 0,
      reason:
        "Gemini Ultra is better suited for advanced video-generation workflows.",
    };
  }

  // -----------------------------------
  // CLAUDE
  // -----------------------------------

  if (
    tool === "Claude" &&
    plan === "max" &&
    monthlySpend < 50
  ) {
    return {
      recommendedTool: "Claude",
      recommendedPlan: "pro",
      recommendationType: "downgrade",
      estimatedSavingsUSD: 80,
      estimatedSavingsINR: 6800,
      reason:
        "Claude Max may be excessive for moderate usage levels.",
    };
  }

  if (
    tool === "Claude" &&
    plan === "team" &&
    teamSize < 5
  ) {
    return {
      recommendedTool: "Claude",
      recommendedPlan: "pro",
      recommendationType: "downgrade",
      estimatedSavingsUSD: 20,
      estimatedSavingsINR: 1700,
      reason:
        "Claude Team is more appropriate for collaborative teams.",
    };
  }

  if (
    tool === "Claude" &&
    useCase === "coding"
  ) {
    return {
      recommendedTool: "Cursor",
      recommendedPlan: "pro",
      recommendationType: "switch",
      estimatedSavingsUSD: 0,
      estimatedSavingsINR: 0,
      reason:
        "Cursor provides more advanced codebase-aware development workflows.",
    };
  }

  // -----------------------------------
  // GEMINI
  // -----------------------------------

  if (
    tool === "Gemini" &&
    plan === "ultra" &&
    monthlySpend < 100
  ) {
    return {
      recommendedTool: "Gemini",
      recommendedPlan: "pro",
      recommendationType: "downgrade",
      estimatedSavingsUSD: 230,
      estimatedSavingsINR: 18000,
      reason:
        "Gemini Ultra is typically intended for advanced AI power users.",
    };
  }

  if (
    tool === "Gemini" &&
    useCase === "writing"
  ) {
    return {
      recommendedTool: "Claude",
      recommendedPlan: "pro",
      recommendationType: "switch",
      estimatedSavingsUSD: 0,
      estimatedSavingsINR: 0,
      reason:
        "Claude Pro is often preferred for long-form writing and document-focused workflows.",
    };
  }

  // -----------------------------------
  // CURSOR
  // -----------------------------------

  if (
    tool === "Cursor" &&
    plan === "business" &&
    teamSize <= 1
  ) {
    return {
      recommendedTool: "Cursor",
      recommendedPlan: "pro",
      recommendationType: "downgrade",
      estimatedSavingsUSD: 20,
      estimatedSavingsINR: 1700,
      reason:
        "Cursor Business is more suitable for collaborative engineering teams.",
    };
  }

  if (
    tool === "Cursor" &&
    useCase === "writing"
  ) {
    return {
      recommendedTool: "Claude",
      recommendedPlan: "pro",
      recommendationType: "switch",
      estimatedSavingsUSD: 0,
      estimatedSavingsINR: 0,
      reason:
        "Claude generally provides stronger writing and long-form content workflows.",
    };
  }

  // -----------------------------------
  // GITHUB COPILOT
  // -----------------------------------

  if (
    tool === "GitHub Copilot" &&
    plan === "enterprise" &&
    teamSize < 10
  ) {
    return {
      recommendedTool: "GitHub Copilot",
      recommendedPlan: "business",
      recommendationType: "downgrade",
      estimatedSavingsUSD: 20,
      estimatedSavingsINR: 1700,
      reason:
        "Enterprise plans are often unnecessary for smaller engineering organizations.",
    };
  }

  // -----------------------------------
  // OPENAI API
  // -----------------------------------

  if (
    tool === "OpenAI API" &&
    monthlySpend < 20
  ) {
    return {
      recommendedTool: "ChatGPT",
      recommendedPlan: "plus",
      recommendationType: "switch",
      estimatedSavingsUSD: 0,
      estimatedSavingsINR: 0,
      reason:
        "A ChatGPT subscription may be more cost-effective than API usage for lighter individual workflows.",
    };
  }

  // -----------------------------------
  // ANTHROPIC API
  // -----------------------------------

  if (
    tool === "Anthropic API" &&
    monthlySpend < 20
  ) {
    return {
      recommendedTool: "Claude",
      recommendedPlan: "pro",
      recommendationType: "switch",
      estimatedSavingsUSD: 0,
      estimatedSavingsINR: 0,
      reason:
        "Claude Pro may provide a simpler and more cost-efficient experience than direct API usage for individual users.",
    };
  }

  // -----------------------------------
  // WINDSURF
  // -----------------------------------

  if (
    tool === "Windsurf" &&
    plan === "teams" &&
    teamSize <= 1
  ) {
    return {
      recommendedTool: "Windsurf",
      recommendedPlan: "pro",
      recommendationType: "downgrade",
      estimatedSavingsUSD: 20,
      estimatedSavingsINR: 1700,
      reason:
        "Windsurf Teams is primarily designed for collaborative development teams.",
    };
  }

  // -----------------------------------
  // DEFAULT
  // -----------------------------------

  return {
    recommendedTool: tool,
    recommendedPlan: plan,
    recommendationType: "keep",
    estimatedSavingsUSD: 0,
    estimatedSavingsINR: 0,
    reason:
      "Your current setup appears reasonably aligned with your reported usage.",
  };
}

