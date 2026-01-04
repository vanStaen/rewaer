import React, { useEffect, useState } from "react";

import "./SimpleSubMenu.less";

interface SimpleSubMenuItem {
  icon?: React.ReactNode;
  title: string;
  action?: () => void;
}

interface SimpleSubMenuProps {
  menuItems: SimpleSubMenuItem[];
  selectedMenuItem: number;
  setSelectedMenuItem: (index: number) => void;
}

export const SimpleSubMenu: React.FC<SimpleSubMenuProps> = ({
  menuItems,
  selectedMenuItem,
  setSelectedMenuItem,
}) => {
  const menuElements = menuItems.map((menuItem, index) => {
    const handleClick = () => {
      setSelectedMenuItem(index);
      if (menuItem.action) {
        menuItem.action();
      }
    };

    return (
      <div
        className={`subMenu__item 
            ${selectedMenuItem === index && "subMenu__itemSelected"}`}
        onClick={handleClick}
        key={`subMenuElement${index}`}
      >
        {menuItem.icon}
        <span className="subMenu__title">{menuItem.title}</span>
      </div>
    );
  });

  return (
    <>
      <div className="subMenu__container">{menuElements}</div>
    </>
  );
};
