export default class GlobalState {
    private showMenuOverlay: boolean;
    private showLoginOverlay: boolean;
    private recaptchaReady: boolean;


    public getShowMenuOverlay(): boolean {
        return this.showMenuOverlay;
    }

    public setShowMenuOverlay(value: boolean) {
        this.showMenuOverlay = value;
    }

    public getShowLoginOverlay(): boolean {
        return this.showLoginOverlay;
    }

    public setShowLoginOverlay(value: boolean) {
        this.showLoginOverlay = value;
    }


    getRecaptchaReady(): boolean {
        return this.recaptchaReady;
    }

    setRecaptchaReady(value: boolean) {
        this.recaptchaReady = value;
    }
}