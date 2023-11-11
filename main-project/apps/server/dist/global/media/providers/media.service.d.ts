/// <reference types="node" />
import { MediaRepository } from '../repository/media.repository';
import { MediaFile } from 'src/shared/types/media';
import { MediaS3Service } from './s3.service';
export declare class MediaService {
    private readonly repository;
    private readonly s3;
    constructor(repository: MediaRepository, s3: MediaS3Service);
    deployFile(key: string, buffer: Buffer): Promise<void>;
    uploadFile(file: MediaFile, uid: string, deploy?: boolean): Promise<{
        uid: string;
        createdAt: Date;
        updatedAt: Date;
        mimtype: string;
        size: number;
        url: string;
        name: string;
        uploaderUid: string;
    }>;
    deleteFile(key: string): Promise<void>;
}
