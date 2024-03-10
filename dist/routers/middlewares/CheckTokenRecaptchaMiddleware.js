"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationMiddleware_1 = __importDefault(require("./ApplicationMiddleware"));
const recaptcha_enterprise_1 = require("@google-cloud/recaptcha-enterprise");
class CheckTokenRecaptchaMiddleware extends ApplicationMiddleware_1.default {
    constructor() {
        super();
        this.googleClient = new recaptcha_enterprise_1.RecaptchaEnterpriseServiceClient();
        this.projectPath = this.googleClient.projectPath(process.env.GOOGLE_PROJECT_ID);
    }
    defineMiddlewareFunction() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const request = ({
                assessment: {
                    event: {
                        token: 'action-token',
                        siteKey: process.env.GOOGLE_RECAPTCHA_KEY,
                    }
                },
                parent: this.projectPath
            });
            const [response] = yield this.googleClient.createAssessment(request);
            if (!response.tokenProperties.valid) {
                console.error(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
                res.status(403).send();
                return;
            }
            const recaptchaAction = req.query.recaptchaAction;
            if (response.tokenProperties.action !== recaptchaAction) {
                console.error("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
                res.status(403).send();
                return;
            }
            const score = response.riskAnalysis.score;
            console.log(score);
            next();
        });
    }
}
exports.default = CheckTokenRecaptchaMiddleware;
//# sourceMappingURL=CheckTokenRecaptchaMiddleware.js.map