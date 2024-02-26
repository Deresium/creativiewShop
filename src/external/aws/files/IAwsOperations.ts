export default interface IAwsOperations {
    getFile(fileName: string): Promise<string>;

    deleteFile(fileName: string): Promise<void>;

    addFile(fileName: string, data: Buffer): Promise<void>;
}