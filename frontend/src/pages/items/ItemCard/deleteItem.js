import axios from 'axios';

export default async function deleteItem(id) {

    const requestBody = {
        query: `
            mutation {
                deleteItem(itemId: "${id}") {
                _id
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

};