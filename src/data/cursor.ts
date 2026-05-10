export const cursorPricing = {
  hobby: {
    priceUSD: 0,
    priceINR: 0,
    bestFor: "casual developers",
    features: [
      "Limited agent requests",
      "Limited tab completions",
      "No credit card required",
    ],
  },

  pro: {
    priceUSD: 20,
    priceINR: 1700,
    billing: "monthly",
    bestFor: "individual developers",
    features: [
      "Extended agent limits",
      "Frontier AI models",
      "Cloud agents",
      "MCPs and hooks",
    ],
  },

  proPlus: {
    priceUSD: 60,
    priceINR: 5100,
    billing: "monthly",
    bestFor: "heavy AI coding users",
    features: [
      "3x model usage",
      "Higher OpenAI and Claude limits",
      "Expanded AI workflows",
    ],
  },

  ultra: {
    priceUSD: 200,
    priceINR: 17000,
    billing: "monthly",
    bestFor: "power users and large workloads",
    features: [
      "20x model usage",
      "Priority feature access",
      "Maximum AI coding limits",
    ],
  },

  teams: {
    priceUSD: 40,
    priceINR: 3400,
    billing: "per user / month",
    bestFor: "software teams",
    features: [
      "Shared chats and commands",
      "Centralized billing",
      "Usage analytics",
      "SSO",
      "Role-based access control",
    ],
  },

  enterprise: {
    priceUSD: null,
    priceINR: null,
    customPricing: true,
    bestFor: "large organizations",
    features: [
      "SCIM seat management",
      "Audit logs",
      "Priority support",
      "Granular admin controls",
    ],
  },
};