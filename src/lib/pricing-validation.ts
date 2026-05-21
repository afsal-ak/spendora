import { claudePricing } from "@/data/claude";
import { githubCopilotPricing } from "@/data/copilot";
import { cursorPricing } from "@/data/cursor";
import { geminiPricing } from "@/data/gemini";
import { chatgptPricing } from "@/data/chatgpt";
import { windsurfPricing } from "@/data/Windsurf";

type PricingPlan = {
  priceUSD?: number | null;
  minUsers?: number;
  customPricing?: boolean;
  usageBased?: boolean;
};

const pricingMap = {
  ChatGPT: chatgptPricing,
  Claude: claudePricing,
  Cursor: cursorPricing,
  Gemini: geminiPricing,
  Windsurf: windsurfPricing,
  "GitHub Copilot":
    githubCopilotPricing,
};
export function getMinimumSpend(
  tool: string,
  plan: string,
  teamSize: number
) {
  const toolPricing =
    pricingMap[
      tool as keyof typeof pricingMap
    ];

  const pricing =
    toolPricing?.[
      plan as keyof typeof toolPricing
    ] as PricingPlan | undefined;

  if (!pricing) return 0;

  // enterprise/custom pricing
  if (pricing.customPricing) {
    return 100;
  }

  // usage based pricing
  if (pricing.usageBased) {
    return 0;
  }

  const basePrice =
    pricing.priceUSD || 0;

  const minUsers =
    pricing.minUsers || 1;

  const effectiveSeats =
    Math.max(teamSize, minUsers);

  return (
    basePrice * effectiveSeats
  );
}