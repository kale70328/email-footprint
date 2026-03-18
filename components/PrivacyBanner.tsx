"use client";

import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";

export function PrivacyBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="note"
      aria-label="Privacy notice"
      className="bg-indigo-50 border border-indigo-200 rounded-2xl px-5 py-4 flex gap-3 items-start"
    >
      <ShieldCheck className="w-4 h-4 text-brand-indigo mt-0.5 flex-shrink-0" aria-hidden="true" />
      <p className="text-xs text-indigo-700 font-body leading-relaxed flex-1">
        <strong className="font-semibold">Privacy-first:</strong> We do not store your email or
        results beyond this session. All data is held in memory only and automatically cleared after{" "}
        <strong>5 minutes</strong> of inactivity or when you click{" "}
        <strong>&quot;Clear session.&quot;</strong> Results are inferences from public breach data
        — not confirmations.
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss privacy notice"
        className="text-indigo-400 hover:text-indigo-600 transition-colors flex-shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
