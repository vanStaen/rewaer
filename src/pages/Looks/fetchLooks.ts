import { Look, getLooksGraphQLResponse } from "../../types/lookTypes";

export async function fetchLooks(): Promise<Look[]> {
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

  const response = await fetch(process.env.API_URL + `/graphql/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Unauthenticated!");
  }
  const data: getLooksGraphQLResponse = await response.json();
  const looks = data.data.getLooks;
  return looks;
}
