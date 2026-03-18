"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface VerificationInputProps {
  onComplete: (code: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

export function VerificationInput({ onComplete, disabled = false, hasError = false }: VerificationInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Handle paste of full code
      if (value.length > 1) {
        const pasted = value.replace(/\D/g, "").slice(0, 6).split("");
        const newDigits = Array(6).fill("");
        pasted.forEach((d, i) => (newDigits[i] = d));
        setDigits(newDigits);
        if (pasted.length === 6) {
          onComplete(pasted.join(""));
          inputRefs.current[5]?.focus();
        } else {
          inputRefs.current[Math.min(pasted.length, 5)]?.focus();
        }
        return;
      }

      const cleaned = value.replace(/\D/g, "").slice(0, 1);
      const newDigits = [...digits];
      newDigits[index] = cleaned;
      setDigits(newDigits);

      if (cleaned && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      const full = newDigits.join("");
      if (full.length === 6 && !full.includes("")) {
        onComplete(full);
      }
    },
    [digits, onComplete]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (digits[index]) {
          const newDigits = [...digits];
          newDigits[index] = "";
          setDigits(newDigits);
        } else if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [digits]
  );

  const handleFocus = (index: number) => {
    // Select content on focus for easy replacement
    inputRefs.current[index]?.select();
  };

  return (
    <div>
      <div
        className="flex gap-2.5 justify-center"
        role="group"
        aria-label="Enter 6-digit verification code"
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={6}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={() => handleFocus(i)}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of 6`}
            className={cn(
              "digit-input w-11 h-14 rounded-xl border-2 text-center text-xl font-mono font-semibold",
              "bg-white text-brand-text transition-all duration-150 outline-none",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              hasError
                ? "border-red-400 bg-red-50 text-red-600"
                : digit
                ? "border-brand-indigo bg-indigo-50 text-brand-indigo"
                : "border-brand-border hover:border-indigo-300"
            )}
          />
        ))}
      </div>
      {hasError && (
        <p className="text-center text-red-500 text-xs mt-2 font-body" role="alert">
          Incorrect code. Please try again.
        </p>
      )}
    </div>
  );
}
