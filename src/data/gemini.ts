export const geminiPricing = {
  free: {
    priceUSD: 0,
    priceINR: 0,
    bestFor: "casual users",
    features: [
      "Gemini app access",
      "Image generation",
      "Deep Research",
      "15 GB storage",
      "NotebookLM access",
    ],
  },

  plus: {
    priceUSD: 8,
    priceINR: 399,
    billing: "monthly",
    bestFor: "daily productivity users",
    features: [
      "Enhanced Gemini 3.1 Pro access",
      "Video creation features",
      "200 GB storage",
      "Gemini in Gmail and Docs",
      "Expanded NotebookLM limits",
    ],
  },

  pro: {
    priceUSD: 20,
    priceINR: 1950,
    billing: "monthly",
    bestFor: "professionals and developers",
    features: [
      "Higher Gemini 3.1 Pro limits",
      "Gemini Code Assist",
      "Gemini CLI",
      "5 TB storage",
      "Advanced AI tooling",
    ],
  },

  ultra: {
    priceUSD: 250,
    priceINR: null,
    customPricing: true,
    billing: "monthly",
    bestFor: "power users and creators",
    features: [
      "Highest Gemini limits",
      "Veo 3 video generation",
      "30 TB storage",
      "YouTube Premium",
      "Gemini Agent access",
    ],
  },
};