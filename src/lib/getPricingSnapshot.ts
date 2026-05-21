import { claudePricing } from "@/data/claude";
import { cursorPricing } from "@/data/cursor";
import { geminiPricing } from "@/data/gemini";
import { chatgptPricing } from "@/data/chatgpt";
import { githubCopilotPricing } from "@/data/copilot";
import { windsurfPricing } from "@/data/Windsurf";
import { openAIApiPricing } from "@/data/OpenAIApi";
import { anthropicApiPricing } from "@/data/Anthropic";

export function getPricingSnapshot() {
    return {
        ChatGPT: chatgptPricing,
        Claude: claudePricing,
        Cursor: cursorPricing,
        Gemini: geminiPricing,
        Windsurf: windsurfPricing,
        "GitHub Copilot": githubCopilotPricing,
        OpenAI_API: openAIApiPricing,
        Anthropic_API: anthropicApiPricing,
    }
}