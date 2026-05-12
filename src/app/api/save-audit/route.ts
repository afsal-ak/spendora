import { supabase } from "@/lib/supabase";
import { sendAuditEmail } from "@/lib/sendAuditEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
    } = body;

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

            recommended_plan:
              result.recommendedPlan,

            estimated_savings:
              result.estimatedSavingsUSD,

            summary,
          },
        ])
        .select()
        .single();

    if (error) {
      console.error(error);

      return Response.json({
        success: false,
      });
    }
    const emailResponse = await sendAuditEmail({
      email,
      auditId: data.id,
      result,
    });
    console.log(emailResponse, 'emailResponse');
    return Response.json({
      success: true,
      auditId: data.id,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
    });
  }
}