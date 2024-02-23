import {useCustomerStore} from "../pinia/customer/CustomerStore.ts";
import {computed} from "vue";

const useCustomer = () => {
    const customerStore = useCustomerStore();
    const firstColor = computed(() => customerStore.getFirstColorHex);

    const secondColor = computed(() => customerStore.getSecondColorHex);
    const thirdColor = computed(() => customerStore.getThirdColorHex);

    return {
        firstColor,
        secondColor,
        thirdColor
    }
};

export default useCustomer;