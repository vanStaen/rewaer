import axios from 'axios';

export default async function deleteLook(id) {

    const requestBody = {
        query: `
            mutation {
                deleteLook(lookId: "${id}") {
                _id
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

};