import {useCustomerStore} from "../pinia/customer/CustomerStore.ts";
import {computed} from "vue";

const useCustomer = () => {
    const customerStore = useCustomerStore();
    const firstColor = computed(() => customerStore.getFirstColorHex);

    const secondColor = computed(() => customerStore.getSecondColorHex);
    const thirdColor = computed(() => customerStore.getThirdColorHex);
    const currencySymbol = computed(() => customerStore.getCurrencySymbol);
    const currencyCode = computed(() => customerStore.getCurrencyCode);
    const customerId = computed(() => customerStore.getCustomerId);

    return {
        firstColor,
        secondColor,
        thirdColor,
        currencySymbol,
        currencyCode,
        customerId
    }
};

export default useCustomer;