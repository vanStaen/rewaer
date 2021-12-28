import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";

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
        <div className="ItemDetailFormElement__helpIcon">
            <QuestionCircleOutlined />
        </div>
    </div>;
}