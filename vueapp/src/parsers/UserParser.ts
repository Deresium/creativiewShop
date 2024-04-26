import UserVM from "../viewmodels/UserVM.ts";

export default class UserParser {
    public static parseUser(userData: any): UserVM {
        return new UserVM(userData.email, userData.name, userData.firstName, userData.isAdminStore, userData.isAdminGlobal, userData.isLoggedIn);
    }
}