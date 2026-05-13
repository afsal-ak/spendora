interface AuditSummaryPromptParams {
  tool: string;
  plan: string;
  teamSize: number;
  monthlySpend: number;
  recommendedTool: string;
  recommendedPlan: string;
  recommendationType: string;
  savings: number;
  reason: string;
}

export function buildAuditSummaryPrompt({
  tool,
  plan,
  teamSize,
  monthlySpend,
  recommendedTool,
  recommendedPlan,
  recommendationType,
  savings,
  reason,
}: AuditSummaryPromptParams) {
  return `
You are an AI spend optimization advisor.

Generate a concise personalized AI spend audit summary
between 60 and 100 words.

Focus on:
- workflow fit
- pricing efficiency
- actionable recommendations

Do not exaggerate.
Do not invent tools or plans.
Use the provided recommendation exactly.
Avoid markdown formatting.
Return plain text only.
Do not repeat identical sentence structures.

Current Tool: ${tool}
Current Plan: ${plan}
Team Size: ${teamSize}
Monthly Spend: $${monthlySpend}

Recommendation Type: ${recommendationType}

Recommended Tool: ${recommendedTool}
Recommended Plan: ${recommendedPlan}

Estimated Savings: $${savings}

Reason:
${reason}

Tone:
Professional, concise, startup-friendly.
`;
}