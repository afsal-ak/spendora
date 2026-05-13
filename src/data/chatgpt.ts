export const chatgptPricing = {
  plus: {
    priceUSD: 20,
    priceINR: 1999,
    bestFor: "individual professionals",

    supportedUseCases: [
      "coding",
      "writing",
      "research",
      "mixed",
    ],
  },

  business: {
    priceUSD: 25,
    priceINR: 1800,
    billing: "per user / month",
    minUsers: 2,
    bestFor: "small and growing teams",

    supportedUseCases: [
      "coding",
      "writing",
      "research",
      "mixed",
      "collaboration",
    ],
  },

  enterprise: {
    priceUSD: null,
    priceINR: null,
    customPricing: true,
    bestFor: "large organizations",

    supportedUseCases: [
      "coding",
      "writing",
      "research",
      "mixed",
      "enterprise",
    ],
  },

 
};