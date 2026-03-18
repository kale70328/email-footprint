import { NextRequest, NextResponse } from "next/server";

// Simulated delay for realism
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "invalid_email", message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  // Simulate network delay
  await sleep(800 + Math.random() * 400);

  // Mock rate limiting: if email starts with 'rate', simulate 429
  if (email.toLowerCase().startsWith("rate")) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many requests — please try after 5 minutes.", retry_after: 300 },
      { status: 429 }
    );
  }

  // Mock no-results
  if (email.toLowerCase().startsWith("none")) {
    return NextResponse.json({
      email,
      summary: { sources_checked: 3, breach_count: 0, possible_accounts: 0 },
      hints: [],
      details_available: false,
    });
  }

  return NextResponse.json({
    email,
    summary: {
      sources_checked: 3,
      breach_count: 2,
      possible_accounts: 4,
    },
    hints: [
      { category: "social", count: 2 },
      { category: "ecommerce", count: 1 },
      { category: "forums", count: 1 },
    ],
    details_available: false,
  });
}
