export const githubCopilotPricing = {
  pro: {
    priceUSD: 10,
    priceINR: 850,
    bestFor: "individual developers",

    supportedUseCases: [
      "coding",
    ],
  },

  business: {
    priceUSD: 19,
    priceINR: 1600,
    billing: "per user / month",
    bestFor: "software teams",

    supportedUseCases: [
      "coding",
      "collaboration",
    ],
  },

  enterprise: {
    priceUSD: 39,
    priceINR: 3300,
    billing: "per user / month",
    bestFor: "large engineering organizations",

    supportedUseCases: [
      "coding",
      "collaboration",
      "enterprise",
    ],
  },
};