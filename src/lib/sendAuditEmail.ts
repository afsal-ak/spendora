import { AuditResult } from "@/types/audit";
import { getResend } from "./getResend";
  const resend = getResend();



interface SendAuditEmailProps {
  email: string;
  auditId: string;
  result: AuditResult;
}

export async function sendAuditEmail({
  email,
  auditId,
  result,
}: SendAuditEmailProps) {
 const response = await resend.emails.send({
    from: "onboarding@resend.dev",

    to: email,

    subject: "Your AI Spend Audit Report",

    html: `
      <h2>Your AI Spend Audit is Ready</h2>

      <p>
        Estimated Monthly Savings:
        $${result.estimatedSavingsUSD}
      </p>

      <p>
        Recommended Plan:
        ${result.recommendedPlan}
      </p>

      <p>
        View your public audit:
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/audit/${auditId}">
          Open Audit Report
        </a>
      </p>

      <p>
        Credex may reach out for
        high-savings optimization cases.
      </p>
    `,

  });
    return response;

}