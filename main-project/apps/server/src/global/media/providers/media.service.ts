import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repository/media.repository';
import { AWS_S3_URL_PREFIX } from 'src/shared/constants/media.constant';
import { MediaFile } from 'src/shared/types/media';
import { MediaS3Service } from './s3.service';
@Injectable()
export class MediaService {
  public constructor(
    private readonly repository: MediaRepository,
    private readonly s3: MediaS3Service,
  ) {}

  public async deployFile(key: string, buffer: Buffer) {
    await this.s3.uploadFile(buffer, key);
  }
  public async uploadFile(file: MediaFile, uid: string, deploy = true) {
    const key = `${file.filetype}-${uid}-${Date.now()}.${file.ext}`;
    if (deploy) {
      const ret = await this.s3.uploadFile(file.buffer, key);
    }
    const data = await this.repository.create({
      mimtype: file.mimetype,
      name: file.originalname,
      size: file.size,
      uploader: { connect: { uid } },
      url: AWS_S3_URL_PREFIX + key,
    });
    return data;
  }

  public async deleteFile(key: string) {
    await this.repository.deleteFileByKey(key);
    await this.s3.deleteFile(key.replace(AWS_S3_URL_PREFIX, ''));
  }
}
