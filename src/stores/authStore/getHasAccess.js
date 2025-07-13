export const getHasAccess = async () => {
    const response = await fetch(process.env.API_URL + `/auth/access/`, {
        method: "GET",
    });

    if (response.status !== 200 && response.status !== 201) {
        if (response.status === 401) {
            throw new Error(`Error! Unauthorized(401)`);
        } else {
            throw new Error(`Error! Status ${response.status}`);
        }
    }

    const data = await response.json();
    return data.access;
};