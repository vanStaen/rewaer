import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Tooltip } from 'antd';
import { useTranslation } from "react-i18next";

import "./ProfileFriends.css"

export const ProfileFriends = observer(() => {
    const { t } = useTranslation();
    return <>
        <div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                {t("profile.friends")} (5)
            </div>
            <Tooltip title="ttlykke">
                <Link to="/ttlykke">
                    <div
                        className="profilFriends__followersAvatar"
                        style={{
                            background: `url("https://rewaer-static01.s3.eu-central-1.amazonaws.com/780633f0bea1fc82ad949d06a3be1811")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}>
                    </div>
                </Link>
            </Tooltip>
            <Tooltip title="clementvanstaen">
                <Link to="/clementvanstaen">
                    <div
                        className="profilFriends__followersAvatar"
                        style={{
                            background: `url("https://rewaer-static01.s3.eu-central-1.amazonaws.com/eecb1612b2940cf3476e5caaf06540bc")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}>
                    </div>
                </Link>
            </Tooltip>
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