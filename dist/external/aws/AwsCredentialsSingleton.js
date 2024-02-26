"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const client_ses_1 = require("@aws-sdk/client-ses");
class AwsCredentialsSingleton {
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            region: 'eu-central-1',
            credentials: {
                accessKeyId: process.env.AWS_KEY_ID,
                secretAccessKey: process.env.AWS_KEY_SECRET
            }
        });
        this.sesClient = new client_ses_1.SESClient({
            region: 'eu-central-1',
            credentials: {
                accessKeyId: process.env.AWS_KEY_ID,
                secretAccessKey: process.env.AWS_KEY_SECRET
            }
        });
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return new AwsCredentialsSingleton();
    }
    getS3Client() {
        return this.s3Client;
    }
    getSESClient() {
        return this.sesClient;
    }
}
exports.default = AwsCredentialsSingleton;
//# sourceMappingURL=AwsCredentialsSingleton.js.map