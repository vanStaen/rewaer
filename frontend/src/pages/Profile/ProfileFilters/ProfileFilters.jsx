import React, { useEffect, useState } from "react";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";

import { profileStore } from "../../../stores/profileStore/profileStore"

import "./ProfileFilters.css";

export const ProfileFilters = observer((props) => {
    const { t } = useTranslation();
    const [showFilterPanel, setShowFilterPanel] = useState(false);

    useEffect(() => {
        if (profileStore.filterIsPopingUp) {
            document.getElementById("ProfileFilter__filter").style.color = "rgba(109, 145, 126, .7)";
            document.getElementById("ProfileFilter__filter").style.textShadow = "rgba(109, 145, 126, .5) 1px 0 10px";
            setTimeout(() => {
                document.getElementById("ProfileFilter__filter").style.color = "rgba(0, 0, 0, 1)";
                document.getElementById("ProfileFilter__filter").style.textShadow = "none";

            }, 1000);
            profileStore.setFilterIsPopingUp(false);
        }
    }, [profileStore.filterIsPopingUp])

    return <div className="ProfileFilter__container" id="ProfileFilter__filter">
        <div className="ProfileFilter__element">
            <SearchOutlined /> {t("profile.search")} {t(`menu.${props.contentToDisplay}`).toLowerCase()}
        </div>
        <div className="ProfileFilter__element">
            <FilterOutlined /> {showFilterPanel ? t("profile.hideFilterPanel") : t("profile.showFilterPanel")}
        </div>
    </div>
});