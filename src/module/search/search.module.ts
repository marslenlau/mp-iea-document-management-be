import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResolutionModule } from '../resolution/resolution.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [
    PrismaModule,
    ResolutionModule
  ],
})
export class SearchModule {}
