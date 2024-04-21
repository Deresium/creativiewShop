import {defineStore} from "pinia";
import StoreState from "./StoreState.ts";
import StoreAccessRequester from "../../requesters/StoreAccessRequester.ts";
import BasketRequester from "../../requesters/BasketRequester.ts";
import CurrencyRequester from "../../requesters/CurrencyRequester.ts";

export const useStoreStore = defineStore('store', {
    state: () => ({
        store: new StoreState()
    }),
    getters: {
        getCurrencyCode: state => state.store.getCurrencyCode(),
        getCurrencySymbol: state => state.store.getCurrencySymbol(),
        getHasAccessToStore: state => state.store.getHasAccessToStore(),
        getNbItemsInBasket: state => state.store.getNbItemsInBasket()
    },
    actions: {
        async setCurrency(currencyCode: string) {
            this.store.setCurrencyCode(currencyCode);
            const currencies = await CurrencyRequester.requestCurrencies();
            for (const currency of currencies) {
                if (currency.getCurrencyCode() === currencyCode) {
                    this.store.setCurrencySymbol(currency.getSymbol());
                }
            }
        },

        async setHasAccessToStore() {
            const response = await StoreAccessRequester.requestStoreAccess();
            this.store.setHasAccessToStore(response);
        },

        async refreshNbItemsInStore() {
            const nbItems = await BasketRequester.requestNbItemsBasket();
            this.store.setNbItemsInBasket(nbItems);
        }
    }
});