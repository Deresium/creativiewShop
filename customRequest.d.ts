declare module 'express-serve-static-core' {
    interface Request {
        userId: number,
        userRole: string,
        customerId: number
    }
}