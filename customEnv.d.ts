declare namespace NodeJS {
    interface ProcessEnv {
        PORT,
        DATABASE_URL,
        DNS_NAME,
        JWT_SECRET
    }
}