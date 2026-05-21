import { getResend } from "./resend";
interface AffectedAudit {
  auditId: string;

  tool?: string;
  plan?: string;
  useCase?: string;

  oldRecommendation: {
    tool: string;
    plan: string;
  };

  newRecommendation: {
    tool?: string;
    plan?: string;
  };

  oldSavings?: number;
  newSavings?: number;

  oldReason?: string;
  newReason?: string;

  oldSummary?: string;

  pricingSummary?: string;
  oldMonthlyCost?: number;
  newMonthlyCost?: number;
  oldToolPrice?: number;
  newToolPrice?: number;
  modelRemoved?: boolean;
  newModelAdded?: boolean;

  monthlySavings?: number;


}

interface SendReauditEmailProps {
  email: string;
  affectedAudits: AffectedAudit[];
}

export async function sendReauditEmail({
  email,
  affectedAudits,
}: SendReauditEmailProps) {
  const resend =
    getResend();


  const auditHtml =
    affectedAudits
      .map(
        (
          audit,
          index
        ) => `
      <div style="
        border:1px solid #e5e5e5;
        border-radius:12px;
        padding:20px;
        margin-bottom:24px;
        background:#fafafa;
      ">
        <h3 style="
          margin-top:0;
          margin-bottom:10px;
        ">
          Audit ${index + 1
          }
        </h3>

        <p>
          <strong>
            Current setup:
          </strong>
          ${audit.tool
          }
          (
          ${audit.plan
          }
          )
        </p>

        <p>
          <strong>
            Use case:
          </strong>
          ${audit.useCase
          }
        </p>

        <hr />

       <h4>
  What changed
</h4>

${audit.modelRemoved
            ? `
      <div style="
        background:#fff4e5;
        border-radius:8px;
        padding:12px;
        margin-bottom:12px;
      ">
        <strong>
          Model removed
        </strong>

        <p>
          ${audit
              .oldRecommendation
              .tool
            }
          (
          ${audit
              .oldRecommendation
              .plan
            }
          )
          is no longer
          available in the
          latest pricing.
        </p>
      </div>
    `
            : `
      <div style="
        background:#f5f5f5;
        border-radius:8px;
        padding:12px;
        margin-bottom:12px;
      ">
        <strong>
          Price updated
        </strong>

        <p>
          ${audit
              .oldRecommendation
              .tool
            }
          (
          ${audit
              .oldRecommendation
              .plan
            }
          )
          pricing changed:
        </p>

        <p>
          $${audit
              .oldToolPrice
            }
          →
          $${audit
              .newToolPrice
            }
        </p>
      </div>
    `
          }

${audit.newModelAdded
            ? `
      <div style="
        background:#e8f7ee;
        border-radius:8px;
        padding:12px;
        margin-bottom:12px;
      ">
        <strong>
  New model available
</strong>

<p>
  A new model/plan is
  now available based
  on updated pricing.

  We'd now recommend:

          <strong>
            ${audit
              .newRecommendation
              ?.tool
            }
          </strong>
          (
          ${audit
              .newRecommendation
              ?.plan
            }
          )
        </p>
      </div>
    `
            : ""
          }

        <h4>
          Recommendation impact
        </h4>

        <table style="
          width:100%;
          border-collapse:collapse;
          margin:15px 0;
        ">
          <thead>
            <tr>
              <th align="left">
                Previous
              </th>

              <th align="left">
                Updated
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <strong>
                  ${audit
            .oldRecommendation
            .tool
          }
                </strong>
                (
                ${audit
            .oldRecommendation
            .plan
          }
                )
              </td>

              <td>
                <strong>
                  ${audit
            .newRecommendation
            ?.tool
          }
                </strong>
                (
                ${audit
            .newRecommendation
            ?.plan
          }
                )
              </td>
            </tr>
          </tbody>
        </table>

        <p>
  <strong>
    Monthly cost impact:
  </strong>
  $${audit.oldMonthlyCost}
  →
  $${audit.newMonthlyCost}
</p>

<p>
  <strong>
    Potential savings:
  </strong>
  $${(audit.oldMonthlyCost ?? 0) -
          (audit.newMonthlyCost ?? 0)
          }/month
</p>

        <p>
          <strong>
            Why this changed:
          </strong>
          ${audit.newReason ??
          "Updated pricing changed the recommendation."
          }
        </p>

        <p>
          <strong>
            Previous audit summary:
          </strong>
          ${audit.oldSummary ??
          "-"
          }
        </p>

        <a
          href="${process.env
            .NEXT_PUBLIC_APP_URL
          }/audit/${audit.auditId
          }?reaudit=true"
          style="
            background:#000;
            color:#fff;
            padding:10px 16px;
            border-radius:6px;
            text-decoration:none;
            display:inline-block;
            margin-top:12px;
          "
        >
          Compare Old vs New Audit
        </a>
      </div>
    `
      )
      .join("");

  return resend.emails.send({
    from:
      "onboarding@resend.dev",

    to: email,

    subject:
      `Your AI audit changed (${affectedAudits.length} affected)`,

    html: `
      <div style="
        max-width:650px;
        margin:auto;
        font-family:Arial,sans-serif;
        padding:20px;
      ">
        <h1>
          Your AI audit
          recommendation changed
        </h1>

        <p>
          We detected pricing
          changes that affect
          ${affectedAudits.length
      }
          of your saved audits.
        </p>

        <p>
          We've re-run the
          recommendations using
          updated pricing and
          found differences in
          your recommended tools.
        </p>

        ${auditHtml}

        <hr />

        <p style="
          color:#777;
          font-size:14px;
        ">
          Credex AI Audit
        </p>
      </div>
    `,
  });
}
// import { getResend } from "./resend";

// interface AffectedAudit {
//   auditId: string;

//   oldRecommendation: {
//     tool: string;
//     plan: string;
//   };

//   newRecommendation: {
//     tool?: string;
//     plan?: string;
//   };

//   pricingChanges?: {
//     tool: string;
//     oldPrice: number;
//     newPrice: number;
//   }[];
// }

// interface SendReauditEmailProps {
//   email: string;
//   affectedAudits: AffectedAudit[];
// }

// export async function sendReauditEmail({
//   email,
//   affectedAudits,
// }: SendReauditEmailProps) {
//   const resend =
//     getResend();

//   const auditHtml =
//     affectedAudits
//       .map((audit) => {
//         const pricingHtml =
//           audit
//             .pricingChanges
//             ?.length
//             ? audit.pricingChanges
//                 .map(
//                   (
//                     change
//                   ) => `
//                   <li>
//                     <strong>
//                       ${
//                         change.tool
//                       }
//                     </strong>
//                     :
//                     $${
//                       change.oldPrice
//                     }
//                     →
//                     $${
//                       change.newPrice
//                     }
//                   </li>
//                 `
//                 )
//                 .join("")
//             : `
//               <li>
//                 Pricing changed for
//                 one or more tools
//                 used in this audit.
//               </li>
//             `;

//         return `
//           <div style="
//             border:1px solid #ddd;
//             border-radius:8px;
//             padding:16px;
//             margin-bottom:20px;
//           ">
//             <h3>
//               Audit Recommendation Updated
//             </h3>

//             <p>
//               Pricing changes
//               affected your
//               previous audit.
//             </p>

//             <p>
//               <strong>
//                 What changed:
//               </strong>
//             </p>

//             <ul>
//               ${pricingHtml}
//             </ul>

//             <p>
//               <strong>
//                 Previous recommendation:
//               </strong>
//               ${
//                 audit
//                   .oldRecommendation
//                   .tool
//               }
//               (
//               ${
//                 audit
//                   .oldRecommendation
//                   .plan
//               }
//               )
//             </p>

//             <p>
//               <strong>
//                 New recommendation:
//               </strong>
//               ${
//                 audit
//                   .newRecommendation
//                   ?.tool ??
//                 "No change"
//               }
//               (
//               ${
//                 audit
//                   .newRecommendation
//                   ?.plan ??
//                 "-"
//               }
//               )
//             </p>

//             <p>
//               Based on updated
//               pricing, we'd now
//               recommend a
//               different setup for
//               your AI stack.
//             </p>

//             <a
//               href="${
//                 process.env
//                   .NEXT_PUBLIC_APP_URL
//               }/audit/${
//                 audit.auditId
//               }?reaudit=true"
//               style="
//                 background:#000;
//                 color:white;
//                 padding:10px 16px;
//                 text-decoration:none;
//                 border-radius:6px;
//                 display:inline-block;
//                 margin-top:10px;
//               "
//             >
//               Re-run Audit
//             </a>
//           </div>
//         `;
//       })
//       .join("");

//   const response =
//     await resend.emails.send(
//       {
//         from:
//           "onboarding@resend.dev",

//         to: email,

//         subject:
//           "Your AI audit recommendation changed",

//         html: `
//         <div style="
//           font-family:Arial,sans-serif;
//           max-width:600px;
//           margin:auto;
//           padding:20px;
//         ">
//           <h2>
//             Pricing updates
//             affected your AI audit
//           </h2>

//           <p>
//             We detected pricing
//             changes that may
//             impact your previous
//             recommendation.
//           </p>

//           <p>
//             Review the updates
//             below and re-run your
//             audit to compare old
//             vs new results.
//           </p>

//           ${auditHtml}

//           <hr />

//           <p style="
//             color:#666;
//             font-size:14px;
//           ">
//             Credex AI Audit
//           </p>
//         </div>
//       `,
//       }
//     );

//   return response;
// }