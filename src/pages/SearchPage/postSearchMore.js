import axios from "axios";

export const postSearchMore = async (searchText) => {

    const requestBody = {
        "searchText": searchText,
    };

    const response = await axios({
        url: process.env.API_URL + `/search/more`,
        method: "POST",
        data: requestBody,
    });

    if ((response.status !== 200) & (response.status !== 201)) {
        if (response.status === 401) {
            throw new Error(`Error! Unauthorized(401)`);
        } else {
            throw new Error(`Error! Status ${response.status}`);
        }
    }

    console.log("search result", response.data)
    return response.data;
};