import {RequestHandler} from "express";

export default abstract class ApplicationMiddleware{
    private readonly requestHandler: RequestHandler;

    protected constructor() {
        this.requestHandler = this.defineMiddlewareFunction();
    }

    getRequestHandler(){
        return this.requestHandler;
    }

    abstract defineMiddlewareFunction(): RequestHandler;
}