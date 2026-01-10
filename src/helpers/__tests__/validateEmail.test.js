import { validateEmail } from "../validateEmail";

describe("validateEmail", () => {
  it("should validate correct email addresses", () => {
    expect(validateEmail("test@example.com")).not.toBeNull();
    expect(validateEmail("user@domain.co.uk")).not.toBeNull();
    expect(validateEmail("firstname.lastname@domain.com")).not.toBeNull();
  });

  it("should return array for valid email", () => {
    const result = validateEmail("valid@email.com");
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return null for invalid email without @", () => {
    expect(validateEmail("invalidemail.com")).toBeNull();
  });

  it("should return null for invalid email without domain", () => {
    expect(validateEmail("test@")).toBeNull();
  });

  it("should return null for invalid email without local part", () => {
    expect(validateEmail("@domain.com")).toBeNull();
  });

  it("should validate email with numbers", () => {
    expect(validateEmail("user123@test456.com")).not.toBeNull();
  });

  it("should validate email with hyphens in domain", () => {
    expect(validateEmail("user@my-domain.com")).not.toBeNull();
  });

  it("should handle uppercase emails (converted to lowercase)", () => {
    expect(validateEmail("TEST@EXAMPLE.COM")).not.toBeNull();
  });

  it("should return null for email with spaces", () => {
    expect(validateEmail("test @example.com")).toBeNull();
  });

  it("should return null for email with multiple @ symbols", () => {
    expect(validateEmail("test@@example.com")).toBeNull();
  });

  it("should validate email with subdomain", () => {
    expect(validateEmail("user@mail.example.com")).not.toBeNull();
  });

  it("should validate email with dots in local part", () => {
    expect(validateEmail("first.last@example.com")).not.toBeNull();
  });

  it("should return null for empty string", () => {
    expect(validateEmail("")).toBeNull();
  });

  it("should handle email with plus sign", () => {
    expect(validateEmail("user+tag@example.com")).not.toBeNull();
  });

  it("should validate short TLDs", () => {
    expect(validateEmail("user@domain.co")).not.toBeNull();
  });

  it("should return null for domain without TLD", () => {
    expect(validateEmail("user@domain")).toBeNull();
  });
});
