import { convertCodeToObjectString } from "../convertCodeTo";

describe("convertCodeToObjectString", () => {
  const mockData = [
    { code: "en", en: "English", de: "Englisch", fr: "Anglais" },
    { code: "de", en: "German", de: "Deutsch", fr: "Allemand" },
    { code: "fr", en: "French", de: "Französisch", fr: "Français" },
  ];

  it("should find and return the correct object by code", () => {
    const result = convertCodeToObjectString("en", mockData);
    expect(result).toEqual({
      code: "en",
      en: "English",
      de: "Englisch",
      fr: "Anglais",
    });
  });

  it('should return correct object for "de" code', () => {
    const result = convertCodeToObjectString("de", mockData);
    expect(result).toEqual({
      code: "de",
      en: "German",
      de: "Deutsch",
      fr: "Allemand",
    });
  });

  it('should return correct object for "fr" code', () => {
    const result = convertCodeToObjectString("fr", mockData);
    expect(result).toEqual({
      code: "fr",
      en: "French",
      de: "Französisch",
      fr: "Français",
    });
  });

  it('should return "not found" object when code does not exist', () => {
    const result = convertCodeToObjectString("es", mockData);
    expect(result).toEqual({
      en: "not found",
      de: "not found",
      fr: "not found",
    });
  });

  it('should return "not found" object for empty code', () => {
    const result = convertCodeToObjectString("", mockData);
    expect(result).toEqual({
      en: "not found",
      de: "not found",
      fr: "not found",
    });
  });

  it("should handle array with single object", () => {
    const singleData = [{ code: "test", value: "data" }];
    const result = convertCodeToObjectString("test", singleData);
    expect(result).toEqual({ code: "test", value: "data" });
  });

  it("should handle case-sensitive code matching", () => {
    const result = convertCodeToObjectString("EN", mockData);
    expect(result).toEqual({
      en: "not found",
      de: "not found",
      fr: "not found",
    });
  });

  it('should return "not found" for empty array', () => {
    const result = convertCodeToObjectString("en", []);
    expect(result).toEqual({
      en: "not found",
      de: "not found",
      fr: "not found",
    });
  });

  it("should work with objects that have additional properties", () => {
    const extendedData = [
      {
        code: "custom",
        en: "Custom",
        de: "Benutzerdefiniert",
        fr: "Personnalisé",
        extra: "field",
      },
    ];
    const result = convertCodeToObjectString("custom", extendedData);
    expect(result.code).toBe("custom");
    expect(result.extra).toBe("field");
  });
});
