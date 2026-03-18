// Core domain types for Email Footprint

export interface LookupSummary {
  email: string;
  summary: {
    sources_checked: number;
    breach_count: number;
    possible_accounts: number;
  };
  hints: Array<{ category: string; count: number }>;
  details_available: boolean;
}

export interface Account {
  site: string;
  siteUrl: string;
  logo: string;
  discoverySource: string;
  confidence: "possible" | "verified";
  notes: string;
  category?: string;
}

export interface AccountsResponse {
  accounts: Account[];
}

export interface VerifyResponse {
  status: "ok";
  details_available: true;
  accounts: Account[];
}

export interface VerificationSendResponse {
  status: "ok";
  message: string;
}

export interface ApiError {
  error: string;
  message?: string;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
