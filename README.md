# Email Footprint

A secure, privacy-first single-page web app that infers which sites may be linked to an email address using breach data and public sources. No signup required. Session-only. Built with Next.js 14, TypeScript, Tailwind CSS.

## Features

- 🔍 **Instant lookup** — scan an email against breach data in seconds
- 🔒 **Privacy-first** — no persistent storage; all data cleared after 5 min
- ✉️ **Email verification** — 6-digit code flow to unlock full results
- 📋 **Detailed account cards** — site name, breach source, confidence, actions
- 📥 **JSON export** — one-click download of your full report
- ♿ **Accessible** — WCAG AA compliant, keyboard navigable
- 📱 **Mobile-first responsive** design

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-org/email-footprint.git
cd email-footprint

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Emails

| Email | Behaviour |
|-------|-----------|
| `test@example.com` | Returns 4 possible accounts |
| `none@example.com` | Returns no results (clean) |
| `rate@example.com` | Simulates rate-limit (429) |
| `fail@example.com` | Simulates send-verification failure |

**Verification code:** Always use `123456` in the demo.

## Running Tests

```bash
npm test
```

Tests cover utility functions and key UI components.

## Project Structure

```
email-footprint/
├── app/
│   ├── page.tsx              # Home — email input + hero
│   ├── results/page.tsx      # Masked summary + verify CTA
│   ├── verify/page.tsx       # 6-digit code entry
│   ├── details/page.tsx      # Full verified account list
│   ├── privacy/page.tsx      # Privacy policy
│   └── api/
│       ├── lookup/route.ts          # GET /api/lookup?email=
│       ├── send-verification/route.ts # POST /api/send-verification
│       ├── verify-code/route.ts     # POST /api/verify-code
│       └── mock-accounts/route.ts   # GET /api/mock-accounts?email=
├── components/
│   ├── SearchBar.tsx
│   ├── ResultCard.tsx
│   ├── LoadingSkeleton.tsx
│   ├── Modal.tsx
│   ├── VerificationInput.tsx
│   ├── ToastProvider.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── PrivacyBanner.tsx
├── lib/
│   ├── types.ts
│   └── utils.ts
└── __tests__/
    ├── utils.test.ts
    └── components.test.tsx
```

## Replacing Mocks with Real APIs

All mock API logic lives in `app/api/*/route.ts`. To wire up real backends:

### 1. `/api/lookup` — Breach lookup
Replace the mock response with a call to your breach API (e.g. Have I Been Pwned):

```typescript
// app/api/lookup/route.ts
const HIBP_KEY = process.env.HIBP_API_KEY!;

const hibpRes = await fetch(
  `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`,
  { headers: { "hibp-api-key": HIBP_KEY, "User-Agent": "EmailFootprint" } }
);
// Transform and return
```

### 2. `/api/send-verification` — Email sending
Replace with your email provider (SendGrid, Resend, AWS SES):

```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
// Generate and store OTP, then:
await resend.emails.send({ to: email, subject: "Your code", text: `Code: ${otp}` });
```

### 3. `/api/verify-code` — OTP verification
Validate the code against your stored OTP (Redis recommended):

```typescript
const stored = await redis.get(`otp:${email}`);
if (stored !== code) return error("invalid_code");
await redis.del(`otp:${email}`);
// Return accounts
```

### Environment Variables

Create a `.env.local` file:

```env
HIBP_API_KEY=your_key_here
RESEND_API_KEY=re_your_key_here
REDIS_URL=redis://localhost:6379
```

## Exporting Results

Click the **Export JSON** button on the Details page to download a timestamped JSON report:

```json
{
  "email": "j***n@example.com",
  "generatedAt": "2024-01-15T12:00:00.000Z",
  "note": "Results are inferences from public breach data — not confirmations.",
  "accounts": [...]
}
```

## Privacy

- No user accounts or sign-up required
- All session data stored in `sessionStorage` only (browser-local)
- Auto-cleared after 5 minutes of inactivity
- "Clear session" button available in the nav at all times
- This app never requests or stores passwords
- See [`privacy-snippet.md`](./privacy-snippet.md) for exact UI copy

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Bricolage Grotesque, DM Sans, DM Mono (Google Fonts)
- **Testing:** Jest + React Testing Library

## License

MIT
