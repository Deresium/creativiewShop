export default abstract class MailContent {
    private readonly language: string;

    constructor(language: string) {
        this.language = language;
    }

    public getTitle(): string {
        if (this.language && this.language === 'fr') {
            return this.getTitleFr();
        }
        return this.getTitleEn();
    }

    public getBody(html: boolean): string {
        let separator = '\n';
        if (html) {
            separator = '<br/>';
        }
        if (this.language && this.language === 'fr') {
            return this.getBodyFr(separator);
        }
        return this.getBodyEn(separator);
    }

    protected abstract getTitleFr(): string;

    protected abstract getTitleEn(): string;

    protected abstract getBodyFr(separator: string): string;

    protected abstract getBodyEn(separator: string): string;
}