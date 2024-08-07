import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileCommonDto } from 'src/common/dto/create-file-common.dto';
import { FileService } from '../file/file.service';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { ItemService } from '../item/item.service';
import { CreateItemDto } from '../item/dto/create-item.dto';

@Injectable()
export class ResolutionService {
  constructor(
    private prisma: PrismaService,
    private itemService: ItemService
  ) {}

  async create(createResolutionDto: CreateResolutionDto) {
    try {
      const itemDto: CreateItemDto = {
        status: true,
        id_document: +createResolutionDto.id_document,
      }
      const itemSave = await this.itemService.create(itemDto);
      const resolutionDto: CreateResolutionDto = {
        doc_date: new Date(createResolutionDto.doc_date).toISOString(),
        nro: createResolutionDto.nro,
        description: createResolutionDto.description,
        status: createResolutionDto.status,
        id_document: +createResolutionDto.id_document,
        id_item: itemSave.id,
        id_file: +createResolutionDto.id_file,
        id_instrument: +createResolutionDto.id_instrument,
      };
      const createResolution = await this.prisma.resolution.create({
        data: resolutionDto,
        select: {
          id: true,
          doc_date: true,
          nro: true,
          description: true,
          status: true,
          id_document: true,
          id_item: true,
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
      return createResolution;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    const resolutions = this.prisma.resolution.findMany({
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
      }
    });
    return resolutions;
  }

  async findOne(id: number) {
    try {
      const resolution = await this.prisma.resolution.findUnique({
        where: { id },
        select: {
          id: true,
          doc_date: true,
          nro: true,
          description: true,
          id_instrument: true,
          file:{
            select: {
              id: true,
              file_name: true,
              file_path: true,
            }
          },
        },
      });
      if (!resolution) {
        throw new BadRequestException(`Organization with id ${id} not found`);
      }
      return resolution;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return `This action returns a #${id} resolution`;
  }

  update(id: number, updateResolutionDto: UpdateResolutionDto) {
    try {
      const resolution = this.prisma.resolution.update({
        where: { id },
        data: updateResolutionDto,
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
        }
      });
      return resolution;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} resolution`;
  }
}
