"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          "relative bg-white rounded-2xl shadow-card-hover max-w-md w-full p-6 border border-brand-border",
          "animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <h2
            id="modal-title"
            className="text-base font-semibold text-brand-text font-display leading-tight"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-brand-sub hover:text-brand-text transition-colors ml-4 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="text-sm text-brand-sub leading-relaxed font-body">{children}</div>
      </div>
    </div>
  );
}

interface InfoTooltipButtonProps {
  label: string;
  onClick: () => void;
}

export function InfoTooltipButton({ label, onClick }: InfoTooltipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Learn more: ${label}`}
      className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-brand-border text-brand-sub hover:bg-indigo-100 hover:text-brand-indigo transition-colors text-[10px] font-semibold font-mono ml-1"
    >
      ?
    </button>
  );
}
