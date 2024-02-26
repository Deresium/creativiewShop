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
const AwsCredentialsSingleton_1 = __importDefault(require("../AwsCredentialsSingleton"));
const client_s3_1 = require("@aws-sdk/client-s3");
const stream_1 = require("stream");
class AwsOperations {
    getFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = AwsCredentialsSingleton_1.default.getInstance().getS3Client();
            const command = new client_s3_1.GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName
            });
            try {
                const response = yield client.send(command);
                if (!(response.Body instanceof stream_1.Readable)) {
                    console.log('Not good class');
                    return null;
                }
                console.log(`image ${fileName} get on ${process.env.AWS_BUCKET_NAME}`);
                return yield this.streamToString(response.Body);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    streamToString(stream) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                const chunks = [];
                stream.on('data', (chunk) => chunks.push(chunk));
                stream.on('error', reject);
                stream.on('end', () => resolve(Buffer.concat(chunks).toString('base64')));
            });
        });
    }
    addFile(fileName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = AwsCredentialsSingleton_1.default.getInstance().getS3Client();
            const command = new client_s3_1.PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: data
            });
            try {
                yield client.send(command);
                console.log(`image ${fileName} saved on ${process.env.AWS_BUCKET_NAME}`);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    deleteFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = AwsCredentialsSingleton_1.default.getInstance().getS3Client();
            const command = new client_s3_1.DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName
            });
            try {
                yield client.send(command);
                console.log(`image ${fileName} deleted on ${process.env.AWS_BUCKET_NAME}`);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = AwsOperations;
//# sourceMappingURL=AwsOperations.js.map