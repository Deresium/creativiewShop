import express from "express";


export default abstract class ApplicationRouter {
    private readonly router = express.Router();

    protected constructor() {
    }

    getRouter() {
        return this.router;
    }

    abstract initRoutes(): void;
}