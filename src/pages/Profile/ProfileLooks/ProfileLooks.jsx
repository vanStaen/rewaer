import React, { useEffect, useState, useRef, useCallback } from "react";
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

import { profileStore } from "../../../stores/profileStore/profileStore";
import { GhostCard } from "../../../components/GhostCard/GhostCard";
import { LikeDislikeButton } from "../../../components/LikeDislikeButton/LikeDislikeButton";
import { SIZE_THUMBNAIL_IN_PROFILE } from "../../../lib/data/setup";

import "./ProfileLooks.css";

export const ProfileLooks = observer(() => {
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
    profileStore.looks,
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
    const numberLooks = profileStore.looks && profileStore.looks.length;
    const numberFullRow = Math.floor(numberLooks / numberPerRow);
    const missingCards =
      numberPerRow - (numberLooks - numberFullRow * numberPerRow);
    setMissingCardForFullRow(missingCards === numberPerRow ? 0 : missingCards);
  }, [containerElement.current]);

  const looks =
    profileStore.looks &&
    profileStore.looks.map((look) => {
      return (
        <Col key={look.id}>
          <div className="ProfileLook__lookContainer">
            <div
              className="ProfileLook__picture"
              style={{
                background: `url(${look.mediaIdMedium})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: `${SIZE_THUMBNAIL_IN_PROFILE}px`,
                height: `${SIZE_THUMBNAIL_IN_PROFILE + 35}px`,
              }}
            ></div>
            <div className="ProfileLook__containerMeta">
              <div className="ProfileLook__containerLike">
                <LikeDislikeButton
                  id={look.id}
                  mediaId={look.mediaId}
                  arrayLikes={look.likes}
                  arrayDislikes={look.dislikes}
                  type="look"
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
      <div className="ProfileLook__container" ref={containerElement}>
        <Row justify={"center"}>
          {looks}
          <GhostCard
            numberOfCards={missingCardForFullRow}
            width={`${SIZE_THUMBNAIL_IN_PROFILE}px`}
            height={`${SIZE_THUMBNAIL_IN_PROFILE + 35 + 35}px`}
            margin={[0, 5, 0, 5]}
          />
        </Row>
      </div>
    </>
  );
});
