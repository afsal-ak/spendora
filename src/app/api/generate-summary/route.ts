import { GoogleGenerativeAI } from "@google/generative-ai";

import { rateLimit } from "@/lib/rate-limit";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    //rate limiting
    const ip =  req.headers.get("x-forwarded-for") || "unknown";

    const allowed = rateLimit(ip);

    if (!allowed) {
      return Response.json(
        {
          success: false,
          message:"Too many requests",
        },
        { status: 429 }
      );
    }
    //honeypot protection
    if (body.companyFax) {
      return Response.json(
        {
          success: false,
          message: "Spam detected",
        },
        { status: 400 }
      );
    }
    console.log(body, "body");

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
Generate a concise personalized AI spend audit summary
between 60 and 100 words.

Focus on:
- cost efficiency
- workflow fit
- actionable recommendation

Do not exaggerate.
Avoid repeating exact numbers excessively.
Keep the tone concise and practical.

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

    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL!
    });

    const result = await model.generateContent(
      prompt
    );
    const response = result.response;
    const summary = response.text();
    console.log(summary, "AI SUMMARY");
    return Response.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    return Response.json({
      success: false,
      summary:
        "Your current AI tooling setup shows optimization opportunities that could reduce monthly costs while maintaining productivity.",
    });
  }
}
