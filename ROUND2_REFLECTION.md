# ROUND2_REFLECTION

## 1. What was the most uncomfortable trade-off you made because of the time pressure?

The biggest trade-off I made was choosing to focus only on the required features and skipping extra improvements.

I decided to build a working end-to-end flow first: audit → pricing change detection → email → re-audit diff view. Because of the time limit, I did not spend time on bonus features like cron scheduling, unsubscribe links, or an admin dashboard.

I knew scheduled pricing checks would make the system better, but the assignment allowed a manual endpoint, so I chose the safer option to make sure the required flow worked properly. I wanted to avoid spending time on extra setup and risk breaking the core feature. My priority was making sure the reviewer could test the full experience without something important failing in the middle.

## 2. If we extended the deadline by another 24 hours right now, what's the first thing you'd do?

The first thing I would do is add automatic pricing checks using Vercel Cron.

Right now pricing changes are detected through a manual `/api/detect-changes` endpoint, which works and matches the assignment requirement. But if I had more time, I would make the system fully automatic so pricing checks happen on a schedule without manual work.

I would also improve monitoring around the re-audit flow to make sure failed jobs or email issues are easier to detect. Since the required features are already working, my next focus would be improving reliability and reducing manual effort.

## 3. Looking back at your Round 1 codebase as a now-experienced user of it: what's one thing your Round 1 self made harder for your Round 2 self?

My Round 1 code was built quickly, which made some Round 2 changes harder.

The main issue was that my recommendation logic was not designed for changing prices. In Round 2, I had to update the audit engine so recommendations could change when pricing changed or when plans were added or removed.

I also feel I could have used better shared types and cleaner structure in Round 1. It worked fine for one-time audits, but Round 2 made me realize how important extensibility is when adding new features. If the pricing logic had been more flexible from the beginning, building re-audit support would have been faster and cleaner.