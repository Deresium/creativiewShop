import ApplicationMiddleware from "./ApplicationMiddleware";
import {RequestHandler} from "express";
import axios from "axios";

export default class CheckTokenRecaptchaMiddleware extends ApplicationMiddleware {
    defineMiddlewareFunction(): RequestHandler {
        return async (req: any, res: any, next: any) => {
            const token = req.query.token;
            const userAction = req.query.tokenAction;
            const siteKey = process.env.GOOGLE_RECAPTCHA_KEY;
            const host = `${req.protocol}://${req.hostname}`;
            try {
                const response = await axios.post(`https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.GOOGLE_PROJECT_ID}/assessments`, {
                    event: {
                        token: token,
                        expectedAction: userAction,
                        siteKey: siteKey,
                    }
                }, {
                    params: {
                        key: process.env.GOOGLE_API_KEY
                    },
                    headers: {
                        'Referer': host
                    }
                });


                const score = response.data.riskAnalysis.score;
                const valid = response.data.tokenProperties.valid;
                const action = response.data.tokenProperties.action;
                if (!valid || action !== userAction || score <= 0.7) {
                    res.status(403).send('error.recaptcha');
                    return;
                }
                next();
            } catch (error: any) {
                console.error(error);
                res.status(500).send();
            }
        }
    }
}