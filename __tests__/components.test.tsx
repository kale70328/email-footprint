/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "@/components/SearchBar";
import { ResultCard } from "@/components/ResultCard";
import { PrivacyBanner } from "@/components/PrivacyBanner";

// Mock ToastProvider for components that need it
jest.mock("@/components/ToastProvider", () => ({
  useToast: () => ({ addToast: jest.fn(), removeToast: jest.fn() }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("SearchBar", () => {
  it("renders the email input", () => {
    render(<SearchBar onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("shows inline error for invalid email on submit", async () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText("you@example.com");
    const button = screen.getByRole("button", { name: /search email footprint/i });

    fireEvent.change(input, { target: { value: "notanemail" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("calls onSearch with valid email", async () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText("you@example.com");
    const button = screen.getByRole("button", { name: /search email footprint/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith("test@example.com");
    });
  });

  it("shows empty-field error if submitted blank", async () => {
    render(<SearchBar onSearch={jest.fn()} />);
    const button = screen.getByRole("button", { name: /search email footprint/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/enter your email/i);
    });
  });
});

describe("ResultCard", () => {
  const mockAccount = {
    site: "LinkedIn",
    siteUrl: "https://www.linkedin.com",
    logo: "/logos/linkedin.svg",
    discoverySource: "Breach — LinkedIn (2012)",
    confidence: "possible" as const,
    category: "social",
    notes: "Change password immediately.",
  };

  it("renders site name", () => {
    render(<ResultCard account={mockAccount} />);
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  it("renders 'Possible' confidence badge", () => {
    render(<ResultCard account={mockAccount} />);
    expect(screen.getByLabelText(/confidence: possible/i)).toBeInTheDocument();
  });

  it("renders Visit and Change password buttons", () => {
    render(<ResultCard account={mockAccount} />);
    expect(screen.getByLabelText(/visit linkedin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/change password on linkedin/i)).toBeInTheDocument();
  });

  it("renders verified badge when confidence is verified", () => {
    render(<ResultCard account={{ ...mockAccount, confidence: "verified" }} />);
    expect(screen.getByLabelText(/confidence: verified/i)).toBeInTheDocument();
  });
});

describe("PrivacyBanner", () => {
  it("renders privacy message", () => {
    render(<PrivacyBanner />);
    expect(screen.getByRole("note")).toBeInTheDocument();
  });

  it("can be dismissed", async () => {
    render(<PrivacyBanner />);
    const dismissButton = screen.getByLabelText(/dismiss privacy notice/i);
    fireEvent.click(dismissButton);

    await waitFor(() => {
      expect(screen.queryByRole("note")).not.toBeInTheDocument();
    });
  });
});
