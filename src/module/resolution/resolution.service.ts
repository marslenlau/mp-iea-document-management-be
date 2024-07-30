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
    private fileService: FileService,
    private itemService: ItemService
  ) {}

  async create(createResolutionDto: CreateResolutionDto, image: Express.Multer.File) {
    try {
      const fileDtoCommon: CreateFileDto = {
        content_type: image.mimetype,
        file_name: image.filename,
        file_size: image.size.toString(),
        file_path: image.destination,
        is_picture: image.mimetype.startsWith('image/'),
        status: true
      };
      const fileSave = await this.fileService.create(fileDtoCommon);

      const itemDto: CreateItemDto = {
        status: true,
        id_document: +createResolutionDto.id_document,
      }
      const itemSave = await this.itemService.create(itemDto);
      
      return itemSave;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
