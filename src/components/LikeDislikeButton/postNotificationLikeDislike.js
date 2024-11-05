import axios from "axios";

export async function postNotificationLikeDislike(type, isLike, mediaId, userNotifiedId, actionData) {
  let notificationType;
  if (type === "item" && isLike) {
    notificationType = 12
  } else if (type === "look" && isLike) {
    notificationType = 13
  } else if (type === "item" && !isLike) {
    notificationType = 15
  } else if (type === "look" && !isLike) {
    notificationType = 16
  }

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
