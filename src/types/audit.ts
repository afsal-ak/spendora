export interface AuditResult {
  recommendedPlan: string;
  estimatedSavingsUSD: number;
  reason: string;
}
export interface SubmittedAuditData {
  selectedTool: string;
  selectedPlan: string;
  monthlySpend: number;
  teamSize: number;
  useCase: string;
}