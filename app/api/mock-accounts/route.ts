import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "missing_email", message: "email query param required." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    accounts: [
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
    ],
  });
}
