import {defineStore} from "pinia";
import StoreState from "./StoreState.ts";

export const useStoreStore = defineStore('store', {
    state: () => ({
        store: new StoreState()
    }),
    getters: {
        getCurrencyCode: state => state.store.getCurrencyCode(),
        getCurrencySymbol: state => state.store.getCurrencySymbol(),
    },
    actions: {
        setCurrency(currencyCode: string, currencySymbol: string) {
            this.store.setCurrencyCode(currencyCode);
            this.store.setCurrencySymbol(currencySymbol);
        }
    }
});