export default class FileVM {
    private readonly file: any;
    private readonly contentType: string;
    private readonly fileName: string;


    constructor(file: any, contentType: string, fileName: string) {
        this.file = file;
        this.contentType = contentType;
        this.fileName = fileName;
    }


    public getFile(): any {
        return this.file;
    }

    public getContentType(): string {
        return this.contentType;
    }

    public getFileName(): string {
        return this.fileName;
    }
}