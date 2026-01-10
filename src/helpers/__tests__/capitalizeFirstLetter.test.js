import { capitalizeFirstLetter } from "../capitalizeFirstLetter";

describe("capitalizeFirstLetter", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("should handle single character strings", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });

  it("should handle already capitalized strings", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
  });

  it("should return the string as is if first letter is a number", () => {
    expect(capitalizeFirstLetter("123abc")).toBe("123abc");
  });

  it("should handle empty strings", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("should return null for null input", () => {
    expect(capitalizeFirstLetter(null)).toBeNull();
  });

  it("should return null for undefined input", () => {
    expect(capitalizeFirstLetter(undefined)).toBeNull();
  });

  it("should handle strings with spaces", () => {
    expect(capitalizeFirstLetter("hello world")).toBe("Hello world");
  });

  it("should handle strings with special characters", () => {
    expect(capitalizeFirstLetter("!hello")).toBe("!hello");
  });

  it("should handle mixed case strings", () => {
    expect(capitalizeFirstLetter("hELLO")).toBe("HELLO");
  });
});
