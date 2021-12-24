import React, { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./ProfileFilters.css";

export const ProfileFilters = (props) => {
    const { t } = useTranslation();
    const [showFilterPanel, setShowFilterPanel] = useState(false);

    return <div className="ProfileFilter__container">
        <FilterOutlined /> {showFilterPanel ? t("profile.showFilterPanel") : t("profile.hideFilterPanel")}
    </div>
}