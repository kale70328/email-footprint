import { validateEmail, maskEmail, getCategoryLabel, getCategoryIcon } from "@/lib/utils";

describe("validateEmail", () => {
  it("accepts valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user+tag@domain.co.uk")).toBe(true);
    expect(validateEmail("a@b.io")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("notanemail")).toBe(false);
    expect(validateEmail("missing@")).toBe(false);
    expect(validateEmail("@nodomain.com")).toBe(false);
    expect(validateEmail("spaces in@email.com")).toBe(false);
  });
});

describe("maskEmail", () => {
  it("masks middle characters of username", () => {
    const masked = maskEmail("john@example.com");
    expect(masked).toMatch(/^j.*n@example\.com$/);
    expect(masked).toContain("*");
  });

  it("keeps domain intact", () => {
    const masked = maskEmail("user@domain.org");
    expect(masked.endsWith("@domain.org")).toBe(true);
  });

  it("handles short usernames", () => {
    expect(maskEmail("a@b.com")).toBe("a@b.com");
    expect(maskEmail("ab@b.com")).toBe("a*@b.com");
  });

  it("returns original if invalid format", () => {
    expect(maskEmail("notanemail")).toBe("notanemail");
  });
});

describe("getCategoryLabel", () => {
  it("returns human-readable labels", () => {
    expect(getCategoryLabel("social")).toBe("Social Media");
    expect(getCategoryLabel("ecommerce")).toBe("E-Commerce");
    expect(getCategoryLabel("forums")).toBe("Forums & Communities");
  });

  it("returns capitalized fallback for unknown", () => {
    expect(getCategoryLabel("unknown-cat")).toBe("unknown-cat");
  });
});

describe("getCategoryIcon", () => {
  it("returns emoji icons for known categories", () => {
    expect(getCategoryIcon("social")).toBe("👤");
    expect(getCategoryIcon("gaming")).toBe("🎮");
    expect(getCategoryIcon("finance")).toBe("💳");
  });

  it("returns default icon for unknown", () => {
    expect(getCategoryIcon("xyz")).toBe("🔗");
  });
});
