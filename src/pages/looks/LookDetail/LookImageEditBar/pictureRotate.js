import axios from "axios";

export async function pictureRotate(url, numberOfQuarterTurnToTheRight) {
  const requestBody = {
    url: url,
    numberOfQuarterTurnToTheRight: numberOfQuarterTurnToTheRight,
  };

  const response = await axios({
    url: process.env.API_URL + `/picture/rotate`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
}
