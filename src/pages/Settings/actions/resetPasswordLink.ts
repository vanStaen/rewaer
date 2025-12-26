import { notification } from "antd";
import { useTranslation } from "react-i18next";

import { postSendRecoverLink } from "@components/PasswordRecover/postSendRecoverLink.js";
import { userStore } from "@stores/userStore/userStore.js";

export async function resetPasswordLink(): Promise<void> {
  const { t } = useTranslation();
  try {
    await postSendRecoverLink(userStore.email);
    notification.success({
      message: t("login.recoverEmailSent"),
      placement: "bottomRight",
    });
  } catch (error: any) {
    notification.warning({
      message: error.message,
      placement: "bottomRight",
    });
  }
}
