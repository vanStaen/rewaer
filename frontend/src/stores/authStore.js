import { action, makeObservable, observable } from "mobx";
import { openNotification } from "../components/openNotification/openNotification";
import jsonwebtoken from "jsonwebtoken";

export class AuthStore {

    token = null;
    refreshToken = localStorage.getItem("refreshToken") || null;

    constructor() {
        makeObservable(this, {
            token: observable,
            refreshToken: observable,
            login: action,
            logout: action,
            getNewToken: action,
        });
    }

    login = (token, refreshToken) => {
        this.token = token;
        this.refreshToken = refreshToken;
    };

    logout = () => {
        // Delete refreshtoken from localstorage, 
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        localStorage.clear();
        const deleteRequest = { refreshToken: this.refreshToken }
        this.token = null;
        this.refreshToken = null;
        // Delete token from store
        fetch(process.env.REACT_APP_AUTH_URL + "/logout", {
            method: "DELETE",
            body: JSON.stringify(deleteRequest),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status !== 204) {
                    openNotification("Error " + res.status,
                        "Error on logout: The refresh token was not found in the token database.", 3, "error");
                    throw new Error("Error when logout!"); // Probably was the refresh not found in the db
                }
                openNotification("You have successfully logged out.", "", 3, "success");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getNewToken = () => {
        const refreshToken = localStorage.getItem("refreshToken");
        // Check if refreshtoken is expired
        if (refreshToken) {
            let decodedRefreshToken = jsonwebtoken.decode(refreshToken, { complete: true });
            let dateNow = new Date();
            if ((decodedRefreshToken.payload.exp * 1000) < dateNow.getTime()) {
                this.logout();
            } else {
                this.refreshToken = refreshToken;
            }
        }
        // Check if token exist and/or is expired
        if (this.token !== null) {
            let decodedToken = jsonwebtoken.decode(this.token, { complete: true });
            let dateNow = new Date();
            if (decodedToken.payload.exp < Math.floor(dateNow.getTime() / 1000)) {
                this.token = null;
            } else {
                return this.token
            }            
        }
        // Refresh token if token missing
        else if (this.refreshToken) {            
            let requestBody = { refreshToken: this.refreshToken };
            return fetch(process.env.REACT_APP_AUTH_URL + "/token", {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    if (res.status !== 201) {
                        this.logout();
                        throw new Error("Error when refreshing the token!");
                    }
                    return res.json();
                })
                .then((resData) => {
                    localStorage.setItem("refreshToken", resData.refreshToken);
                    if (resData.token) {
                        this.login(
                            resData.token,
                            resData.refreshToken
                        );
                        return resData.token
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

}

export const authStore = new AuthStore();
