import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MediaConfig, MediaFile } from 'src/shared/types/media';
@Injectable()
export class FileValidatorPipe implements PipeTransform {
  public constructor(private readonly conf: ConfigService) {}
  transform(value: any) {
    if (!value || !value.buffer) return value;

    const files = this.conf.get<MediaConfig>('MediaConfig').FILES;
    const mimetypes = [...files.keys()];

    if (!mimetypes.includes(value.mimetype)) {
      throw new BadRequestException(`file type is not supported`);
    }
    if (files.get(value.mimetype) < value.size) {
      throw new BadRequestException(`file size is greater than ${'dummy'}`);
    }

    const parts = value.mimetype.split('/');

    return <MediaFile>{ ...value, ext: parts[1], filetype: parts[0] };
  }
}
