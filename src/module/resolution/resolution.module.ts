import { Module } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { ResolutionController } from './resolution.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ResolutionController],
  providers: [ResolutionService],
  imports: [
    PrismaModule,
  ],
})
export class ResolutionModule {}
