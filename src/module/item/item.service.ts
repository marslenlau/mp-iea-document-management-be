import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  private readonly itemFields = {
    id: true,
    status: true,
    document: {
      select: {
        id: true,
        name: true,
        description: true,
      },
    },
  };
  
  constructor(
    private prismaService: PrismaService,
  ) {}

  async create(createItemDto: CreateItemDto) {
    try {
      const item = await this.prismaService.item.create({
        data: createItemDto,
        select: this.itemFields,
      });
      return item;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const items =  await this.prismaService.item.findMany({
        select: this.itemFields,
      });
      return items;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      await this.getItem(id);      
      const item = await this.prismaService.item.findUnique({
        where: { id },
        select: this.itemFields,
      });
      return item;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      await this.getItem(id);
      const item = await this.prismaService.item.update({
        where: { id },
        data: updateItemDto,
        select: this.itemFields,
      });
      return item;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.getItem(id);
      const item =await this.prismaService.item.delete({
        where: { id },
      });
      return {
        raw: null, 
        affected: item ? 1 : 0,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async getItem(id: number) {
    const item = await this.prismaService.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new BadRequestException('Item not found.');
    }
    return item;
  }
}
