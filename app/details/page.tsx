"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2, Download, RefreshCw, ShieldCheck, Filter,
  Loader2, AlertTriangle
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ResultCard } from "@/components/ResultCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useToast } from "@/components/ToastProvider";
import { loadSession, maskEmail, downloadJSON, getCategoryLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Account } from "@/lib/types";

function DetailsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { addToast } = useToast();

  const emailParam = params.get("email") ?? "";
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [notVerified, setNotVerified] = useState(false);

  useEffect(() => {
    if (!emailParam) {
      router.replace("/");
      return;
    }

    const session = loadSession();

    // Check if verified
    if (session?.verified && session?.accounts && session.email === emailParam) {
      setAccounts(session.accounts as Account[]);
      setLoading(false);
      return;
    }

    // Not verified — show gate
    setNotVerified(true);
    setLoading(false);
  }, [emailParam, router]);

  const categories = ["all", ...Array.from(new Set(accounts.map((a) => a.category ?? "other")))];

  const filtered = filter === "all" ? accounts : accounts.filter((a) => a.category === filter);

  const handleDownload = () => {
    downloadJSON(
      {
        email: maskEmail(emailParam),
        generatedAt: new Date().toISOString(),
        note: "Results are inferences from public breach data — not confirmations.",
        accounts: accounts.map((a) => ({
          site: a.site,
          category: a.category,
          discoverySource: a.discoverySource,
          confidence: a.confidence,
          notes: a.notes,
        })),
      },
      `email-footprint-${Date.now()}.json`
    );
    addToast("Report exported as JSON.", "success");
  };

  if (loading) return <LoadingSkeleton />;

  if (notVerified) {
    return (
      <div className="bg-white rounded-2xl border border-brand-border p-10 text-center space-y-4 max-w-sm mx-auto">
        <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6 text-amber-500" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-brand-text">Verification required</h2>
          <p className="text-sm text-brand-sub font-body mt-1 leading-relaxed">
            You need to verify your email before viewing the full results.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => router.push(`/results?email=${encodeURIComponent(emailParam)}`)}
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl bg-brand-indigo text-white hover:bg-indigo-600 transition-colors"
          >
            Back to results
          </button>
          <button
            onClick={() => router.push("/")}
            className="text-sm text-brand-sub hover:text-brand-text transition-colors font-body"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" aria-hidden="true" />
            <h1 className="font-display font-bold text-xl text-brand-text">
              Verified results
            </h1>
          </div>
          <p className="text-xs text-brand-sub font-body mt-0.5">
            {accounts.length} accounts found for{" "}
            <span className="font-mono text-brand-indigo">{maskEmail(emailParam)}</span>
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-brand-border bg-white text-brand-sub hover:text-brand-text hover:bg-brand-bg transition-colors"
            aria-label="Download results as JSON"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            Export JSON
          </button>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-brand-border bg-white text-brand-sub hover:text-brand-text hover:bg-brand-bg transition-colors"
            aria-label="New search"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            New search
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3" role="note">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <p className="text-xs text-amber-700 font-body leading-relaxed">
          <strong>Disclaimer:</strong> These results are inferences based on publicly known breach
          data. A &quot;Possible&quot; label means your email appeared in breach data associated
          with that service — it is not a confirmation of an active account. This app never stores
          your data beyond this session.
        </p>
      </div>

      {/* Category filter */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-brand-sub flex-shrink-0" aria-hidden="true" />
          <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={cn(
                  "text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-150 font-body",
                  filter === cat
                    ? "bg-brand-indigo text-white border-brand-indigo"
                    : "bg-white text-brand-sub border-brand-border hover:border-brand-indigo hover:text-brand-indigo"
                )}
              >
                {cat === "all" ? "All" : getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Account cards */}
      <div className="space-y-3" aria-label="Account results">
        {filtered.length === 0 ? (
          <p className="text-center text-brand-sub py-8 font-body text-sm">
            No accounts in this category.
          </p>
        ) : (
          filtered.map((account, i) => (
            <ResultCard key={`${account.site}-${i}`} account={account} index={i} />
          ))
        )}
      </div>

      {/* Session privacy reminder */}
      <div className="flex items-center gap-2 justify-center pt-2">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-green" aria-hidden="true" />
        <p className="text-xs text-brand-sub/70 font-body">
          Session data is cleared after 5 minutes or when you click &quot;Clear session&quot;
        </p>
      </div>
    </div>
  );
}

export default function DetailsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <Suspense fallback={<LoadingSkeleton />}>
          <DetailsContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
