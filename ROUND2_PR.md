# What this PR does

This PR adds a **“Re-audit on Pricing Change”** system to Spendora. Instead of audits being a one-time result, audits are now stored and can be re-evaluated when AI tool pricing changes.

The system detects pricing changes, re-runs affected audits, sends notification emails to users, and provides a side-by-side comparison view so users can understand what changed and why.

## Why

AI tool pricing changes frequently, and a one-time audit can become outdated quickly. A recommendation that made sense earlier may no longer be the best option after pricing or plans change.

The goal of this feature is to keep audits useful over time by notifying users when changes affect their recommendations and making it easy to compare old vs updated results.

## How it works

### 1. Persistent audit storage

Every completed audit is stored in Supabase with:

- audit ID
- user email
- input stack (`input_stack`)
- audit result (`output_result`)
- pricing snapshot (`pricing_snapshot`)
- timestamps

Pricing snapshots are stored as JSON so audits can later be compared against updated pricing.

### 2. Pricing change detection

Added a manual endpoint:

```txt
/api/detect-changes
```

The endpoint:

- fetches stored audits
- compares saved pricing snapshots with latest pricing
- detects:
  - pricing changes
  - added or removed plans
  - recommendation changes caused by updated pricing logic
- re-runs audits using saved input data
- stores updated results in `re_audit_result`

Used `lodash/isEqual` for deep pricing comparison to avoid issues with nested pricing objects.

### 3. Notification emails

Added consolidated email notifications using Resend.

Features:

- one email per user
- avoids duplicate emails for multiple affected audits
- includes:
  - previous recommendation
  - updated recommendation
  - pricing impact
  - re-audit link

Emails are sent only for affected audits to avoid unnecessary notifications.

### 4. Re-audit diff view

Added a re-run comparison page:

```txt
/audit/re-run/[id]
```

The page shows:

- previous recommendation
- updated recommendation
- side-by-side comparison
- pricing difference
- monthly savings delta
- recommendation reason changes

Flow:

```txt
pricing change
    ↓
/api/detect-changes
    ↓
re-run audit
    ↓
save updated result
    ↓
send email
    ↓
user clicks link
    ↓
diff view
```

## What I cut

- Scheduled cron execution (manual `/api/detect-changes` endpoint implemented first since the assignment allowed it)
- Email unsubscribe flow
- Admin dashboard for pricing changes and audit statistics
- Weekly public AI pricing changes page

I prioritized making the required end-to-end flow reliable within the 36-hour time limit.

## How to test it manually

1. Create an audit using the normal audit form.
2. Verify the audit is saved in Supabase.
3. Update pricing data manually in the pricing configuration.
4. Trigger:

```txt
POST /api/detect-changes
```

5. Verify:
   - affected audits are detected
   - re-audit result is stored
   - email is sent
6. Open the re-audit link from the email.
7. Verify the side-by-side comparison view loads correctly.

### Test scenarios completed

- pricing change → recommendation change
- same recommendation → email skipped
- multiple audits → consolidated email
- added or removed plan
- pricing-only changes
- recommendation logic changes

## What's tested

### Automated tests

- audit engine recommendation tests
- downgrade logic
- workflow recommendation logic
- recommendation switching logic
- image/video workflow recommendations

### Manual testing

- re-audit flow
- pricing detection
- consolidated emails
- diff view rendering
- savings calculations

## Open questions / risks

- Pricing detection currently uses a manual endpoint. If this were used in production, I would add scheduled checks using cron.
- Email sending works, but failed email retries could be improved.
- If the number of audits grows significantly, the re-audit process may need optimization for better performance.