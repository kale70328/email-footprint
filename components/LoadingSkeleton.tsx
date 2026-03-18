"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Bone({ className }: SkeletonProps) {
  return (
    <div
      className={cn("rounded-lg skeleton", className)}
      aria-hidden="true"
    />
  );
}

export function LoadingSkeleton() {
  return (
    <div role="status" aria-label="Loading results…" className="space-y-3">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-brand-border p-5 flex gap-4"
          style={{ animationDelay: `${i * 80}ms`, opacity: 1 - i * 0.12 }}
        >
          {/* Logo placeholder */}
          <Bone className="w-11 h-11 rounded-xl flex-shrink-0" />

          <div className="flex-1 space-y-2.5">
            {/* Site name */}
            <Bone className="h-4 w-28" />
            {/* Source */}
            <Bone className="h-3 w-48" />
            {/* Notes */}
            <Bone className="h-3 w-64" />
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* Badge */}
            <Bone className="h-5 w-16 rounded-full" />
            {/* Buttons */}
            <Bone className="h-7 w-24 rounded-lg" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading account cards…</span>
    </div>
  );
}

export function SummaryLoadingSkeleton() {
  return (
    <div role="status" aria-label="Loading summary…" className="space-y-4">
      <div className="bg-white rounded-2xl border border-brand-border p-6">
        <Bone className="h-5 w-40 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <Bone className="h-8 w-16" />
              <Bone className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-brand-border p-6">
        <Bone className="h-4 w-32 mb-3" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <Bone key={i} className="h-8 w-28 rounded-xl" />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading summary data…</span>
    </div>
  );
}
