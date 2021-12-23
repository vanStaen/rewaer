import React from "react";
import { observer } from "mobx-react";

import "./ProfileFriends.css"

export const ProfileFriends = observer(() => {
    return <>
        <div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                People you may know
          </div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
        </div>
        <div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                Friends (5)
                  </div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersCounterContainer">
                <div className="profilFriends__followersCounter"> +8</div>
            </div>
        </div>
        <div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                Followers (3)
                  </div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
            <div className="profilFriends__followersAvatar"></div>
        </div>
        <div className="profilFriends__followersContainer">
            <div className="profilFriends__followersTitle">
                Following (9)
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