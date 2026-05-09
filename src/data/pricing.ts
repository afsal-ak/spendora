export const chatgptPricing = {
  free: {
    priceINR: 0,
    bestFor: "casual users",
    features: [
      "Limited GPT-5.5 access",
      "Limited uploads",
    ],
  },

  go: {
    priceINR: 399,
    bestFor: "budget users",
    features: [
      "More messages",
      "Longer memory",
    ],
  },

  plus: {
    priceINR: 1999,
    bestFor: "individual professionals",
    features: [
      "Advanced reasoning",
      "Custom GPTs",
      "Projects and tasks",
    ],
  },

  pro: {
    priceINR: 10699,
    bestFor: "heavy power users",
    features: [
      "Maximum usage",
      "Unlimited uploads",
      "GPT-5.5 Pro",
    ],
  },

  business: {
    priceINR: 1800,
    billing: "per user / month",
    minUsers: 2,
    bestFor: "small and growing teams",
    features: [
      "Workspace management",
      "SSO and MFA",
      "Shared projects",
    ],
  },

  enterprise: {
    priceINR: null,
    customPricing: true,
    bestFor: "large organizations",
    features: [
      "Advanced security",
      "SCIM and analytics",
      "24/7 priority support",
    ],
  },
};