## Day 1 — 2026-05-07

**Hours worked:** 1

**What I did:**  
Created the Spendora project using Next.js and TypeScript. Initialized GitHub repository and planned the project structure.

**What I learned:**  
Reviewed the assignment requirements and planned the MVP features.

**Blockers / what I'm stuck on:**  
No major blockers today.

**Plan for tomorrow:**  
Start building the landing page and spend input form.



## Day 2 — 2026-05-08

**Hours worked:** 3

**What I did:**  
Worked on the Spendora landing page. Built reusable React components for the navbar, hero section, problem section, how-it-works section, and a basic AI spend audit input form. Customized the global styling and improved the page structure.

**What I learned:**  
Learned how to structure landing page sections into reusable components for cleaner and more maintainable code.

**Blockers / what I'm stuck on:**  
Still planning the audit engine logic and pricing data structure for different AI tools.

**Plan for tomorrow:**  
Start implementing the audit calculation logic and improve the audit input flow.




## Day 3 — 2026-05-09

**Hours worked:** 4

**What I did:**  
Implemented the initial audit engine logic for ChatGPT plans. Added structured pricing data, pricing enums, dynamic plan selection in the audit form, and generated audit recommendations based on team size and spending inputs. Also created the first audit result UI section.

**What I learned:**  
Learned how to structure pricing systems and build conditional recommendation logic for SaaS audit workflows using TypeScript and React state management.

**Blockers / what I'm stuck on:**  
Still exploring how to scale the audit engine for multiple AI tools while keeping the logic maintainable.

**Plan for tomorrow:**  
Improve the audit recommendation system, add support for more AI tools, and enhance the audit result UI.



## Day 4 — 2026-05-10

**Hours worked:** 1.5

**What I did:**  
Expanded the pricing system to support multiple AI platforms including Claude, Gemini, and Cursor. Added pricing enums and structured pricing data for each platform. Improved the audit engine with recommendation logic for multiple tools and updated the audit form to support dynamic plan selection based on the selected AI platform.

**What I learned:**  
Learned how to scale a pricing and recommendation system across multiple SaaS AI products while keeping the architecture reusable and maintainable.

**Blockers / what I'm stuck on:**  
Still refining recommendation accuracy and exploring better ways to compare pricing tiers across different AI platforms.

**Plan for tomorrow:**  
Improve the audit results UI, add more recommendation scenarios, and continue refining the multi-platform audit experience.



## Day 5 — 2026-05-11

**Hours worked:** 4

**What I did:**  
Refactored the audit results into a separate reusable result component and redesigned the audit result UI with savings breakdown cards, recommendation sections, and improved layout structure. Added loading states and implemented localStorage persistence for audit form inputs and generated results to preserve state across page refreshes. Also improved the audit interaction flow by adding regenerate audit behavior when inputs change while keeping previously generated results visible until regeneration.

Started integrating AI-generated audit summaries using the Anthropic API with server-side API routes and fallback summary handling for API failures.

**What I learned:**  
Learned how to manage more advanced client-side state flows for audit generation, persistence, and regeneration UX patterns in Next.js. Also explored integrating external LLM APIs securely using server-side route handlers and environment variables.

**Blockers / what I'm stuck on:**  
Currently facing API billing and credit issues while testing Anthropic summary generation. Exploring fallback options and evaluating Gemini integration for faster iteration.

**Plan for tomorrow:**  
Finish AI-generated summary integration, implement audit email capture flow, and start building audit report delivery/email functionality.