import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResolutionService {
  constructor(
    private prisma: PrismaService,
  ) {}
  create(createResolutionDto: CreateResolutionDto) {
    try {
      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return 'This action adds a new resolution';
  }

  findAll() {
    return `This action returns all resolution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resolution`;
  }

  update(id: number, updateResolutionDto: UpdateResolutionDto) {
    return `This action updates a #${id} resolution`;
  }

  remove(id: number) {
    return `This action removes a #${id} resolution`;
  }
}
