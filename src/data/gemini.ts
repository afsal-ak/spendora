export const geminiPricing = {
  pro: {
    priceUSD: 20,
    priceINR: 1950,
    bestFor: "professionals and developers",

    supportedUseCases: [
      "research",
      "coding",
      "writing",
      "mixed",
    ],
  },

  ultra: {
    priceUSD: 250,
    priceINR: null,
    customPricing: true,
    bestFor: "power users and creators",

    supportedUseCases: [
      "research",
      "coding",
      "video-generation",
      "creative-work",
      "mixed",
    ],
  },

  apiDirect: {
    usageBased: true,
    pricingModel: "per token",
    bestFor: "apps and API integrations",

    supportedUseCases: [
      "automation",
      "ai-apps",
      "coding",
    ],

    pricingNote:
      "Pricing depends on token usage and selected model.",
  },
};