import { supabase } from "@/lib/supabase";
import { sendAuditEmail } from "@/lib/sendAuditEmail";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabase } from "@/lib/getSupabase";


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
    } = body;

     const supabase=getSupabase()
   
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
            recommended_plan: result.recommendedPlan,
            estimated_savings: result.estimatedSavingsUSD,
            summary,
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
// import { supabase } from "@/lib/supabase";
// import { sendAuditEmail } from "@/lib/sendAuditEmail";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     if (body.companyFax) {
//       return Response.json(
//         {
//           success: false,
//           message: "Spam detected",
//         },
//         { status: 400 }
//       );
//     }
//     const {
//       email,
//       companyName,
//       role,
//       selectedTool,
//       selectedPlan,
//       monthlySpend,
//       teamSize,
//       result,
//       summary,
//     } = body;

//     const { data, error } =
//       await supabase
//         .from("audits")
//         .insert([
//           {
//             email,
//             company_name: companyName,
//             role,

//             tool: selectedTool,
//             plan: selectedPlan,

//             monthly_spend: monthlySpend,
//             team_size: teamSize,

//             recommended_plan:
//               result.recommendedPlan,

//             estimated_savings:
//               result.estimatedSavingsUSD,

//             summary,
//           },
//         ])
//         .select()
//         .single();

//     if (error) {
//       console.error(error);

//       return Response.json({
//         success: false,
//       });
//     }
//     const emailResponse = await sendAuditEmail({
//       email,
//       auditId: data.id,
//       result,
//     });
//     console.log(emailResponse, 'emailResponse');
//     return Response.json({
//       success: true,
//       auditId: data.id,
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json({
//       success: false,
//     });
//   }
// }