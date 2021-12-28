import React, { useState } from "react";

import { EditableTitle } from "../../../../components/EditableTitle/EditableTitle";
import { updateGenericStringItem } from "../../actions/updateGenericStringItem";

import "./ItemDetailFormElement.css";

export const ItemDetailFormStringElement = (props) => {

    return <div className="ItemDetailFormElement__container">
        <div className="ItemDetailFormElement__title">{props.element}:</div>
        <EditableTitle
            title={props.selectedItem.title}
            id={props.selectedItem._id}
            type={"item"}
            active={props.selectedItem.active}
        />
    </div>;
}