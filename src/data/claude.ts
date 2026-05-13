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
// export const claudePricing = {
//   free: {
//     priceUSD: 0,
//     priceINR: 0,
//     bestFor: "casual users",
//     features: [
//       "Web and mobile access",
//       "Basic Claude usage",
//       "Limited projects",
//     ],
//   },

//   pro: {
//     priceUSD: 20,
//     priceINR: 1700,
//     bestFor: "individual professionals",
//     billing: "monthly",
//     features: [
//       "More usage",
//       "Claude Code",
//       "Research access",
//       "Unlimited projects",
//     ],
//   },

//   max: {
//     priceUSD: 100,
//     priceINR: 8500,
//     bestFor: "heavy AI users",
//     billing: "monthly",
//     features: [
//       "5x or 20x more usage",
//       "Priority access",
//       "Early feature access",
//     ],
//   },

//   teamStandard: {
//     priceUSD: 20,
//     priceINR: 1700,
//     billing: "per seat / month annually",
//     minUsers: 5,
//     bestFor: "small and mid-size teams",
//     features: [
//       "Central billing",
//       "SSO",
//       "Enterprise search",
//       "Admin controls",
//     ],
//   },

//   teamPremium: {
//     priceUSD: 100,
//     priceINR: 8500,
//     billing: "per seat / month annually",
//     minUsers: 5,
//     bestFor: "high usage teams",
//     features: [
//       "5x more usage",
//       "Claude Cowork",
//       "Advanced collaboration",
//     ],
//   },

//   enterprise: {
//     priceUSD: 20,
//     priceINR: 1700,
//     customPricing: true,
//     billing: "seat + usage pricing",
//     bestFor: "large organizations",
//     features: [
//       "SCIM",
//       "Audit logs",
//       "HIPAA-ready",
//       "Custom retention controls",
//     ],
//   },
// };