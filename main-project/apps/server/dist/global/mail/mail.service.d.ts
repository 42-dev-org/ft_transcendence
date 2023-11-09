import { ConfigService } from '@nestjs/config';
import { MailOptionsInterface } from './interfaces/mail';
export declare class MailService {
    private readonly conf;
    private transporter;
    constructor(conf: ConfigService);
    sendEmail(options: MailOptionsInterface): Promise<any>;
}
