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


## Day 6 — 2026-05-12

**Hours worked:** 6

**What I did:**  
Integrated AI-generated audit summaries using the Gemini API after facing Anthropic API credit limitations during testing. Implemented server-side summary generation with fallback handling for API failures to ensure the audit flow remains functional even if the AI response fails.

Built the audit lead capture and email delivery workflow using Resend for transactional email sending. Added backend audit submission handling and connected the email flow to audit generation so users can receive their audit reports directly after submission.

Refactored both the audit form and lead capture form using React Hook Form and Zod validation for cleaner form state management, reusable schema validation, and real-time validation feedback. Organized validation logic into reusable schema files to improve maintainability and architecture consistency across the project.

Also improved the overall UX with loading states, validation feedback, and cleaner audit interaction flows.

**What I learned:**  
Learned how to integrate Gemini-based AI generation securely through server-side API routes and explored handling fallback flows for unreliable external AI APIs. Also gained deeper experience with scalable form architecture using React Hook Form and Zod in Next.js applications, along with transactional email workflows using Resend.

**Blockers / what I'm stuck on:**  
Faced API credit limitations while testing Anthropic summary generation, which interrupted the initial AI summary workflow. Switched to Gemini API integration for faster iteration and continued refining fallback handling for AI generation failures. Also still planning the implementation for public shareable audit URLs with sensitive user information removed from the public version.

**Plan for tomorrow:**  
Complete lightweight abuse protection using a honeypot strategy and document the implementation reasoning. Finish remaining required documentation files including PROMPTS.md, PRICING_DATA.md, ARCHITECTURE.md, README.md, GTM.md, ECONOMICS.md, METRICS.md, and REFLECTION.md. Set up GitHub Actions CI for linting and tests, deploy the application to Vercel, verify production flows end-to-end, complete remaining user interviews and pricing verification, then prepare and submit the final assignment deliverables.


**Day 7 — 2026-05-13**

**Hours worked:** 7

**What I did:**
Completed the remaining MVP requirements and finalized the Spendora project for submission. Implemented lightweight abuse protection for the audit generation API using both IP-based rate limiting and honeypot validation to reduce spam and automated misuse.

Finished the remaining project documentation including architecture notes, pricing documentation, prompts documentation, metrics, economics, reflection, and README setup instructions. Organized the repository structure, cleaned up unused code, improved environment variable handling, and reviewed overall project consistency.

Set up deployment on Vercel
 and verified the production flow end-to-end including audit generation, AI summary fallback handling, form validation, email delivery, and API responses. Also reviewed pricing configurations and completed final testing across different audit scenarios to ensure the recommendation engine behaved correctly.

Additionally refined the UI/UX with final spacing, loading state improvements, validation feedback polishing, and responsive behavior adjustments for a cleaner overall experience.

**What I learned:**
Learned how to prepare and polish a full-stack MVP project for production-style deployment, including deployment verification, API abuse protection, environment configuration management, and end-to-end testing workflows. Also gained better understanding of balancing feature completeness, maintainability, and practical MVP scope within assignment timelines.

**Blockers / what I'm stuck on:**
Faced API credit and quota limitations while testing AI summary generation extensively with external LLM providers. Initially encountered Anthropic API billing restrictions during development and later continued monitoring Gemini API usage limits during final testing. Implemented fallback summary handling to ensure the audit generation flow remains functional even when external AI responses fail or rate limits are reached.
 

 **Plan for tomorrow:**
Purchase and configure a new Gemini API key for extended testing and more stable AI summary generation during production usage. Re-test the AI audit workflow with the updated API configuration, verify quota stability, and complete the final assignment submission process.