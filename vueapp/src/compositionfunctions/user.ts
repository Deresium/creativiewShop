import {computed} from "vue";
import {useUserStore} from "../pinia/user/UserStore.ts";

const useUser = () => {
    const userStore = useUserStore();
    const nameFirstName = computed(() => userStore.getNameFirstName);
    const isLoggedIn = computed(() => userStore.isLoggedIn);
    const isAdminStore = computed(() => userStore.isAdminStore);
    const isAdminGlobal = computed(() => userStore.isAdminGlobal);

    return {
        nameFirstName,
        isLoggedIn,
        isAdminStore,
        isAdminGlobal
    }
};

export default useUser;