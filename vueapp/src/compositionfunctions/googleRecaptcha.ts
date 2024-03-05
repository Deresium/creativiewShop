import {useGlobalStore} from "../pinia/global/GlobalStore.ts";

const useGoogleRecaptcha = () => {
    const globalStore = useGlobalStore();
    const getToken = async (action: string) => {
        if(!globalStore.getRecaptcheReady){
            return null;
        }

        //@ts-ignore
        return await grecaptcha.enterprise.execute(import.meta.env.VITE_APP_GOOGLE_RECAPTCHA_ID, {action: action});
    }

    return {
        getToken
    }
};

export default useGoogleRecaptcha;