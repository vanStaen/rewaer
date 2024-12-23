import axios from "axios";

export async function fetchLooks() {
  const requestBody = {
    query: `
      {
        getLooks {
          id,
          title,
          category,
          season,
          items,
          active,
          favorite,
          private,
          likes,
          dislikes,
          createdAt,
          mediaId,
          user {
              id,
          }
        }
      }
      `,
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql/`,
    method: "POST",
    data: requestBody,
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
  const looks = await response.data.data.getLooks;
  return looks;
}
