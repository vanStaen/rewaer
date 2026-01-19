import { switchElement } from "./switchElement";
import * as itemsStoreModule from "@pages/Items/itemsStore.ts";
import * as looksStoreModule from "@pages/Looks/looksStore.ts";

jest.mock("@pages/Items/itemsStore.ts", () => ({
  itemsStore: {
    items: [],
    selectedItem: { id: 1 },
    setSelectedItem: jest.fn(),
  },
}));

jest.mock("@pages/Looks/looksStore.ts", () => ({
  looksStore: {
    looks: [],
    selectedLook: { id: 1 },
    setSelectedLook: jest.fn(),
  },
}));

describe("switchElement", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Items - Navigate to next item", () => {
    it("should navigate to next item when next is true", () => {
      itemsStoreModule.itemsStore.items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      itemsStoreModule.itemsStore.selectedItem = { id: 1 };

      switchElement(true, true, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 2,
      });
    });

    it("should wrap around to first item when at the end", () => {
      itemsStoreModule.itemsStore.items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      itemsStoreModule.itemsStore.selectedItem = { id: 3 };

      switchElement(true, true, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe("Items - Navigate to previous item", () => {
    it("should navigate to previous item when next is false", () => {
      itemsStoreModule.itemsStore.items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      itemsStoreModule.itemsStore.selectedItem = { id: 2 };

      switchElement(false, true, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 1,
      });
    });

    it("should wrap around to last item when at the beginning", () => {
      itemsStoreModule.itemsStore.items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      itemsStoreModule.itemsStore.selectedItem = { id: 1 };

      switchElement(false, true, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 3,
      });
    });
  });

  describe("Items - Skip private items", () => {
    it("should skip private items when navigating forward", () => {
      itemsStoreModule.itemsStore.items = [
        { id: 1 },
        { id: 2, private: true },
        { id: 3, private: true },
        { id: 4 },
      ];
      itemsStoreModule.itemsStore.selectedItem = { id: 1 };

      switchElement(true, false, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 4,
      });
    });

    it("should skip private items when navigating backward", () => {
      itemsStoreModule.itemsStore.items = [
        { id: 1 },
        { id: 2, private: true },
        { id: 3, private: true },
        { id: 4 },
      ];
      itemsStoreModule.itemsStore.selectedItem = { id: 4 };

      switchElement(false, false, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 1,
      });
    });

    it("should wrap around and skip private items", () => {
      itemsStoreModule.itemsStore.items = [
        { id: 1, private: true },
        { id: 2 },
        { id: 3 },
      ];
      itemsStoreModule.itemsStore.selectedItem = { id: 3 };

      switchElement(true, false, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 2,
      });
    });
  });

  describe("Looks - Navigate to next look", () => {
    it("should navigate to next look when next is true", () => {
      looksStoreModule.looksStore.looks = [{ id: 1 }, { id: 2 }, { id: 3 }];
      looksStoreModule.looksStore.selectedLook = { id: 1 };

      switchElement(true, true, "looks");

      expect(looksStoreModule.looksStore.setSelectedLook).toHaveBeenCalledWith({
        id: 2,
      });
    });

    it("should wrap around to first look when at the end", () => {
      looksStoreModule.looksStore.looks = [{ id: 1 }, { id: 2 }, { id: 3 }];
      looksStoreModule.looksStore.selectedLook = { id: 3 };

      switchElement(true, true, "looks");

      expect(looksStoreModule.looksStore.setSelectedLook).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe("Looks - Navigate to previous look", () => {
    it("should navigate to previous look when next is false", () => {
      looksStoreModule.looksStore.looks = [{ id: 1 }, { id: 2 }, { id: 3 }];
      looksStoreModule.looksStore.selectedLook = { id: 2 };

      switchElement(false, true, "looks");

      expect(looksStoreModule.looksStore.setSelectedLook).toHaveBeenCalledWith({
        id: 1,
      });
    });

    it("should wrap around to last look when at the beginning", () => {
      looksStoreModule.looksStore.looks = [{ id: 1 }, { id: 2 }, { id: 3 }];
      looksStoreModule.looksStore.selectedLook = { id: 1 };

      switchElement(false, true, "looks");

      expect(looksStoreModule.looksStore.setSelectedLook).toHaveBeenCalledWith({
        id: 3,
      });
    });
  });

  describe("Looks - Skip private looks", () => {
    it("should skip private looks when navigating forward", () => {
      looksStoreModule.looksStore.looks = [
        { id: 1 },
        { id: 2, private: true },
        { id: 3, private: true },
        { id: 4 },
      ];
      looksStoreModule.looksStore.selectedLook = { id: 1 };

      switchElement(true, false, "looks");

      expect(looksStoreModule.looksStore.setSelectedLook).toHaveBeenCalledWith({
        id: 4,
      });
    });

    it("should skip private looks when navigating backward", () => {
      looksStoreModule.looksStore.looks = [
        { id: 1 },
        { id: 2, private: true },
        { id: 3, private: true },
        { id: 4 },
      ];
      looksStoreModule.looksStore.selectedLook = { id: 4 };

      switchElement(false, false, "looks");

      expect(looksStoreModule.looksStore.setSelectedLook).toHaveBeenCalledWith({
        id: 1,
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle single item in array", () => {
      itemsStoreModule.itemsStore.items = [{ id: 1 }];
      itemsStoreModule.itemsStore.selectedItem = { id: 1 };

      switchElement(true, true, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 1,
      });
    });

    it("should handle items in middle of array", () => {
      itemsStoreModule.itemsStore.items = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
      ];
      itemsStoreModule.itemsStore.selectedItem = { id: 3 };

      switchElement(true, true, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 4,
      });
    });

    it("should handle all private items except current", () => {
      itemsStoreModule.itemsStore.items = [
        { id: 1, private: true },
        { id: 2 },
        { id: 3, private: true },
      ];
      itemsStoreModule.itemsStore.selectedItem = { id: 2 };

      switchElement(true, false, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 2,
      });
    });
  });

  describe("Integration", () => {
    it("should correctly switch between items and looks", () => {
      // Test items
      itemsStoreModule.itemsStore.items = [{ id: 1 }, { id: 2 }];
      itemsStoreModule.itemsStore.selectedItem = { id: 1 };

      switchElement(true, true, "items");

      expect(itemsStoreModule.itemsStore.setSelectedItem).toHaveBeenCalledWith({
        id: 2,
      });

      // Test looks
      looksStoreModule.looksStore.looks = [{ id: 10 }, { id: 20 }];
      looksStoreModule.looksStore.selectedLook = { id: 10 };

      switchElement(true, true, "looks");

      expect(looksStoreModule.looksStore.setSelectedLook).toHaveBeenCalledWith({
        id: 20,
      });
    });
  });
});
