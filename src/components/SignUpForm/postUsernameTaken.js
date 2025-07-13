export const postUsernameTaken = async (username) => {
    const requestBody = {
        "username": username
    };

    const response = await fetch(process.env.API_URL + `/user/taken/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (response.status !== 200 && response.status !== 201) {
        if (response.status === 401) {
            throw new Error(`Error! Unauthorized(401)`);
        } else {
            throw new Error(`Error! Status ${response.status}`);
        }
    }

    const data = await response.json();
    const taken = data.taken;
    return taken;
};