import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../stores/profileStore/profileStore";
import { GhostCard } from "../../../components/GhostCard/GhostCard";
import { LikeDislikeButton } from "../../../components/LikeDislikeButton/LikeDislikeButton";
import { SIZE_THUMBNAIL_IN_PROFILE } from "../../../lib/data/setup";

import "./ProfileItems.css";

export const ProfileItems = observer(() => {
  const { t } = useTranslation();
  const containerElement = useRef(null);
  const [missingCardForFullRow, setMissingCardForFullRow] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    calculateMissingCardsForFullRow();
    window.addEventListener("resize", calculateMissingCardsForFullRow);
    return () => {
      window.removeEventListener("resize", calculateMissingCardsForFullRow);
    };
  }, [
    profileStore.items,
    containerElement.current,
    missingCardForFullRow,
    calculateMissingCardsForFullRow,
  ]);

  const calculateMissingCardsForFullRow = useCallback(() => {
    const containerWidth =
      containerElement.current === null
        ? 0
        : containerElement.current.offsetWidth;
    const cardWidth = SIZE_THUMBNAIL_IN_PROFILE + 7 + 7;
    const numberPerRow = Math.floor(containerWidth / cardWidth, 1);
    const numberItems = profileStore.items && profileStore.items.length;
    const numberFullRow = Math.floor(numberItems / numberPerRow);
    const missingCards =
      numberPerRow - (numberItems - numberFullRow * numberPerRow);
    setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
  }, [containerElement.current]);

  useEffect(() => {
    //console.log("profileStore.items", profileStore.items);
  }, [profileStore.items]);

  const items =
    profileStore.items &&
    profileStore.items.map((item) => {
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
                width: `${SIZE_THUMBNAIL_IN_PROFILE}px`,
                height: `${SIZE_THUMBNAIL_IN_PROFILE}px`,
              }}
            ></div>
            <div className="ProfileLook__containerMeta">
              <div className="ProfileLook__containerLike">
                <LikeDislikeButton
                  _id={item._id}
                  arrayLikes={item.likes}
                  arrayDislikes={item.dislikes}
                  type="item"
                  profile={true}
                />
              </div>
            </div>
          </div>
        </Col>
      );
    });

  return (
    <>
      <div className="ProfileItem__container" ref={containerElement}>
        <Row justify={"center"}>
          {items}
          <GhostCard
            numberOfCards={missingCardForFullRow}
            width={`${SIZE_THUMBNAIL_IN_PROFILE}px`}
            height={`${SIZE_THUMBNAIL_IN_PROFILE + 35}px`}
            margin={[0, 5, 0, 5]}
          />
        </Row>
      </div>
    </>
  );
});
