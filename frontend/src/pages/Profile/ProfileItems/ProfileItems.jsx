import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "antd";

import { profileStore } from "../../../stores/profileStore/profileStore";

import "./ProfileItems.css";

export const ProfileItems = observer(() => {

    useEffect(() => {
        //console.log("profileStore.items", profileStore.items);
    }, [profileStore.items])

    const items = profileStore.items && profileStore.items.map((item) => {
        return (
            <Col key={item._id}>
                <div className="ProfileItem__itemContainer">
                    <div
                        className="ProfileItem__picture"
                        style={{
                            background: `url(${item.mediaUrlMedium})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>
                </div>
            </Col>
        );
    })

    return <>
        <div className="ProfileItem__container">
            <Row justify={"space-around"}>
                {items}
            </Row>
        </div>
    </>;
});