import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SimpleSubMenu } from "./SimpleSubMenu";

describe("SimpleSubMenu", () => {
  const mockAction1 = jest.fn();
  const mockAction2 = jest.fn();
  const mockAction3 = jest.fn();
  const mockSetSelectedMenuItem = jest.fn();

  const mockItems = [
    {
      icon: <span data-testid="icon-1">Icon1</span>,
      title: "First Item",
      action: mockAction1,
    },
    {
      icon: <span data-testid="icon-2">Icon2</span>,
      title: "Second Item",
      action: mockAction2,
    },
    {
      icon: <span data-testid="icon-3">Icon3</span>,
      title: "Third Item",
      action: mockAction3,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SimpleSubMenu component", () => {
    render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
    expect(screen.getByText("Third Item")).toBeInTheDocument();
  });

  it("renders all menu items with icons", () => {
    render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    expect(screen.getByTestId("icon-1")).toBeInTheDocument();
    expect(screen.getByTestId("icon-2")).toBeInTheDocument();
    expect(screen.getByTestId("icon-3")).toBeInTheDocument();
  });

  it("highlights the selected item based on selectedMenuItem prop", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const firstItem = container.querySelector(".subMenu__item");
    expect(firstItem).toHaveClass("subMenu__itemSelected");
  });

  it("highlights the correct item when selectedMenuItem is 1", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={1}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const items = container.querySelectorAll(".subMenu__item");
    expect(items[0]).not.toHaveClass("subMenu__itemSelected");
    expect(items[1]).toHaveClass("subMenu__itemSelected");
    expect(items[2]).not.toHaveClass("subMenu__itemSelected");
  });

  it("calls the action callback when a menu item is clicked", () => {
    render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const secondItem = screen
      .getByText("Second Item")
      .closest(".subMenu__item");
    fireEvent.click(secondItem!);

    expect(mockAction2).toHaveBeenCalledTimes(1);
    expect(mockAction1).not.toHaveBeenCalled();
    expect(mockAction3).not.toHaveBeenCalled();
  });

  it("handles items without actions gracefully", () => {
    const itemsWithoutAction = [
      {
        title: "Item Without Action",
      },
    ];

    render(
      <SimpleSubMenu
        menuItems={itemsWithoutAction}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const item = screen.getByText("Item Without Action");
    expect(() => fireEvent.click(item)).not.toThrow();
  });

  it("handles items without icons", () => {
    const itemsWithoutIcons = [
      {
        title: "Item 1",
        action: mockAction1,
      },
      {
        title: "Item 2",
        action: mockAction2,
      },
    ];

    render(
      <SimpleSubMenu
        menuItems={itemsWithoutIcons}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders the correct number of menu items", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const items = container.querySelectorAll(".subMenu__item");
    expect(items).toHaveLength(3);
  });

  it("applies correct CSS classes to menu items", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const items = container.querySelectorAll(".subMenu__item");
    items.forEach((item) => {
      expect(item).toHaveClass("subMenu__item");
    });
  });

  it("calls action when clicking items", () => {
    render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const firstItem = screen.getByText("First Item").closest(".subMenu__item");
    const secondItem = screen
      .getByText("Second Item")
      .closest(".subMenu__item");
    const thirdItem = screen.getByText("Third Item").closest(".subMenu__item");

    // Click second item
    fireEvent.click(secondItem!);
    expect(mockAction2).toHaveBeenCalledTimes(1);

    // Click third item
    fireEvent.click(thirdItem!);
    expect(mockAction3).toHaveBeenCalledTimes(1);

    // Click first item
    fireEvent.click(firstItem!);
    expect(mockAction1).toHaveBeenCalledTimes(1);
  });

  it("handles empty items array", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={[]}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const menuContainer = container.querySelector(".subMenu__container");
    expect(menuContainer).toBeInTheDocument();
    expect(menuContainer?.children).toHaveLength(0);
  });

  it("highlights selectedMenuItem 0 correctly", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const items = container.querySelectorAll(".subMenu__item");
    expect(items[0]).toHaveClass("subMenu__itemSelected");
  });

  it("wraps content in subMenu__container div", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const menuContainer = container.querySelector(".subMenu__container");
    expect(menuContainer).toBeInTheDocument();
  });

  it("generates unique keys for menu items", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const items = container.querySelectorAll(".subMenu__item");

    // Keys should be undefined in the DOM, but we check that all items are rendered
    expect(items).toHaveLength(mockItems.length);
  });

  it("updates highlight when selectedMenuItem prop changes", () => {
    const { container, rerender } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={0}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    let items = container.querySelectorAll(".subMenu__item");
    expect(items[0]).toHaveClass("subMenu__itemSelected");

    rerender(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={2}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    items = container.querySelectorAll(".subMenu__item");
    expect(items[2]).toHaveClass("subMenu__itemSelected");
    expect(items[0]).not.toHaveClass("subMenu__itemSelected");
  });

  it("highlights selectedMenuItem 2 correctly", () => {
    const { container } = render(
      <SimpleSubMenu
        menuItems={mockItems}
        selectedMenuItem={2}
        setSelectedMenuItem={mockSetSelectedMenuItem}
      />
    );

    const items = container.querySelectorAll(".subMenu__item");
    expect(items[0]).not.toHaveClass("subMenu__itemSelected");
    expect(items[1]).not.toHaveClass("subMenu__itemSelected");
    expect(items[2]).toHaveClass("subMenu__itemSelected");
  });
});
