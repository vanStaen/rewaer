export async function postNotificationItemShared(
  notificationType,
  mediaId,
  userNotifiedId,
  actionData,
) {
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
