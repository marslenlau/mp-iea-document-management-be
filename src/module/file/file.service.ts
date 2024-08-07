import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(
    private prisma: PrismaService,
  ) {}
  async create(file: Express.Multer.File) {
    try {
      const fileDtoCommon: CreateFileDto = {
        content_type: file.mimetype,
        file_name: file.filename,
        file_size: file.size.toString(),
        file_path: file.destination,
        is_picture: file.mimetype.startsWith('pdf/'),
        status: true
      };
      const fileSave = await this.prisma.file.create({
        data: fileDtoCommon,
        select: {
          id: true,
        }
      });
      return fileSave;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // findAll() {
  //   return `This action returns all file`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} file`;
  // }

  update(id: number, updateFileDto: UpdateFileDto, file: Express.Multer.File) {
    try {
      const fileDtoCommon: UpdateFileDto = {
        content_type: file.mimetype,
        file_name: file.filename,
        file_size: file.size.toString(),
        file_path: file.destination,
        is_picture: file.mimetype.startsWith('pdf/'),
        status: true
      };
      const fileSave = this.prisma.file.update({
        where: { id },
        data: fileDtoCommon,
        select: {
          id: true,
        }
      });
      return fileSave;
    } catch (error) {
      throw new Error(error.message);
    }
    return `This action updates a #${id} file`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} file`;
  // }
}
