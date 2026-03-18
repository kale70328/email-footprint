"use client";

import React, { useState, useRef } from "react";
import { Search, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { cn, validateEmail } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (email: string) => void;
  loading?: boolean;
  defaultValue?: string;
  className?: string;
}

export function SearchBar({ onSearch, loading = false, defaultValue = "", className }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isInvalid = touched && value.length > 0 && !validateEmail(value);
  const isEmpty = touched && value.length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validateEmail(value)) {
      inputRef.current?.focus();
      return;
    }
    onSearch(value.trim().toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} noValidate>
      {/* Email input */}
      <div className="relative">
        <label htmlFor="email-input" className="sr-only">
          Your email address
        </label>
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3 transition-all duration-200",
            isInvalid || isEmpty
              ? "border-red-400 shadow-none"
              : value && validateEmail(value)
              ? "border-brand-indigo shadow-glow"
              : "border-brand-border focus-within:border-brand-indigo focus-within:shadow-glow"
          )}
        >
          <Search className="w-5 h-5 text-brand-sub flex-shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            id="email-input"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (touched) setTouched(true);
            }}
            onBlur={() => setTouched(true)}
            disabled={loading}
            aria-invalid={isInvalid || isEmpty}
            aria-describedby={isInvalid || isEmpty ? "email-error" : "email-hint"}
            className="flex-1 bg-transparent text-brand-text placeholder:text-brand-sub/60 outline-none font-body text-base disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading}
            aria-label="Search email footprint"
            className={cn(
              "flex-shrink-0 flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all duration-200",
              "bg-brand-indigo hover:bg-indigo-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
              "focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Scanning…</span>
              </>
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>

        {/* Inline validation */}
        {(isInvalid || isEmpty) && (
          <div
            id="email-error"
            className="flex items-center gap-1.5 mt-2 text-red-500 text-sm"
            role="alert"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span>
              {isEmpty ? "Please enter your email address." : "That doesn't look like a valid email."}
            </span>
          </div>
        )}
        {!isInvalid && !isEmpty && (
          <p id="email-hint" className="sr-only">
            Enter the email address you want to check
          </p>
        )}
      </div>

      {/* CAPTCHA placeholder */}
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-brand-border bg-white/70 px-4 py-3">
        <button
          type="button"
          onClick={() => setCaptchaChecked((v) => !v)}
          role="checkbox"
          aria-checked={captchaChecked}
          aria-label="I'm not a robot"
          className={cn(
            "w-5 h-5 rounded border-2 transition-all duration-150 flex items-center justify-center flex-shrink-0",
            captchaChecked
              ? "border-brand-indigo bg-brand-indigo"
              : "border-gray-300 bg-white hover:border-brand-indigo"
          )}
        >
          {captchaChecked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <span className="text-sm text-brand-sub font-body select-none">I&apos;m not a robot</span>
        <div className="ml-auto flex flex-col items-end">
          <div className="w-8 h-8 opacity-30">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect width="48" height="48" rx="4" fill="#4285F4" opacity="0.2" />
              <path d="M24 8L8 24l16 16 16-16L24 8z" fill="#4285F4" opacity="0.4" />
            </svg>
          </div>
          <span className="text-[9px] text-brand-sub/50 font-mono mt-0.5">reCAPTCHA</span>
        </div>
      </div>

      {/* Rate limit notice */}
      <p className="mt-2 text-xs text-brand-sub/70 text-center font-body">
        <ShieldCheck className="w-3 h-3 inline mr-1 opacity-60" aria-hidden="true" />
        Searches are rate-limited to protect the service. Max 5 searches per hour.
      </p>
    </form>
  );
}
