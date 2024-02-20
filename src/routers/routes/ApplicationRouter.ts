import express from "express";


export default abstract class ApplicationRouter {
    private readonly router = express.Router();

    protected constructor() {
        this.initRoutes();
    }

    getRouter() {
        return this.router;
    }

    abstract initRoutes(): void;
}