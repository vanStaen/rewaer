import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "antd";

import { profileStore } from "../../../stores/profileStore/profileStore";
import { GhostCard } from "../../../components/GhostCard/GhostCard";

import "./ProfileLooks.css";

export const ProfileLooks = observer(() => {
    const containerElement = useRef(null);
    const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);

    useEffect(() => {
        calculateMissingCardsForFullRow();
        window.addEventListener("resize", calculateMissingCardsForFullRow);
        return () => {
            window.removeEventListener("resize", calculateMissingCardsForFullRow);
        };
    }, [
        containerElement.current,
        missingCardForFullRow,
        calculateMissingCardsForFullRow,
    ]);

    const calculateMissingCardsForFullRow = useCallback(() => {
        const containerWidth =
            containerElement.current === null
                ? 0
                : containerElement.current.offsetWidth;
        const cardWidth = 120 + 5 + 5;
        const numberPerRow = Math.floor(containerWidth / cardWidth, 1);
        const numberLooks = profileStore.looks && profileStore.looks.length;
        const numberFullRow = Math.floor(numberLooks / numberPerRow);
        const missingCards =
            numberPerRow - (numberLooks - numberFullRow * numberPerRow);
        setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
    }, [containerElement.current]);


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
        <div className="ProfileLook__container" ref={containerElement}>
            <Row justify={"space-around"}>
                {looks}
                <GhostCard numberOfCards={missingCardForFullRow} width="120px" height="160px" />
            </Row>
        </div>
    </>;
});