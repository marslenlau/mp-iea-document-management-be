import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(
    private prisma: PrismaService,
  ) {}
  async create(createFileDto: CreateFileDto) {
    try {
      const file = await this.prisma.file.create({
        data: createFileDto,
      });
      return file;
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

  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} file`;
  // }
}
