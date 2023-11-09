/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class MediaS3Service {
    private readonly conf;
    private s3;
    constructor(conf: ConfigService);
    uploadFile(Body: Buffer, Key: string): Promise<import("@aws-sdk/client-s3").PutObjectCommandOutput>;
    deleteFile(Key: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
}
