import axios from "axios";

export async function postNotificationItemShared(notificationType, mediaId, userNotifiedId, actionData) {

  const requestBody = {
    mediaId: mediaId,
    notificationType: notificationType,
    userNotifiedId: userNotifiedId,
    actionData: actionData,
  };

  try {
    const response = await axios({
      url: process.env.API_URL + `/notification`,
      method: "POST",
      data: requestBody,
    });
    if ((response.status !== 200) & (response.status !== 201)) {
      throw new Error("Unauthenticated!");
    }
    return true
  }
  catch (e) {
    console.log("error", e);
    return false
  }
}
