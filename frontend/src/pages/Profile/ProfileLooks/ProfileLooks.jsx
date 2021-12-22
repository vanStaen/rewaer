import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "antd";

import { profileStore } from "../../../stores/profileStore/profileStore";

import "./ProfileLooks.css";

export const ProfileLooks = observer(() => {

    useEffect(() => {
        //console.log("profileStore.looks", profileStore.looks);
    }, [profileStore.looks])

    const looks = profileStore.looks && profileStore.looks.map((look) => {
        return (
            <Col key={look._id}>
                <div className="ProfileLook__lookContainer">
                    <div
                        className="ProfileLook__picture"
                        style={{
                            background: `url(${look.mediaUrlMedium})`,
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
        <div className="ProfileLook__container">
            <Row justify={"space-around"}>
                {looks}
            </Row>
        </div>
    </>;
});