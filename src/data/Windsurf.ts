export const windsurfPricing = {
  pro: {
    priceUSD: 20,
    priceINR: 1700,
    bestFor: "individual developers",

    supportedUseCases: [
      "coding",
      "automation",
    ],
  },

  teams: {
    priceUSD: 40,
    priceINR: 3400,
    billing: "per user / month",
    bestFor: "engineering teams",

    supportedUseCases: [
      "coding",
      "collaboration",
    ],
  },

  enterprise: {
    customPricing: true,
    bestFor: "large organizations",

    supportedUseCases: [
      "coding",
      "collaboration",
      "enterprise",
    ],
  },
};