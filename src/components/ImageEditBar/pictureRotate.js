export async function pictureRotate(url, numberOfQuarterTurnToTheRight) {
  const requestBody = {
    url: url,
    numberOfQuarterTurnToTheRight: numberOfQuarterTurnToTheRight,
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
  return data.newUrl;
}
