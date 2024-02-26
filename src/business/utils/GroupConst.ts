export default class GroupConst {
    public static readonly ADMIN_STORE = '1';

    public static hasAccessTo(askedAccess: string, listAccess: Array<string>): boolean {
        if (listAccess === null || listAccess.length === 0) {
            return false;
        }

        return listAccess.includes(askedAccess);
    }
}
