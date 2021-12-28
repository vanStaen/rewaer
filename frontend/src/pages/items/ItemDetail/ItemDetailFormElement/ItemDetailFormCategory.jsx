import React, { useState } from "react";
import { Dropdown, Menu } from "antd";

import { userStore } from "../../../../stores/userStore/userStore";
import { itemCategoryMen, itemCategoryWomen, itemCategoryNB } from "../../../../data/categories";
import { updateGenericStringItem } from "../../actions/updateGenericStringItem";

import "./ItemDetailFormElement.css";

export const ItemDetailFormCategory = (props) => {
    const [category, setCategory] = useState(props.selectedItem.category)

    const CategoryDropDownMen = itemCategoryMen.map((catItem) => {
        return (
            <Menu.Item
                key={catItem.code}
                onClick={() => {
                    updateGenericStringItem(props.selectedItem._id, "category", catItem.en);
                    setCategory(catItem.en);
                    itemsStore.setIsOutOfDate(true);
                }}>
                {catItem.en}
            </Menu.Item>);
    });

    const CategoryDropDownWomen = itemCategoryWomen.map((catItem) => {
        return (
            <Menu.Item
                key={catItem.code}
                onClick={() => {
                    updateGenericStringItem(props.selectedItem._id, "category", catItem.en);
                    setCategory(catItem.en);
                    itemsStore.setIsOutOfDate(true);
                }}>
                {catItem.en}
            </Menu.Item>);
    });

    const CategoryDropDownNB = itemCategoryNB.map((catItem) => {
        return (
            <Menu.Item
                key={catItem.code}
                onClick={() => {
                    updateGenericStringItem(props.selectedItem._id, "category", catItem.en);
                    setCategory(catItem.en);
                    itemsStore.setIsOutOfDate(true);
                }}>
                {catItem.en}
            </Menu.Item>);
    });

    return <div className="ItemDetailFormElement__container">
        <div className="ItemDetailFormElement__title">Category:</div>
        <Dropdown
            className="ItemDetailFormElement__dropdown"
            overlay={
                <Menu>
                    {userStore.gender === 1 ?
                        CategoryDropDownMen :
                        userStore.gender === 2 ?
                            CategoryDropDownWomen :
                            CategoryDropDownNB
                    }
                </Menu>}
            placement="bottomLeft">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {category ?
                    <span className="ItemDetailFormElement__element">{category}</span>
                    : <span className="ItemDetailFormElement__selectElement">Select a category</span>}
            </a>
        </Dropdown>
    </div>;
}