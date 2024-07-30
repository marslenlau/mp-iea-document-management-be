import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  private readonly documentFields = {
    id: true,
    name: true,
    description: true,
    status: true
  };
  constructor(
    private prismaService: PrismaService,
  ) {}
  
  async create(createDocumentDto: CreateDocumentDto) {
    try {
      const document = this.prismaService.document.create({
        data: createDocumentDto,
        select: this.documentFields,
      });
      return document;
    } catch (error) {
      throw new BadRequestException(error.message);       
    }
  }

  async findAll() {
    try {
      const documents =  await this.prismaService.document.findMany({
        select: this.documentFields,
      });
      return documents;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      await this.getDocument(id);
      const document = await this.prismaService.document.findUnique({
        where: { id },
        select: this.documentFields,
      });
      return document;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    try {
      await this.getDocument(id);
      const document = await this.prismaService.document.update({
        where: { id },
        data: updateDocumentDto,
        select: this.documentFields,
      });
      return document;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.getDocument(id);
      const document = await this.prismaService.document.delete({
        where: { id },
        select: this.documentFields,
      });
      return {
        raw: null, 
        affected: document ? 1 : 0,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async getDocument(id: number): Promise<Document> {
    try {
      const document = await this.prismaService.document.findUnique({
        where: { id },
      });
      return document;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
