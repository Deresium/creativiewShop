import {defineStore} from "pinia";
import StoreState from "./StoreState.ts";
import StoreAccessRequester from "../../requesters/StoreAccessRequester.ts";
import BasketRequester from "../../requesters/BasketRequester.ts";

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
        setCurrency(currencyCode: string, currencySymbol: string) {
            this.store.setCurrencyCode(currencyCode);
            this.store.setCurrencySymbol(currencySymbol);
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