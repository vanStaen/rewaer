import { consoleGreetings } from "../dev/consoleGreetings";

describe("consoleGreetings", () => {
  it("should log greeting messages to console", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    consoleGreetings();

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock.calls.length).toBeGreaterThan(0);

    consoleSpy.mockRestore();
  });

  it("should log multiple lines", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    consoleGreetings();

    // Should log at least several lines
    expect(consoleSpy.mock.calls.length).toBeGreaterThanOrEqual(5);

    consoleSpy.mockRestore();
  });

  it("should contain branding information in output", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    consoleGreetings();

    const allOutput = consoleSpy.mock.calls.map((call) => call[0]).join(" ");
    expect(
      allOutput.toLowerCase().includes("hello") ||
        allOutput.toLowerCase().includes("welcome") ||
        allOutput.includes("#"),
    ).toBe(true);

    consoleSpy.mockRestore();
  });

  it("should not throw any errors", () => {
    expect(() => {
      consoleGreetings();
    }).not.toThrow();
  });

  it("should return undefined", () => {
    const result = consoleGreetings();
    expect(result).toBeUndefined();
  });
});
