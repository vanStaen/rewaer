import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock dependencies BEFORE importing component
jest.mock("./pictureRotate", () => ({
  pictureRotate: jest.fn(),
}));
jest.mock("./pictureFlip", () => ({
  pictureFlip: jest.fn(),
}));
jest.mock("./updateMediaLook", () => ({
  updateMediaLook: jest.fn(),
}));
jest.mock("./updateMediaItem", () => ({
  updateMediaItem: jest.fn(),
}));
jest.mock("../../helpers/picture/postPicture", () => ({
  postPicture: jest.fn(),
}));
jest.mock("../../pages/Looks/looksStore", () => ({
  looksStore: {
    selectedLook: { id: 1, mediaId: "look-media-123" },
    setIsOutOfDate: jest.fn(),
  },
}));
jest.mock("../../pages/Items/itemsStore", () => ({
  itemsStore: {
    selectedItem: { id: 2, mediaId: "item-media-456" },
    setIsOutOfDate: jest.fn(),
  },
}));

import { ImageEditBar } from "./ImageEditBar";
import { pictureRotate } from "./pictureRotate";
import { pictureFlip } from "./pictureFlip";
import { updateMediaLook } from "./updateMediaLook";
import { updateMediaItem } from "./updateMediaItem";
import { postPicture } from "../../helpers/picture/postPicture";
import { looksStore } from "../../pages/Looks/looksStore";
import { itemsStore } from "../../pages/Items/itemsStore";

describe("ImageEditBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (pictureRotate as jest.Mock).mockResolvedValue("new-media-id-rotated");
    (pictureFlip as jest.Mock).mockResolvedValue("new-media-id-flipped");
    (updateMediaLook as jest.Mock).mockResolvedValue(undefined);
    (updateMediaItem as jest.Mock).mockResolvedValue(undefined);
    (postPicture as jest.Mock).mockResolvedValue({ path: "new-uploaded-media-id" });
  });

  describe("rendering", () => {
    it("should render all edit buttons for looks", () => {
      const { container } = render(<ImageEditBar page="looks" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      expect(items.length).toBe(4); // flip, mirror, rotate, upload
    });

    it("should render all edit buttons for items", () => {
      const { container } = render(<ImageEditBar page="items" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      expect(items.length).toBe(4);
    });

    it("should not render edit buttons when error is true", () => {
      const { container } = render(<ImageEditBar page="looks" error={true} />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      expect(items.length).toBe(1); // only upload button
    });

    it("should show loading icon when loading prop is true", () => {
      const { container } = render(<ImageEditBar page="looks" loading={true} />);

      const loadingIcons = container.querySelectorAll(".anticon-loading");
      expect(loadingIcons.length).toBeGreaterThan(0);
    });
  });

  describe("rotate functionality", () => {
    it("should rotate look image when rotate button is clicked", async () => {
      const { container } = render(<ImageEditBar page="looks" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      const rotateButton = items[2]; // Third button is rotate

      fireEvent.click(rotateButton);

      await waitFor(() => {
        expect(pictureRotate).toHaveBeenCalledWith("look-media-123", "looks", 1);
        expect(updateMediaLook).toHaveBeenCalledWith(1, "new-media-id-rotated");
        expect(looksStore.setIsOutOfDate).toHaveBeenCalledWith(true);
      });
    });

    it("should rotate item image when rotate button is clicked", async () => {
      const { container } = render(<ImageEditBar page="items" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      const rotateButton = items[2];

      fireEvent.click(rotateButton);

      await waitFor(() => {
        expect(pictureRotate).toHaveBeenCalledWith("item-media-456", "items", 1);
        expect(updateMediaItem).toHaveBeenCalledWith(2, "new-media-id-rotated");
        expect(itemsStore.setIsOutOfDate).toHaveBeenCalledWith(true);
      });
    });

    it("should handle rotate error gracefully", async () => {
      const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
      (pictureRotate as jest.Mock).mockRejectedValue(new Error("Rotate failed"));

      const { container } = render(<ImageEditBar page="looks" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      const rotateButton = items[2];

      fireEvent.click(rotateButton);

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
      });

      consoleLogSpy.mockRestore();
    });
  });

  describe("flip functionality", () => {
    it("should flip look image when flip button is clicked", async () => {
      const { container } = render(<ImageEditBar page="looks" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      const flipButton = items[0]; // First button is flip

      fireEvent.click(flipButton);

      await waitFor(() => {
        expect(pictureFlip).toHaveBeenCalledWith("look-media-123", "looks", true);
        expect(updateMediaLook).toHaveBeenCalledWith(1, "new-media-id-flipped");
        expect(looksStore.setIsOutOfDate).toHaveBeenCalledWith(true);
      });
    });

    it("should mirror item image when mirror button is clicked", async () => {
      const { container } = render(<ImageEditBar page="items" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      const mirrorButton = items[1]; // Second button is mirror

      fireEvent.click(mirrorButton);

      await waitFor(() => {
        expect(pictureFlip).toHaveBeenCalledWith("item-media-456", "items", false);
        expect(updateMediaItem).toHaveBeenCalledWith(2, "new-media-id-flipped");
        expect(itemsStore.setIsOutOfDate).toHaveBeenCalledWith(true);
      });
    });
  });

  describe("file upload functionality", () => {
    it("should upload and replace look image when file is selected", async () => {
      const { container } = render(<ImageEditBar page="looks" />);

      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const fileInput = container.querySelector("#file") as HTMLInputElement;

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(postPicture).toHaveBeenCalledWith(file, "looks");
        expect(updateMediaLook).toHaveBeenCalledWith(1, "new-uploaded-media-id");
        expect(looksStore.setIsOutOfDate).toHaveBeenCalledWith(true);
      });
    });

    it("should upload and replace item image when file is selected", async () => {
      const { container } = render(<ImageEditBar page="items" />);

      const file = new File(["test"], "test.png", { type: "image/png" });
      const fileInput = container.querySelector("#file") as HTMLInputElement;

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(postPicture).toHaveBeenCalledWith(file, "items");
        expect(updateMediaItem).toHaveBeenCalledWith(2, "new-uploaded-media-id");
        expect(itemsStore.setIsOutOfDate).toHaveBeenCalledWith(true);
      });
    });

    it("should handle upload error gracefully", async () => {
      const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
      (postPicture as jest.Mock).mockRejectedValue(new Error("Upload failed"));

      const { container } = render(<ImageEditBar page="looks" />);

      const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const fileInput = container.querySelector("#file") as HTMLInputElement;

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
      });

      consoleLogSpy.mockRestore();
    });

    it("should not upload when no file is selected", async () => {
      const { container } = render(<ImageEditBar page="looks" />);

      const fileInput = container.querySelector("#file") as HTMLInputElement;

      fireEvent.change(fileInput, { target: { files: [] } });

      await waitFor(() => {
        expect(postPicture).not.toHaveBeenCalled();
      });
    });
  });

  describe("loading state", () => {
    it("should prevent multiple simultaneous rotate operations", async () => {
      const { container } = render(<ImageEditBar page="looks" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      const rotateButton = items[2];

      // Click multiple times quickly
      fireEvent.click(rotateButton);
      fireEvent.click(rotateButton);
      fireEvent.click(rotateButton);

      await waitFor(() => {
        expect(pictureRotate).toHaveBeenCalledTimes(1);
      });
    });

    it("should prevent multiple simultaneous flip operations", async () => {
      const { container } = render(<ImageEditBar page="looks" />);

      const items = container.querySelectorAll(".imageEditBar__imageEditBarItem");
      const flipButton = items[0];

      // Click multiple times quickly
      fireEvent.click(flipButton);
      fireEvent.click(flipButton);
      fireEvent.click(flipButton);

      await waitFor(() => {
        expect(pictureFlip).toHaveBeenCalledTimes(1);
      });
    });
  });
});
