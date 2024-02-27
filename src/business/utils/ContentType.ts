export default class ContentType {
    public static determinateContentType(fileName: string): string {
        if (!fileName) {
            return null;
        }

        const splitName = fileName.split('.');
        if (splitName.length < 2) {
            return null;
        }

        const extension = splitName[splitName.length - 1].toLowerCase();


        switch (extension) {
            case 'png':
                return 'image/png';
            case 'jpg':
                return 'image/jpg';
            case 'jpeg':
                return 'image/jpeg';
            case 'pdf':
                return 'application/pdf';
            default:
                return 'image/*';
        }
    }
}