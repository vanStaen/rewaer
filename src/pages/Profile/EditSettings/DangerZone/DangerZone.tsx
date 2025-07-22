import React from "react";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { DeleteAccountButton } from "./DeleteAccountButton/DeleteAccountButton";

// TODO add tests for this component

export const DangerZone: React.FC = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="EditSettings__subContainer">
      <Divider orientation="left" plain>
        {t("profile.dangerZone")}
      </Divider>
      <div className="EditSettings__centerDiv">
        <div className="EditSettings__singleSetting">
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
});
