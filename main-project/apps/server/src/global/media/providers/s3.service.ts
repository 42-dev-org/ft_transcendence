import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaS3Service {
  private s3: S3Client;
  constructor(private readonly conf: ConfigService) {
    this.s3 = new S3Client({
      region: this.conf.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.conf.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.conf.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(Body: Buffer, Key: string) {
    const args = {
      Bucket: this.conf.get('AWS_BUCKET_NAME'),
      Key,
      Body,
    };

    return await this.s3.send(new PutObjectCommand(args));
  }

  async deleteFile(Key: string) {
    return await this.s3.send(
      new DeleteObjectCommand({ Key, Bucket: 'robin.dev' }),
    );
  }
}
