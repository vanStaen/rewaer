export async function pictureFlip(path, bucket, isMirror) {
  const requestBody = {
    path,
    bucket,
    isMirror,
  };

  const response = await fetch(process.env.API_URL + `/picture/flip`, {
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
