import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserEmail } from './interface/user_email';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    constructor(
        private mailerService: MailerService,
    ) {}

    async sendUserConfirmation(userEmail: UserEmail){
        try {
            await this.mailerService.sendMail({
                to: userEmail.to,
                subject: userEmail.subject,
                template: './welcome_user',
                context: {
                    name: userEmail.name,
                    password: userEmail.password,
                }
            })
            this.logger.log('email send success!');
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
