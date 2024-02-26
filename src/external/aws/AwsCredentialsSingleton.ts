import {S3Client} from "@aws-sdk/client-s3";
import {SESClient} from "@aws-sdk/client-ses";


export default class AwsCredentialsSingleton {
    private static instance: AwsCredentialsSingleton;
    private readonly s3Client: S3Client;
    private readonly sesClient: SESClient;

    private constructor() {
        this.s3Client = new S3Client({
            region: 'eu-central-1',
            credentials: {
                accessKeyId: process.env.AWS_KEY_ID,
                secretAccessKey: process.env.AWS_KEY_SECRET
            }
        });

        this.sesClient = new SESClient({
            region: 'eu-central-1',
            credentials: {
                accessKeyId: process.env.AWS_KEY_ID,
                secretAccessKey: process.env.AWS_KEY_SECRET
            }
        });
    }

    public static getInstance(): AwsCredentialsSingleton {
        if (this.instance) {
            return this.instance;
        }
        return new AwsCredentialsSingleton();
    }

    public getS3Client() {
        return this.s3Client;
    }

    public getSESClient() {
        return this.sesClient;
    }

}