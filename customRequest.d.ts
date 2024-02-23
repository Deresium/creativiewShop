declare module 'express-serve-static-core' {
    import CustomerVM from "./src/business/models/viewmodels/CustomerVM";

    interface Request {
        userId: number,
        userRole: string,
        customer: CustomerVM,
        language: string
    }
}