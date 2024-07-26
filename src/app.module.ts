import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [
    // Import the ConfigModule
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
