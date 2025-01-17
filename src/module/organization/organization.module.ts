import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [
    PrismaModule,
  ],
})
export class OrganizationModule {}
