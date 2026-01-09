import React from "react";

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
  const menuElements =
    menuItems.length > 1 ? (
      menuItems.map((menuItem, index) => {
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
      })
    ) : menuItems.length === 1 ? (
      <div className="subMenu__item" key={`subMenuElement`}>
        {menuItems[0].icon}
        <span className="subMenu__title">{menuItems[0].title}</span>
      </div>
    ) : null;

  return (
    <>
      <div className="subMenu__container">{menuElements}</div>
    </>
  );
};
