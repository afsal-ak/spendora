import { describe, it, expect } from "vitest";

import { generateAudit } from "./audit-engine";

import { ChatGPTPlans } from "@/enums/chatgpt";
import { CursorPlans } from "@/enums/cursor";
import { ClaudePlans } from "@/enums/claude";
import { GeminiPlans } from "@/enums/gemini";
import { GithubCopilotPlans } from "@/enums/copilot";
import { WindsurfPlans } from "@/enums/Windsurf";

describe("Audit Engine", () => {
  // Test 1

  it(
    "recommends ChatGPT Plus for solo business users",
    () => {
      const result = generateAudit({
        tool: "ChatGPT",
        plan: ChatGPTPlans.BUSINESS,
        teamSize: 1,
        monthlySpend: 25,
        useCase: "coding",
      });

      expect(
        result.recommendationType
      ).toBe("downgrade");

      expect(
        result.recommendedPlan
      ).toBe(ChatGPTPlans.PLUS);

      expect(
        result.estimatedSavingsUSD
      ).toBeGreaterThan(0);
    }
  );

  // Test 2

  it(
    "recommends Cursor Pro for solo business teams",
    () => {
      const result = generateAudit({
        tool: "Cursor",
        plan: CursorPlans.BUSINESS,
        teamSize: 1,
        monthlySpend: 40,
        useCase: "coding",
      });

      expect(
        result.recommendationType
      ).toBe("downgrade");

      expect(
        result.recommendedPlan
      ).toBe(CursorPlans.PRO);
    }
  );

  // Test 3

  it(
    "recommends Claude Pro instead of Max for low usage",
    () => {
      const result = generateAudit({
        tool: "Claude",
        plan: ClaudePlans.MAX,
        teamSize: 1,
        monthlySpend: 20,
        useCase: "writing",
      });

      expect(
        result.recommendationType
      ).toBe("downgrade");

      expect(
        result.recommendedPlan
      ).toBe(ClaudePlans.PRO);
    }
  );

  // Test 4

  it(
    "recommends Gemini Pro instead of Ultra",
    () => {
      const result = generateAudit({
        tool: "Gemini",
        plan: GeminiPlans.ULTRA,
        teamSize: 1,
        monthlySpend: 50,
        useCase: "research",
      });

      expect(
        result.recommendationType
      ).toBe("downgrade");

      expect(
        result.recommendedPlan
      ).toBe(GeminiPlans.PRO);
    }
  );

  // Test 5

  it(
    "returns keep recommendation for optimized setup",
    () => {
      const result = generateAudit({
        tool: "Cursor",
        plan: CursorPlans.PRO,
        teamSize: 3,
        monthlySpend: 20,
        useCase: "coding",
      });

      expect(
        result.recommendationType
      ).toBe("keep");

      expect(
        result.estimatedSavingsUSD
      ).toBe(0);
    }
  );

  // Test 6

  it(
    "recommends downgrade for GitHub Copilot Enterprise",
    () => {
      const result = generateAudit({
        tool: "GitHub Copilot",
        plan:
          GithubCopilotPlans.ENTERPRISE,
        teamSize: 5,
        monthlySpend: 50,
        useCase: "coding",
      });

      expect(
        result.recommendationType
      ).toBe("downgrade");

      expect(
        result.recommendedPlan
      ).toBe(
        GithubCopilotPlans.BUSINESS
      );
    }
  );

  // Test 7

  it(
    "recommends Windsurf Pro for solo team",
    () => {
      const result = generateAudit({
        tool: "Windsurf",
        plan: WindsurfPlans.TEAMS,
        teamSize: 1,
        monthlySpend: 30,
        useCase: "coding",
      });

      expect(
        result.recommendationType
      ).toBe("downgrade");

      expect(
        result.recommendedPlan
      ).toBe(WindsurfPlans.PRO);
    }
  );
  
});

// Test 8

it(
  "recommends Gemini for image generation workflows",
  () => {
    const result = generateAudit({
      tool: "ChatGPT",
      plan: ChatGPTPlans.PLUS,
      teamSize: 1,
      monthlySpend: 20,
      useCase: "image",
    });

    expect(
      result.recommendationType
    ).toBe("switch");

    expect(
      result.recommendedTool
    ).toBe("Gemini");

    expect(
      result.recommendedPlan
    ).toBe(GeminiPlans.PRO);
  }
);

// Test 9

it(
  "recommends Gemini Ultra for video workflows",
  () => {
    const result = generateAudit({
      tool: "ChatGPT",
      plan: ChatGPTPlans.PLUS,
      teamSize: 1,
      monthlySpend: 20,
      useCase: "video",
    });

    expect(
      result.recommendationType
    ).toBe("upgrade");

    expect(
      result.recommendedTool
    ).toBe("Gemini");

    expect(
      result.recommendedPlan
    ).toBe(GeminiPlans.ULTRA);
  }
);
