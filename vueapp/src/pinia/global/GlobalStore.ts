import {defineStore} from "pinia";
import GlobalState from "./GlobalState.ts";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        global: new GlobalState()
    }),
    getters: {
        getShowMenuOverlay: state => state.global.getShowMenuOverlay(),
        getShowLoginOverlay: state => state.global.getShowLoginOverlay(),
        getRecaptcheReady: state => state.global.getRecaptchaReady()
    },
    actions: {
        setShowMenuOverlay(value: boolean) {
            this.global.setShowMenuOverlay(value);
        },
        setShowLoginOverlay(value: boolean) {
            this.global.setShowLoginOverlay(value);
        },
        setRecaptchaReady(value: boolean) {
            this.global.setRecaptchaReady(value);
        }
    }
});