"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppSingleton_1 = __importDefault(require("./AppSingleton"));
const port = Number(process.env.PORT);
const expressApp = AppSingleton_1.default.getInstance().getExpressApp();
if (process.env.NODE_ENV === 'production') {
    expressApp.listen(process.env.PORT, () => {
        console.log(`Server is up and running !`);
    });
}
else {
    const host = process.env.DNS_NAME;
    expressApp.listen(port, host, () => {
        console.log(`Server is up and running at http://${host}:${port}/!`);
    });
}
//# sourceMappingURL=index.js.map