import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailOptionsInterface } from './interfaces/mail';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly conf: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: conf.get<string>('MAILER_HOST'), // TODO: update the location of those cars later
      port: conf.get<number>('MAILER_PORT'),
      auth: {
        user: conf.get<string>('MAILER_USERNAME'),
        pass: conf.get<string>('MAILER_PASSWORD'),
      },
    });
  }

  async sendEmail(options: MailOptionsInterface) {
    return this.transporter.sendMail(options);
  }
}
