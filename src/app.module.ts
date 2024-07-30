import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './module/user/user.module';
import { FileModule } from './module/file/file.module';
import { AuthModule } from './module/auth/auth.module';
import { MailModule } from './module/mail/mail.module';
import { OrganizationModule } from './module/organization/organization.module';
import { InstrumentModule } from './module/instrument/instrument.module';
import { DocumentModule } from './module/document/document.module';
import { ItemModule } from './module/item/item.module';
import { ResolutionModule } from './module/resolution/resolution.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    // Import the ConfigModule
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false
      }
    }),
    PrismaModule,
    UserModule,
    FileModule,
    AuthModule,
    MailModule,
    OrganizationModule,
    InstrumentModule,
    DocumentModule,
    ItemModule,
    ResolutionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
