import { MailService } from 'src/global/mail/mail.service';
import { MediaService } from 'src/global/media/providers/media.service';
import { MediaFile } from 'src/shared/types/media';
export declare class HomeController {
    private readonly mail;
    private readonly media;
    constructor(mail: MailService, media: MediaService);
    hello(file: MediaFile): Promise<string>;
}
