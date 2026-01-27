export async function pictureCrop(path, bucket, left, top, width, height) {
  const requestBody = {
    path,
    bucket,
    left,
    top,
    width,
    height,
  };

  const response = await fetch(process.env.API_URL + `/picture/crop`, {
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
