import { makeObservable, observable } from "mobx";

export class UserStore {

    user = JSON.parse(localStorage.getItem('user'));
    userId = localStorage.getItem('userId');

    constructor() {
        makeObservable(this, {
            user: observable,
            userId: observable,
        });
    }

}

export const userStore = new UserStore();