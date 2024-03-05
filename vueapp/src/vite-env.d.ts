/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_URL_CREATIVIEWSHOP: string;
    readonly VITE_APP_GOOGLE_RECAPTCHA_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}