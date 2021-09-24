import axios from 'axios';

export async function fetchItems() {
    const requestBody = {
        query: `
              query {
                  getItems {
                    _id
                    user
                    title
                    active
                    favorite
                    dateCreated
                    mediaUrlThumb
                  }
                }
                `,
      };
    const response = await axios({
        url: process.env.REACT_APP_API_URL + `/graphql/`,
        method: "POST",
        data: requestBody,
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Unauthenticated!");
    }
    const items = await response.data.data.items;
    return items;
  };