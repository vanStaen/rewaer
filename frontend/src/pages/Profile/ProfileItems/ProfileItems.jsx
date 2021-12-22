import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../stores/profileStore/profileStore";
import { GhostCard } from "../../../components/GhostCard/GhostCard";

import "./ProfileItems.css";

export const ProfileItems = observer(() => {
    const { t } = useTranslation();
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
        const numberItems = profileStore.items && profileStore.items.length;
        const numberFullRow = Math.floor(numberItems / numberPerRow);
        const missingCards =
            numberPerRow - (numberItems - numberFullRow * numberPerRow);
        setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
    }, [containerElement.current]);

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
        <div className="ProfileItem__container" ref={containerElement}>
            <div className="ProfileItem__titleContainer">
                {profileStore.items.length}&nbsp;{t("menu.items")}
            </div>
            <Row justify={"space-around"}>
                {items}
                <GhostCard numberOfCards={missingCardForFullRow} width="120px" height="160px" />
            </Row>
        </div>
    </>;
});