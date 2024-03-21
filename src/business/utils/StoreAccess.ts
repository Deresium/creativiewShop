export default class StoreAccess {
    public static hasAccessToStore(userId: string, storeProtectionCode: string) {
        if (!storeProtectionCode) {
            return true;
        }

        if (storeProtectionCode === 'NONE') {
            return true;
        }

        if (userId && storeProtectionCode === 'AUTHENTICATED') {
            return true;
        }
        return false;
    }
}