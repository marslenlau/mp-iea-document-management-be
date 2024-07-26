import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './module/user/user.module';
import { FileModule } from './module/file/file.module';
@Module({
  imports: [
    // Import the ConfigModule
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),
    PrismaModule,
    UserModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
