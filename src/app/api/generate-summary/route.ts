import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
console.log(body,'body');

    const {
      tool,
      plan,
      teamSize,
      monthlySpend,
      recommendedPlan,
      savings,
      reason,
    } = body;

    const prompt = `
You are an AI spend optimization advisor.

Generate a concise personalized audit summary
between 80 and 120 words.

Current Tool: ${tool}
Current Plan: ${plan}
Team Size: ${teamSize}
Monthly Spend: $${monthlySpend}

Recommended Plan: ${recommendedPlan}
Estimated Savings: $${savings}

Reason:
${reason}

Tone:
Professional, concise, startup-friendly.
`;

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
console.log(response,'response of ai');

    const summary =
      response.content[0].type === "text"
        ? response.content[0].text
        : "Unable to generate summary.";

    return Response.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      summary:
        "Your current AI tooling setup shows optimization opportunities that could reduce monthly costs while maintaining productivity.",
    });
  }
}