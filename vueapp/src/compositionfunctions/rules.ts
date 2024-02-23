import Ruler from "./Ruler.ts";

const useRules = () => {
    const notEmpty = (fieldName: string) => {
        return new Ruler({fieldName}).notEmpty;
    };

    const isEmail = (fieldName: string) => {
        return new Ruler({fieldName}).isEmail;
    };

    const isStrongPassword = (fieldName: string) => {
        return new Ruler({fieldName}).isStrongPassword;
    };

    const isSamePassword = (password: any) => {
        return new Ruler({compareTo: password}).isSamePassword;
    };

    return {
        notEmpty,
        isEmail,
        isStrongPassword,
        isSamePassword
    }
};

export default useRules;