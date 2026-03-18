"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X, Trash2 } from "lucide-react";
import { cn, clearSession } from "@/lib/utils";
import { useToast } from "./ToastProvider";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { addToast } = useToast();

  const handleClearSession = () => {
    clearSession();
    addToast("Session cleared. All data has been removed.", "success");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-white/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-brand-text hover:text-brand-indigo transition-colors"
          aria-label="Email Footprint — Home"
        >
          <div className="w-7 h-7 rounded-lg bg-brand-indigo flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span className="text-sm tracking-tight">Email Footprint</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
          <Link
            href="/"
            className="text-sm text-brand-sub hover:text-brand-text px-3 py-1.5 rounded-lg hover:bg-brand-bg transition-colors font-body"
          >
            Home
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-brand-sub hover:text-brand-text px-3 py-1.5 rounded-lg hover:bg-brand-bg transition-colors font-body"
          >
            Privacy
          </Link>
          <button
            onClick={handleClearSession}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-body"
            aria-label="Clear session data"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            Clear session
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-brand-sub hover:text-brand-text transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-brand-border bg-white"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-brand-sub hover:text-brand-text px-3 py-2 rounded-lg hover:bg-brand-bg transition-colors font-body"
            >
              Home
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-brand-sub hover:text-brand-text px-3 py-2 rounded-lg hover:bg-brand-bg transition-colors font-body"
            >
              Privacy
            </Link>
            <button
              onClick={handleClearSession}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors font-body text-left"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Clear session
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
