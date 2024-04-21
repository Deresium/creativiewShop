import {defineStore} from "pinia";
import CustomerState from "./CustomerState.ts";
import CustomerRequester from "../../requesters/CustomerRequester.ts";

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customer: new CustomerState()
    }),
    getters: {
        getCustomerName: state => state.customer.getName(),
        getCustomerId: state => state.customer.getCustomerId(),
        getFirstColorHex: state => state.customer.getFirstColorHex(),
        getSecondColorHex: state => state.customer.getSecondColorHex(),
        getThirdColorHex: state => state.customer.getThirdColorHex(),
        getCurrencyCode: state => state.customer.getCurrencyCode(),
        getCurrencySymbol: state => state.customer.getCurrencySymbol()
    },
    actions: {
        async retrieveCustomer() {
            const customerVM = await CustomerRequester.getCustomer();
            this.customer.setCustomerId(customerVM.getCustomerId());
            this.customer.setName(customerVM.getName());
            this.customer.setDnsName(customerVM.getDnsName());
            this.customer.setStoreProtectionCode(customerVM.getStoreProtectionCode());
            this.customer.setFirstColor(customerVM.getFirstColor());
            this.customer.setSecondColor(customerVM.getSecondColor());
            this.customer.setThirdColor(customerVM.getThirdColor());
            this.customer.setCurrencyCode(customerVM.getCurrencyCode());
            this.customer.setCurrencySymbol(customerVM.getCurrencySymbol());
        }
    }
});