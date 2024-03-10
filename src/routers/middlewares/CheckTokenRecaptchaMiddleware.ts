import ApplicationMiddleware from "./ApplicationMiddleware";
import {RecaptchaEnterpriseServiceClient} from "@google-cloud/recaptcha-enterprise";
import {RequestHandler} from "express";

export default class CheckTokenRecaptchaMiddleware extends ApplicationMiddleware {
    private readonly googleClient: any;
    private readonly projectPath: any;

    constructor() {
        super();
        this.googleClient = new RecaptchaEnterpriseServiceClient();
        this.projectPath = this.googleClient.projectPath(process.env.GOOGLE_PROJECT_ID);
    }

    defineMiddlewareFunction(): RequestHandler {
        return async (req: any, res: any, next: any) => {
            const request = ({
                assessment: {
                    event: {
                        token: 'action-token',
                        siteKey: process.env.GOOGLE_RECAPTCHA_KEY,
                    }
                },
                parent: this.projectPath
            });

            const [response] = await this.googleClient.createAssessment(request);

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

        }
    }
}