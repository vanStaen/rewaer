import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Upload } from "./Upload";
import { pageStore } from "@stores/pageStore/pageStore";

// Mock dependencies
jest.mock("@pages/Looks/looksStore", () => ({
  looksStore: {
    setIsOutOfDate: jest.fn(),
  },
}));

jest.mock("@pages/Items/itemsStore", () => ({
  itemsStore: {
    setIsOutOfDate: jest.fn(),
  },
}));

jest.mock("./UploadForm/postNewLook", () => ({
  postNewLook: jest.fn(() =>
    Promise.resolve({ data: { addLook: { id: "1" } } }),
  ),
}));

jest.mock("./UploadForm/postNewItem", () => ({
  postNewItem: jest.fn(() =>
    Promise.resolve({ data: { addItem: { id: "1" } } }),
  ),
}));

jest.mock("@helpers/picture/getPictureUrl", () => ({
  getPictureUrl: jest.fn(() =>
    Promise.resolve("https://example.com/image.jpg"),
  ),
}));

jest.mock("@helpers/picture/deletePicture", () => ({
  deletePicture: jest.fn(() => Promise.resolve(true)),
}));

jest.mock("@stores/pageStore/pageStore", () => ({
  pageStore: {
    showFloatingUploadForm: false as boolean | null,
    showOnlyFloatingUploadForm: false as boolean | null,
    setShowFloatingUploadForm: jest.fn(),
  },
}));

jest.mock("./UploadForm/UploadForm", () => ({
  UploadForm: ({ page }: { page: string }) => (
    <div data-testid="upload-form-component" data-page={page}>
      UploadForm
    </div>
  ),
}));

jest.mock("@helpers/capitalizeFirstLetter", () => ({
  capitalizeFirstLetter: (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1),
}));

jest.mock("@helpers/isElementVisible", () => ({
  isElementVisible: jest.fn(() => true),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

interface MockPageStore {
  showFloatingUploadForm: boolean | null;
  showOnlyFloatingUploadForm: boolean | null;
  setShowFloatingUploadForm: jest.Mock;
}

const mockPageStore = pageStore as unknown as MockPageStore;

describe("Upload", () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPageStore.showFloatingUploadForm = false;
    mockPageStore.showOnlyFloatingUploadForm = false;
    addEventListenerSpy = jest.spyOn(window, "addEventListener");
    removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("renders the Upload component with items page", () => {
    render(<Upload page="items" />);

    expect(screen.getByText("items.addItem")).toBeInTheDocument();
    expect(screen.getByText("main.startWithPhoto")).toBeInTheDocument();
  });

  it("renders the Upload component with looks page", () => {
    render(<Upload page="looks" />);

    expect(screen.getByText("looks.addLook")).toBeInTheDocument();
    expect(screen.getByText("main.startWithPhoto")).toBeInTheDocument();
  });

  it("renders SkinOutlined icon for items page", () => {
    const { container } = render(<Upload page="items" />);

    const icon = container.querySelector(".anticon-skin");
    expect(icon).toBeInTheDocument();
  });

  it("renders CameraOutlined icon for looks page", () => {
    const { container } = render(<Upload page="looks" />);

    const icon = container.querySelector(".anticon-camera");
    expect(icon).toBeInTheDocument();
  });

  it("does not render floating form initially", () => {
    render(<Upload page="items" />);

    expect(
      screen.queryByTestId("upload-floating-form"),
    ).not.toBeInTheDocument();
  });

  it("renders floating form when showFloatingUploadForm is true", () => {
    mockPageStore.showFloatingUploadForm = true;

    const { container } = render(<Upload page="items" />);

    const floatingForm = container.querySelector(".upload-floating-form");
    expect(floatingForm).toBeInTheDocument();
  });

  it("renders floating form when showOnlyFloatingUploadForm is true", () => {
    mockPageStore.showOnlyFloatingUploadForm = true;

    const { container } = render(<Upload page="looks" />);

    const floatingForm = container.querySelector(".upload-floating-form");
    expect(floatingForm).toBeInTheDocument();
  });

  it("renders floating form with correct icon for items page", () => {
    mockPageStore.showFloatingUploadForm = true;

    const { container } = render(<Upload page="items" />);

    const floatingForm = container.querySelector(".upload-floating-form");
    expect(floatingForm).toBeInTheDocument();

    const icon = floatingForm?.querySelector(".anticon-skin");
    expect(icon).toBeInTheDocument();
  });

  it("renders floating form with correct icon for looks page", () => {
    mockPageStore.showFloatingUploadForm = true;

    const { container } = render(<Upload page="looks" />);

    const floatingForm = container.querySelector(".upload-floating-form");
    expect(floatingForm).toBeInTheDocument();

    const icon = floatingForm?.querySelector(".anticon-camera");
    expect(icon).toBeInTheDocument();
  });

  it("opens modal when clicking the upload div", async () => {
    render(<Upload page="items" />);

    const uploadDiv = screen.getByText("items.addItem").closest(".upload-div");
    expect(uploadDiv).toBeInTheDocument();

    fireEvent.click(uploadDiv!);

    await waitFor(() => {
      expect(screen.getByTestId("upload-form-component")).toBeInTheDocument();
    });
  });

  it("opens modal when clicking the floating form avatar", async () => {
    mockPageStore.showFloatingUploadForm = true;

    const { container } = render(<Upload page="looks" />);

    const avatar = container.querySelector(".uploadForm__avatar");
    expect(avatar).toBeInTheDocument();

    fireEvent.click(avatar!);

    await waitFor(() => {
      expect(screen.getByTestId("upload-form-component")).toBeInTheDocument();
    });
  });

  it("passes correct page prop to UploadForm in modal", async () => {
    render(<Upload page="looks" />);

    const uploadDiv = screen.getByText("looks.addLook").closest(".upload-div");
    fireEvent.click(uploadDiv!);

    await waitFor(() => {
      const uploadFormComponent = screen.getByTestId("upload-form-component");
      expect(uploadFormComponent).toHaveAttribute("data-page", "looks");
    });
  });

  it("closes modal when handleOk is called", async () => {
    const { container } = render(<Upload page="items" />);

    const uploadDiv = screen.getByText("items.addItem").closest(".upload-div");
    fireEvent.click(uploadDiv!);

    await waitFor(() => {
      expect(screen.getByTestId("upload-form-component")).toBeInTheDocument();
    });

    // Find and click OK button
    const okButton = screen.getByText("OK");
    fireEvent.click(okButton);

    await waitFor(() => {
      const modal = container.querySelector(".ant-modal");
      expect(modal).not.toBeInTheDocument();
    });
  });

  it("closes modal when handleCancel is called", async () => {
    const { container } = render(<Upload page="items" />);

    const uploadDiv = screen.getByText("items.addItem").closest(".upload-div");
    fireEvent.click(uploadDiv!);

    await waitFor(() => {
      expect(screen.getByTestId("upload-form-component")).toBeInTheDocument();
    });

    // Find and click Cancel button
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => {
      const modal = container.querySelector(".ant-modal");
      expect(modal).not.toBeInTheDocument();
    });
  });

  it("adds scroll event listener on mount", () => {
    render(<Upload page="items" />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });

  it("removes scroll event listener on unmount", () => {
    const { unmount } = render(<Upload page="items" />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });

  it("renders floating form with correct id when showFloatingUploadForm is true", () => {
    mockPageStore.showFloatingUploadForm = true;

    const { container } = render(<Upload page="items" />);

    const floatingForm = container.querySelector("#upload-floating-form");
    expect(floatingForm).toBeInTheDocument();
  });

  it("renders floating form with correct id when showOnlyFloatingUploadForm is true", () => {
    mockPageStore.showOnlyFloatingUploadForm = true;

    const { container } = render(<Upload page="items" />);

    const floatingForm = container.querySelector("#upload-floating-form");
    expect(floatingForm).toBeInTheDocument();
  });

  it("renders upload div with correct id", () => {
    const { container } = render(<Upload page="items" />);

    const uploadDiv = container.querySelector("#upload-form");
    expect(uploadDiv).toBeInTheDocument();
  });

  it("uses capitalizeFirstLetter for translation key", () => {
    render(<Upload page="items" />);

    // Should translate to "items.addItem" (capitalizing "i" from "items")
    expect(screen.getByText("items.addItem")).toBeInTheDocument();
  });
});
