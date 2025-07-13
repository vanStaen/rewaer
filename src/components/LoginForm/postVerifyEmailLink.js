export const postVerifyEmailLink = async (email, language = "en") => {
    const requestBody = {
        "sendto": email,
        "language": language,
    };

    const response = await fetch(process.env.API_URL + `/mail/emailverify`, {
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

    return true;
};