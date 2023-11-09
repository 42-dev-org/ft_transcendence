import { PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class FileValidatorPipe implements PipeTransform {
    private readonly conf;
    constructor(conf: ConfigService);
    transform(value: any): any;
}
