import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResolutionService } from '../resolution/resolution.service';

@Injectable()
export class SearchService {
  constructor(
    private prisma: PrismaService,
    private ResolutionService: ResolutionService
  ) {}

  create(createSearchDto: CreateSearchDto) {
    return 'This action adds a new search';
  }

  findAll() {
    return `This action returns all search`;
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
  //*
  async searchCode(search: any) {
    try {
      if(search.type == 'resolution'){
        const resolutions = await this.prisma.resolution.findMany({
          where: {
            nro: {
              contains: search.nro
            }
          },
          select: {
            id: true,
            doc_date: true,
            nro: true,
            description: true,
            file:{
              select: {
                id: true,
                file_name: true,
                file_path: true,
              }
            },
            id_instrument: true,
          }
        });
        return resolutions;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchDate(search: any) {
    try {
      if(search.type == 'resolution'){
        const resolutions = await this.prisma.resolution.findMany({
          where: {
            doc_date: {
              gte: new Date(search.dateInit), // Fecha inicial
              lte: new Date(search.dateEnd)   // Fecha final
            }
          }
        });
        return resolutions;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async descriptionDescription(search: any) {
    try {
      if(search.type == 'resolution'){
        const resolutions = await this.prisma.resolution.findMany({
          where: {
            description: {
              contains: search.description
            }
          }
        });
        return resolutions;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
