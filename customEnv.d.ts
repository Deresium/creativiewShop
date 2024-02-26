declare namespace NodeJS {
    interface ProcessEnv {
        PORT,
        DATABASE_URL,
        DNS_NAME,
        JWT_SECRET,
        AWS_KEY_ID,
        AWS_KEY_SECRET,
        AWS_BUCKET_NAME
    }
}