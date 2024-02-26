import IAwsOperations from "./IAwsOperations";
import AwsCredentialsSingleton from "../AwsCredentialsSingleton";
import {DeleteObjectCommand, GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {Readable} from "stream";

export default class AwsOperations implements IAwsOperations {
    public async getFile(fileName: string): Promise<string> {
        const client = AwsCredentialsSingleton.getInstance().getS3Client();
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName
        });
        try {
            const response = await client.send(command);
            if (!(response.Body instanceof Readable)) {
                console.log('Not good class');
                return null;
            }
            console.log(`image ${fileName} get on ${process.env.AWS_BUCKET_NAME}`);
            return await this.streamToString(response.Body as Readable);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private async streamToString(stream: Readable): Promise<string> {
        return await new Promise((resolve, reject) => {
            const chunks: Uint8Array[] = [];
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('error', reject);
            stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
        });
    }

    public async addFile(fileName: string, data: Buffer): Promise<void> {
        const client = AwsCredentialsSingleton.getInstance().getS3Client();
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: data
        });
        try {
            await client.send(command);
            console.log(`image ${fileName} saved on ${process.env.AWS_BUCKET_NAME}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async deleteFile(fileName: string): Promise<void> {
        const client = AwsCredentialsSingleton.getInstance().getS3Client();
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName
        });
        try {
            await client.send(command);
            console.log(`image ${fileName} deleted on ${process.env.AWS_BUCKET_NAME}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}