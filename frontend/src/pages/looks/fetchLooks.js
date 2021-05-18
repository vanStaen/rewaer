import axios from 'axios';

export default async function fetchLooks() {
    const requestBody = {
      query: `
            query {
                looks {
                  _id
                  title
                  active
                  favorite
                  mediaUrlThumb
                }
              }
              `,
    };
    const response = await axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        data: requestBody,
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Unauthenticated!");
    }    
    const looks = await response.data.data.looks;
    return looks;
  };