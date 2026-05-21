import { CursorPlans } from "@/enums/cursor";
import { ChatGPTPlans } from "@/enums/chatgpt";
import { ClaudePlans } from "@/enums/claude";
import { GeminiPlans } from "@/enums/gemini";
import { GithubCopilotPlans } from "@/enums/copilot";
import { WindsurfPlans } from "@/enums/Windsurf";

import { cursorPricing } from "@/data/cursor";
import { chatgptPricing } from "@/data/chatgpt";
import { claudePricing } from "@/data/claude";
import { geminiPricing } from "@/data/gemini";
import { githubCopilotPricing } from "@/data/copilot";
import { windsurfPricing } from "@/data/Windsurf";

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

 type WorkflowOption = {
  tool: string;
  plan: string;
  priceUSD: number;
  reason: string;
};

// WORKFLOW RECOMMENDATIONS

function getWorkflowRecommendation(
  useCase: string
): WorkflowOption | null {
  let candidates:
    WorkflowOption[] = [];

  switch (useCase) {
    case "coding":
      candidates = [
        {
          tool: "Cursor",
          plan:
            CursorPlans.PRO,
          priceUSD:
            cursorPricing.pro
              .priceUSD,
          reason:
            "Cursor provides strong engineering-focused workflows.",
        },

        {
          tool:
            "GitHub Copilot",
          plan:
            GithubCopilotPlans.PRO,
          priceUSD:
            githubCopilotPricing
              .pro.priceUSD,
          reason:
            "GitHub Copilot provides lightweight coding assistance.",
        },

        {
          tool: "ChatGPT",
          plan:
            ChatGPTPlans.PLUS,
          priceUSD:
            chatgptPricing.plus
              .priceUSD,
          reason:
            "ChatGPT works well for coding and debugging workflows.",
        },
        
      ];
      break;

   
case "writing":
  candidates = [
    {
      tool: "Claude",
      plan:
        ClaudePlans.PRO,
      priceUSD:
        claudePricing.pro
          .priceUSD,
      reason:
        "Claude performs especially well for writing and long-form content.",
    },

    {
      tool: "ChatGPT",
      plan:
        ChatGPTPlans.PLUS,
      priceUSD:
        chatgptPricing.plus
          .priceUSD,
      reason:
        "ChatGPT works well for general writing workflows.",
    },


    // //new model added now for testing reaudit work successfully
    // {
    //   tool: "ChatGPT",
    //   plan:
    //     ChatGPTPlans.MAX,
    //   priceUSD:
    //     chatgptPricing.max
    //       .priceUSD,
    //   reason:
    //     "ChatGPT Max provides stronger value for writing workflows.",
    // },
  ];

  break;
    case "image":
      candidates = [
        {
          tool: "Gemini",
          plan:
            GeminiPlans.PRO,
          priceUSD:
            geminiPricing.pro
              .priceUSD,
          reason:
            "Gemini offers stronger multimodal image capabilities.",
        },
      ];
      break;

    case "video":
      candidates = [
        {
          tool: "Gemini",
          plan:
            GeminiPlans.ULTRA,
          priceUSD:
            geminiPricing
              .ultra
              .priceUSD ??
            Infinity,
          reason:
            "Gemini Ultra is suited for advanced video workflows.",
        },
      ];
      break;

    default:
      return null;
  }

  
  const validCandidates =
  candidates.filter(
    (candidate) =>
      typeof candidate.priceUSD ===
      "number"
  );

return validCandidates.sort(
  (a, b) =>
    a.priceUSD -
    b.priceUSD
)[0] ?? null;

}
const USD_TO_INR = 85;


export function generateAudit({
  tool,
  plan,
  teamSize,
  monthlySpend,
  useCase,
}: AuditInput): AuditResult {
  // CHATGPT RULES

  if (
    tool === "ChatGPT" &&
    plan === ChatGPTPlans.BUSINESS &&
    teamSize <= 1
  ) {
    const currentPrice =
      chatgptPricing.business.priceUSD;

    const recommendedPrice =
      chatgptPricing.plus.priceUSD;

    const savings =
      currentPrice - recommendedPrice;

    return {
      recommendedTool: "ChatGPT",

      recommendedPlan:
        ChatGPTPlans.PLUS,

      recommendationType:
        "downgrade",

      estimatedSavingsUSD:
        savings,

      estimatedSavingsINR:
        savings * USD_TO_INR,

      reason:
        "ChatGPT Business is usually unnecessary for solo users.",
    };
  }

  if (
    tool === "ChatGPT" &&
    plan === ChatGPTPlans.ENTERPRISE &&
    teamSize < 10
  ) {
    const recommendedPrice =
      chatgptPricing.business.priceUSD;

    return {
      recommendedTool: "ChatGPT",

      recommendedPlan:
        ChatGPTPlans.BUSINESS,

      recommendationType:
        "downgrade",

      estimatedSavingsUSD:
        recommendedPrice,

      estimatedSavingsINR:
        recommendedPrice * USD_TO_INR,

      reason:
        "Enterprise plans are generally more suitable for larger organizations.",
    };
  }

  // CLAUDE RULES

  if (
    tool === "Claude" &&
    plan === ClaudePlans.MAX &&
    monthlySpend < 50
  ) {
    const currentPrice =
      claudePricing.max.priceUSD;

    const recommendedPrice =
      claudePricing.pro.priceUSD;

    const savings =
      currentPrice - recommendedPrice;

    return {
      recommendedTool: "Claude",

      recommendedPlan:
        ClaudePlans.PRO,

      recommendationType:
        "downgrade",

      estimatedSavingsUSD:
        savings,

      estimatedSavingsINR:
        savings * USD_TO_INR,

      reason:
        "Claude Max may be excessive for moderate usage levels.",
    };
  }

  if (
    tool === "Claude" &&
    plan === ClaudePlans.TEAM &&
    teamSize < 5
  ) {
    const currentPrice =
      claudePricing.team.priceUSD;

    const recommendedPrice =
      claudePricing.pro.priceUSD;

    const savings =
      currentPrice - recommendedPrice;

    return {
      recommendedTool: "Claude",

      recommendedPlan:
        ClaudePlans.PRO,

      recommendationType:
        "downgrade",

      estimatedSavingsUSD:
        savings,

      estimatedSavingsINR:
        savings * USD_TO_INR,

      reason:
        "Claude Team is more appropriate for collaborative teams.",
    };
  }

  // GEMINI RULES

  if (
    tool === "Gemini" &&
    plan === GeminiPlans.ULTRA &&
    monthlySpend < 100
  ) {
    const currentPrice =
      geminiPricing.ultra.priceUSD;

    const recommendedPrice =
      geminiPricing.pro.priceUSD;

    const savings =
      currentPrice - recommendedPrice;

    return {
      recommendedTool: "Gemini",

      recommendedPlan:
        GeminiPlans.PRO,

      recommendationType:
        "downgrade",

      estimatedSavingsUSD:
        savings,

      estimatedSavingsINR:
        savings * USD_TO_INR,

      reason:
        "Gemini Ultra is typically intended for advanced AI power users.",
    };
  }

  // CURSOR RULES

  if (
    tool === "Cursor" &&
    plan === CursorPlans.BUSINESS &&
    teamSize <= 1
  ) {
    const currentPrice =
      cursorPricing.business.priceUSD;

    const recommendedPrice =
      cursorPricing.pro.priceUSD;

    const savings =
      currentPrice - recommendedPrice;

    return {
      recommendedTool: "Cursor",

      recommendedPlan:
        CursorPlans.PRO,

      recommendationType:
        "downgrade",

      estimatedSavingsUSD:
        savings,

      estimatedSavingsINR:
        savings * USD_TO_INR,

      reason:
        "Cursor Business is more suitable for collaborative engineering teams.",
    };
  }

  // GITHUB COPILOT RULES

  if (
    tool === "GitHub Copilot" &&
    plan === GithubCopilotPlans.ENTERPRISE &&
    teamSize < 10
  ) {
    const currentPrice =
      githubCopilotPricing.enterprise.priceUSD;

    const recommendedPrice =
      githubCopilotPricing.business.priceUSD;

    const savings =
      currentPrice - recommendedPrice;

    return {
      recommendedTool:
        "GitHub Copilot",

      recommendedPlan:
        GithubCopilotPlans.BUSINESS,

      recommendationType:
        "downgrade",

      estimatedSavingsUSD:
        savings,

      estimatedSavingsINR:
        savings * USD_TO_INR,

      reason:
        "Enterprise plans are often unnecessary for smaller engineering organizations.",
    };
  }

  // WINDSURF RULES

  if (
    tool === "Windsurf" &&
    plan === WindsurfPlans.TEAMS &&
    teamSize <= 1
  ) {
    const currentPrice =
      windsurfPricing.teams.priceUSD;

    const recommendedPrice =
      windsurfPricing.pro.priceUSD;

    const savings =
      currentPrice - recommendedPrice;

    return {
      recommendedTool: "Windsurf",

      recommendedPlan:
        WindsurfPlans.PRO,

      recommendationType:
        "downgrade",

      estimatedSavingsUSD:
        savings,

      estimatedSavingsINR:
        savings * USD_TO_INR,

      reason:
        "Windsurf Teams is primarily designed for collaborative development teams.",
    };
  }

// WORKFLOW RECOMMENDATIONS

const recommendation =
  getWorkflowRecommendation(
    useCase
  );

if (
  recommendation &&
  (
    recommendation.tool !==
      tool ||
    recommendation.plan !==
      plan
  )
) {
  return {
    recommendedTool:
      recommendation.tool,

    recommendedPlan:
      recommendation.plan,

    recommendationType:
  recommendation.tool ===
  tool
    ? "upgrade"
    : "switch",
    
    estimatedSavingsUSD:
      0,

    estimatedSavingsINR:
      0,

    reason:
      recommendation.reason,
  };
}
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
 
