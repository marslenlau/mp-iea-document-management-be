import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './module/user/user.module';
import { FileModule } from './module/file/file.module';
import { AuthModule } from './module/auth/auth.module';
import { MailModule } from './module/mail/mail.module';
import { OrganizationModule } from './module/organization/organization.module';
@Module({
  imports: [
    // Import the ConfigModule
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),
    PrismaModule,
    UserModule,
    FileModule,
    AuthModule,
    MailModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
