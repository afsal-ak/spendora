export const chatgptPricing = {

  plus: {
    priceUSD: 20,
    // priceUSD: 10,

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


  // //new plan for testing
  // max: {
  //   priceUSD: 5,
  //   priceINR: 999,
  //   bestFor:
  //     "best-value users",

  //   supportedUseCases: [
  //     "coding",
  //     "writing",
  //     "research",
  //     "mixed",
  //   ],
  // },


};