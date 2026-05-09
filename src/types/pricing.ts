export interface PricingPlan {
  priceINR: number | null;
  priceUSD: number | null;
  bestFor: string;
  features: string[];
  billing?: string;
  minUsers?: number;
  customPricing?: boolean;
}