export interface AuditResult {
  recommendedTool?: string;
  recommendedPlan: string;
  estimatedSavingsUSD: number;
  estimatedSavingsINR: number;
  recommendationType:
    | "upgrade"
    | "downgrade"
    | "switch"
    | "keep";
  reason: string;
}
// export interface AuditResult {
//   recommendedPlan: string;
//   estimatedSavingsUSD: number;
//   reason: string;
  
// }
export interface SubmittedAuditData {
  selectedTool: string;
  selectedPlan: string;
  monthlySpend: number;
  teamSize: number;
  useCase: string;
}