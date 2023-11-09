/// <reference types="node" />
import { MediaRepository } from '../repository/media.repository';
import { MediaFile } from 'src/shared/types/media';
import { MediaS3Service } from './s3.service';
export declare class MediaService {
    private readonly repository;
    private readonly s3;
    constructor(repository: MediaRepository, s3: MediaS3Service);
    deployFile(key: string, buffer: Buffer): Promise<void>;
    uploadFile(file: MediaFile, uid: string, deploy?: boolean): Promise<any>;
    deleteFile(key: string): Promise<void>;
}
