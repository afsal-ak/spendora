# REFLECTION.md

## 1. The hardest bug I hit this week, and how I debugged it

The hardest issue I faced was adding pricing validation for the audit form. I wanted to prevent unrealistic inputs like selecting an enterprise plan and entering only $10/month as the spend.

At first, I added simple validation using the pricing objects, but the logic became messy because different tools had different pricing structures like custom pricing, usage-based pricing, and per-user pricing.

My first thought was that the issue came from missing values, so I added more checks and fallback values, but the problem still continued. I then realized I needed a shared structure for handling pricing across all tools.

I simplified the pricing validation logic and created a common pricing type so I could handle plans more consistently.

Another thing I changed was the user experience. Initially, I blocked unrealistic values completely. Later, I changed it to show warnings instead of hard errors because enterprise pricing can vary depending on contracts and team size.

That process helped me improve both the technical logic and the product experience.

---

## 2. A decision I reversed mid-week, and what made me reverse it

One major decision I reversed was the AI provider used for generating the personalized audit summaries.

I initially used the Anthropic API because the assignment mentioned it as the preferred option. The summary quality was good, especially for short recommendation-style outputs.

However, while testing the feature repeatedly during development, I started facing practical issues with credits and reliability for my setup. I realized depending completely on Anthropic close to the deadline could become risky.

Mid-week, I switched the implementation to Gemini while keeping the same prompt structure and fallback handling.

The switch itself was not very difficult, but it made me rethink how tightly coupled the summary generation logic should be to one provider.

I also improved the fallback handling so the application could still generate summaries even if the AI request failed.

In the end, I think this was the correct decision because the core value of the product is the audit logic itself, not the specific LLM provider.

---

## 3. What I would build in week 2 if I had it

If I had another week, I would focus more on improving the overall product experience around the audit results.

The first feature I would add is a dashboard for saved audits. Right now users can generate and share results, but there is no long-term view for tracking historical audits, pricing changes, or savings trends.

I would also add benchmark mode where users could compare their AI spend with companies of similar size or workflow type.

Another feature I would build is PDF export because many teams would likely want to share audit reports internally.

I would also improve analytics to track which recommendations users interact with most and which tools create the biggest savings opportunities.

On the UI side, I would add dark mode, improve mobile polish further, and refine some loading and empty states.

Finally, I would spend more time improving testing coverage and handling more edge cases around API pricing and unusual pricing combinations.

---

## 4. How I used AI tools during the project

I used ChatGPT heavily during the project for brainstorming, UI ideas, documentation refinement, prompt iteration, and debugging help.

I also used AI tools to improve wording in markdown files and refine some audit explanations.

However, there were several areas where I did not trust AI outputs completely.

I did not rely on AI-generated pricing data without verifying it manually using official pricing pages. I also avoided depending fully on AI for the audit math because the assignment specifically required financially realistic reasoning.

One example where AI was wrong was around enterprise pricing validation. Some early suggestions used unrealistic hardcoded assumptions and ignored per-user pricing structures.

I noticed the issue during manual testing because the recommendations did not make financial sense for smaller teams using enterprise plans.

I also found that some AI-generated TypeScript fixes solved one problem while creating new issues elsewhere.

Overall, I treated AI as a tool for speed and iteration, but not as the final source of truth for pricing or business logic.

---

## 5. Self-rating

### Discipline — 8/10
I maintained consistent progress throughout the week and avoided leaving the entire project for the final day.

### Code Quality — 8/10
The codebase is reasonably structured and typed, but with more time I would improve abstractions, testing, and component organization further.

### Design Sense — 7/10
I focused more on clarity and usability than complex visuals. The product feels clean and usable, although there is still room for polish.

### Problem Solving — 8/10
I handled several technical and product-related issues during development, especially around pricing validation, audit logic, and balancing realism with usability.

### Entrepreneurial Thinking — 7/10
This project pushed me to think more about distribution, pricing, and user behavior instead of only coding. I still have a lot to improve here, but the assignment helped me approach product-building differently.