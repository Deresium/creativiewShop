import {computed} from "vue";
import {useUserStore} from "../pinia/user/UserStore.ts";

const useUser = () => {
    const userStore = useUserStore();
    const nameFirstName = computed(() => userStore.getNameFirstName);
    const isLoggedIn = computed(() => userStore.isLoggedIn);
    const isAdmin = computed(() => userStore.isAdmin);

    return {
        nameFirstName,
        isLoggedIn,
        isAdmin
    }
};

export default useUser;