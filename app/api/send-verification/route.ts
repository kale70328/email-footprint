import { NextRequest, NextResponse } from "next/server";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "invalid_email", message: "A valid email is required." },
        { status: 400 }
      );
    }

    await sleep(600 + Math.random() * 300);

    // Simulate occasional network error for testing
    if (email.toLowerCase().startsWith("fail")) {
      return NextResponse.json(
        { error: "send_failed", message: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      message: `Verification email sent to ${email}. Check your inbox.`,
    });
  } catch {
    return NextResponse.json(
      { error: "bad_request", message: "Invalid request body." },
      { status: 400 }
    );
  }
}
