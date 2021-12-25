import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import "./ProfileFriends.css"

export const ProfileFriends = observer(() => {
    const { t } = useTranslation();
    return <>
        {/*<div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                People you may know
          </div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
        </div> */}
        <div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                {t("profile.friends")} (5)
            </div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar profilFriends__followersCounterContainer">
                <div className="profilFriends__followersCounter"> +8</div>
            </div>
        </div>
        <div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                {t("profile.followers")} (3)
            </div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
        </div>
        <div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                {t("profile.following")} (9)
            </div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
        </div>
    </>;

});