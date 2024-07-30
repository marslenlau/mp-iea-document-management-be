import { Module } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { ResolutionController } from './resolution.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from '../file/file.module';
import { ItemModule } from '../item/item.module';

@Module({
  controllers: [ResolutionController],
  providers: [ResolutionService],
  imports: [
    PrismaModule,
    FileModule,
    ItemModule,
  ],
})
export class ResolutionModule {}
