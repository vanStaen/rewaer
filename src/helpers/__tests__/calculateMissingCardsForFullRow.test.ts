import { calculateMissingCardsForFullRow } from "../calculateMissingCardsForFullRow";

describe("calculateMissingCardsForFullRow", () => {
  describe("basic calculations with default values", () => {
    it("should return 0 for containerWidth of 0", () => {
      const result = calculateMissingCardsForFullRow(0, 10);
      expect(result).toBe(0);
    });

    it("should return 0 for totalItems of 0", () => {
      const result = calculateMissingCardsForFullRow(1000, 0);
      expect(result).toBe(0);
    });

    it("should calculate 4 cards per row for containerWidth of 1080", () => {
      // Available width: 1080 - 40 = 1040
      // 4 cards: 4*238 + 3*20 = 952 + 60 = 1012 (fits)
      // 5 cards: 5*238 + 4*20 = 1190 + 80 = 1270 (doesn't fit)
      const totalItems = 5;
      const result = calculateMissingCardsForFullRow(1080, totalItems);
      // 5 items, 4 per row = 1 row with 1 item, needs 3 more
      expect(result).toBe(3);
    });

    it("should calculate 3 cards per row for containerWidth of 1034", () => {
      // Available width: 1034 - 40 = 994
      // 3 cards: 3*238 + 2*20 = 714 + 40 = 754 (fits)
      // 4 cards: 4*238 + 3*20 = 952 + 60 = 1012 (doesn't fit)
      const totalItems = 4;
      const result = calculateMissingCardsForFullRow(1034, totalItems);
      // 4 items, 3 per row = 1 row with 1 item, needs 2 more
      expect(result).toBe(2);
    });

    it("should calculate 2 cards per row for containerWidth of 580", () => {
      // Available width: 580 - 40 = 540
      // 2 cards: 2*238 + 1*20 = 476 + 20 = 496 (fits)
      // 3 cards: 3*238 + 2*20 = 714 + 40 = 754 (doesn't fit)
      const totalItems = 5;
      const result = calculateMissingCardsForFullRow(580, totalItems);
      // 5 items, 2 per row = 2 full rows + 1 item, needs 1 more
      expect(result).toBe(1);
    });

    it("should return 0 when items perfectly fill rows", () => {
      // 1080px = 4 cards per row
      const totalItems = 8;
      const result = calculateMissingCardsForFullRow(1080, totalItems);
      // 8 items / 4 per row = exactly 2 rows
      expect(result).toBe(0);
    });

    it("should return 0 for containerWidth of 554 with 2 items", () => {
      // Available width: 554 - 40 = 514
      // 2 cards: 2*238 + 1*20 = 496 (fits)
      const totalItems = 2;
      const result = calculateMissingCardsForFullRow(554, totalItems);
      // 2 items, 2 per row = exactly 1 row
      expect(result).toBe(0);
    });

    it("should calculate 2 missing cards for single item in 2-card row", () => {
      const totalItems = 1;
      const result = calculateMissingCardsForFullRow(580, totalItems);
      // 1 item, 2 per row = needs 1 more
      expect(result).toBe(1);
    });
  });

  describe("custom values", () => {
    it("should work with custom cardWidth", () => {
      const containerWidth = 1000;
      const totalItems = 3;
      const cardWidth = 200;
      const gap = 20;
      const padding = 40;

      // Available: 1000 - 40 = 960
      // 1 card: 1*200 = 200 (fits)
      // 2 cards: 2*200 + 1*20 = 420 (fits)
      // 3 cards: 3*200 + 2*20 = 640 (fits)
      // 4 cards: 4*200 + 3*20 = 860 (fits)
      // 5 cards: 5*200 + 4*20 = 1080 (doesn't fit)

      const result = calculateMissingCardsForFullRow(
        containerWidth,
        totalItems,
        cardWidth,
        gap,
        padding,
      );

      // 3 items fit in one row (4 cards per row)
      // So no missing cards needed
      expect(result).toBe(1); // 1 + 3 = 4, fills the row
    });

    it("should work with custom gap", () => {
      const containerWidth = 600;
      const totalItems = 5;
      const cardWidth = 238;
      const gap = 10;
      const padding = 40;

      const result = calculateMissingCardsForFullRow(
        containerWidth,
        totalItems,
        cardWidth,
        gap,
        padding,
      );

      // With smaller gap, more cards might fit
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should work with custom padding", () => {
      const containerWidth = 600;
      const totalItems = 5;
      const cardWidth = 238;
      const gap = 20;
      const padding = 80;

      const result = calculateMissingCardsForFullRow(
        containerWidth,
        totalItems,
        cardWidth,
        gap,
        padding,
      );

      // With larger padding, less space available
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe("edge cases", () => {
    it("should handle very large containerWidth", () => {
      const result = calculateMissingCardsForFullRow(5000, 10);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should handle very small containerWidth", () => {
      const result = calculateMissingCardsForFullRow(250, 1);
      expect(typeof result).toBe("number");
    });

    it("should handle single item", () => {
      const result = calculateMissingCardsForFullRow(1000, 1);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should handle large number of items", () => {
      const result = calculateMissingCardsForFullRow(1000, 100);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should return non-negative number always", () => {
      const testCases = [
        { containerWidth: 100, totalItems: 1 },
        { containerWidth: 500, totalItems: 5 },
        { containerWidth: 1000, totalItems: 10 },
        { containerWidth: 2000, totalItems: 50 },
      ];

      testCases.forEach(({ containerWidth, totalItems }) => {
        const result = calculateMissingCardsForFullRow(
          containerWidth,
          totalItems,
        );
        expect(result).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("formula validation", () => {
    it("should calculate correct number of cards per row", () => {
      // For 1080px: 1080 - 40 = 1040 available
      // Cards that fit: 4 (952 + 60 = 1012 <= 1040)
      const totalItems = 5;
      const result = calculateMissingCardsForFullRow(1080, totalItems);
      // 5 items with 4 per row = 1 row complete + 1 item left
      // Missing cards to fill = 3
      expect(result).toBe(3);
    });

    it("should handle items that exactly fill last row", () => {
      // 1080px supports 4 cards per row
      const totalItems = 12; // 3 complete rows
      const result = calculateMissingCardsForFullRow(1080, totalItems);
      expect(result).toBe(0);
    });

    it("should handle items just over complete rows", () => {
      // 1080px supports 4 cards per row
      const totalItems = 13; // 3 complete rows + 1 item
      const result = calculateMissingCardsForFullRow(1080, totalItems);
      expect(result).toBe(3); // Needs 3 more to complete the 4th row
    });
  });
});
