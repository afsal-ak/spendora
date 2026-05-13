import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildAuditSummaryPrompt } from "@/prompts/audit-summary.prompt";
import { rateLimit } from "@/lib/rate-limit";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    //rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    const allowed = rateLimit(ip);

    if (!allowed) {
      return Response.json(
        {
          success: false,
          message: "Too many requests",
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
 
    const {
      tool,
      plan,
      teamSize,
      monthlySpend,
      recommendedPlan,
      recommendedTool,
      recommendationType,
      savings,
      reason,
    } = body;

    const prompt =
      buildAuditSummaryPrompt({
        tool,
        plan,
        teamSize,
        monthlySpend,
        recommendedTool,
        recommendedPlan,
        recommendationType,
        savings,
        reason,
      });
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL!
    });

    const result = await model.generateContent(
      prompt
    );
    const response = result.response;
    const summary = response.text();
     return Response.json({
      success: true,
      summary,
    });
  } catch (error) {
     return Response.json({
      success: false,
      summary:
      "Your current AI setup may have optimization opportunities based on workflow fit, team size, and pricing efficiency. Consider reviewing the recommended plan and tool configuration to improve productivity and reduce unnecessary spend.",
    });
  }
}
