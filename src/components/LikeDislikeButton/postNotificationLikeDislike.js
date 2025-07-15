export async function postNotificationLikeDislike(
  type,
  isLike,
  mediaId,
  userNotifiedId,
  actionData,
) {
  let notificationType;
  if (type === "item" && isLike) {
    notificationType = 12;
  } else if (type === "look" && isLike) {
    notificationType = 13;
  } else if (type === "item" && !isLike) {
    notificationType = 15;
  } else if (type === "look" && !isLike) {
    notificationType = 16;
  }

  const requestBody = {
    mediaId,
    notificationType,
    userNotifiedId,
    actionData,
  };

  try {
    const response = await fetch(process.env.API_URL + `/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Unauthenticated!");
    }
    return true;
  } catch (e) {
    console.log("error", e);
    return false;
  }
}
