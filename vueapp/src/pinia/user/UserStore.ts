import {defineStore} from "pinia";
import UserState from "./UserState.ts";
import UserRequester from "../../requesters/UserRequester.ts";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: new UserState()
    }),
    getters: {
        getNameFirstName: state => state.user.getNameFirstName(),
        getEmail: state => state.user.getEmail(),
        isAdminStore: state => state.user.getIsAdminStore(),
        isLoggedIn: state => state.user.getIsLoggedIn()
    },
    actions: {
        async retrieveLoginUserInfo() {
            const userVM = await UserRequester.getLoggedInUserInfo();
            if (userVM === null) {
                return;
            }

            this.user.setName(userVM.getName());
            this.user.setFirstName(userVM.getFirstName());
            this.user.setEmail(userVM.getEmail());
            this.user.setIsAdminStore(userVM.getIsAdminStore());
            this.user.setIsLoggedIn(userVM.getIsLoggedIn());
        },

        async logout() {
            await UserRequester.logout();
            this.user.setName(null);
            this.user.setFirstName(null);
            this.user.setEmail(null);
            this.user.setIsAdminStore(false);
            this.user.setIsLoggedIn(false);
        }
    }
});