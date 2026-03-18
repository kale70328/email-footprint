import { NextRequest, NextResponse } from "next/server";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_ACCOUNTS = [
  {
    site: "LinkedIn",
    siteUrl: "https://www.linkedin.com",
    logo: "/logos/linkedin.svg",
    discoverySource: "Breach — LinkedIn (2012)",
    confidence: "possible",
    category: "social",
    notes: "Change password immediately; enable two-factor authentication.",
  },
  {
    site: "Twitter / X",
    siteUrl: "https://x.com",
    logo: "/logos/twitter.svg",
    discoverySource: "Breach — Twitter (2022)",
    confidence: "possible",
    category: "social",
    notes: "Review connected apps and revoke unused access.",
  },
  {
    site: "Adobe",
    siteUrl: "https://adobe.com",
    logo: "/logos/adobe.svg",
    discoverySource: "Breach — Adobe (2013)",
    confidence: "possible",
    category: "productivity",
    notes: "If you have a Creative Cloud subscription, verify billing details.",
  },
  {
    site: "Kickstarter",
    siteUrl: "https://www.kickstarter.com",
    logo: "/logos/kickstarter.svg",
    discoverySource: "Breach — Kickstarter (2014)",
    confidence: "possible",
    category: "ecommerce",
    notes: "Check for any unauthorized pledges or payment methods.",
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { error: "missing_fields", message: "Email and verification code are required." },
        { status: 400 }
      );
    }

    await sleep(700 + Math.random() * 400);

    // Mock: code 123456 always succeeds; anything else fails
    if (String(code).trim() !== "123456") {
      return NextResponse.json(
        { error: "invalid_code", message: "That code is incorrect. Please try again." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      status: "ok",
      details_available: true,
      accounts: MOCK_ACCOUNTS,
    });
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "Invalid request body." },
      { status: 400 }
    );
  }
}
