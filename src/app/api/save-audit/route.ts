import { getSupabase } from "@/lib/getSupabase";
import { sendAuditEmail } from "@/lib/sendAuditEmail";
import { rateLimit } from "@/lib/rate-limit";


export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    //rate limiting protection
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
    // Honeypot protection
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
      email,
      companyName,
      role,
      selectedTool,
      selectedPlan,
      monthlySpend,
      teamSize,
      result,
      summary,
      useCase,
      pricingSnapshot
    } = body;

    const supabase = getSupabase()

    const { data, error } =
      await supabase
        .from("audits")
        .insert([
          {
            email,
            company_name: companyName,
            role,
            tool: selectedTool,
            plan: selectedPlan,
            monthly_spend: monthlySpend,
            team_size: teamSize,
            usecase: useCase,
            recommended_tool: result.recommendedTool,
            recommended_plan: result.recommendedPlan,
            recommendation_type: result.recommendationType,
            estimated_savings: result.estimatedSavingsUSD,
            reason: result.reason,
            summary,
            input_stack: {
              selectedTool,
              selectedPlan,
              monthlySpend,
              teamSize,
              useCase,
              companyName,
              role,
            },
            output_result: {
              result,
              summary,
            },
            pricing_snapshot:
              pricingSnapshot,
          },
        ])
        .select()
        .single();

    if (error) {
      console.error(error);

      return Response.json(
        {
          success: false,
          message: "Failed to save audit",
        },
        { status: 500 }
      );
    }

    try {
      const emailResponse =
        await sendAuditEmail({
          email,
          auditId: data.id,
          result,
        });

      console.log(emailResponse, "emailResponse");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }
    return Response.json({
      success: true,
      auditId: data.id,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}