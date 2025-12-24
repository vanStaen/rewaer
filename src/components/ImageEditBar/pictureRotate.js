export async function pictureRotate(
  path,
  bucket,
  numberOfQuarterTurnToTheRight,
) {
  const requestBody = {
    path,
    bucket,
    numberOfQuarterTurnToTheRight,
  };

  const response = await fetch(process.env.API_URL + `/picture/rotate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Unauthenticated!");
  }

  const data = await response.json();
  return data.newPath;
}
