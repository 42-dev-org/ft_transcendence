import { Module, Global } from '@nestjs/common';
import { MediaRepository } from './repository/media.repository';
import { MediaService } from './providers/media.service';
import { MediaS3Service } from './providers/s3.service';

@Global()
@Module({
  providers: [MediaService, MediaS3Service, MediaRepository],
  exports: [MediaService],
})
export class MediaModule {}
