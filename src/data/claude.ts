export const claudePricing = {
  free: {
    priceUSD: 0,
    priceINR: 0,
    bestFor: "casual users",

    supportedUseCases: [
      "writing",
      "research",
      "mixed",
    ],
  },

  pro: {
    priceUSD: 20,
    // priceUSD: 50,
    priceINR: 1700,
    bestFor: "individual professionals",

    supportedUseCases: [
      "writing",
      "research",
      "coding",
      "mixed",
    ],
  },

  max: {
    priceUSD: 100,
    priceINR: 8500,
    bestFor: "heavy AI users",

    supportedUseCases: [
      "writing",
      "research",
      "coding",
      "mixed",
    ],
  },

  team: {
    priceUSD: 20,
    priceINR: 1700,
    billing: "per seat / month",
    minUsers: 5,
    bestFor: "teams and organizations",

    supportedUseCases: [
      "writing",
      "research",
      "coding",
      "collaboration",
    ],
  },

  enterprise: {
    customPricing: true,
    bestFor: "large organizations",

    supportedUseCases: [
      "writing",
      "research",
      "coding",
      "enterprise",
    ],
  },

  
};