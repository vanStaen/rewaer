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
            document.getElementById("ProfileFilter__filter").style.fontWeight = "500";
            document.getElementById("ProfileFilter__filter").style.textShadow = "#f0f0f0 1px 0 10px";
            setTimeout(() => {
                document.getElementById("ProfileFilter__filter").style.fontWeight = "300";
                document.getElementById("ProfileFilter__filter").style.textShadow = "none";

            }, 1000);
            profileStore.setFilterIsPopingUp(false);
        }
    }, [profileStore.filterIsPopingUp])

    return <div className="ProfileFilter__container">
        <div className="ProfileFilter__filter ProfileFilter__element">
            <SearchOutlined /> {t("profile.search")} {t(`menu.${props.contentToDisplay}`).toLowerCase()}
        </div>
        <div className="ProfileFilter__element" id="ProfileFilter__filter">
            <FilterOutlined /> {showFilterPanel ? t("profile.hideFilterPanel") : t("profile.showFilterPanel")}
        </div>
    </div>
});