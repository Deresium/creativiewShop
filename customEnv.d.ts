declare namespace NodeJS {
    interface ProcessEnv {
        PORT,
        DATABASE_URL,
        DNS_NAME,
        JWT_SECRET,
        AWS_KEY_ID,
        AWS_KEY_SECRET,
        AWS_BUCKET_NAME,
        GOOGLE_PROJECT_ID,
        GOOGLE_RECAPTCHA_KEY,
        GOOGLE_API_KEY,
        CRYPTO_KEY,
        CRYPTO_IV
    }
}