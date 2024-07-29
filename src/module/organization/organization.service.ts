import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class OrganizationService {
  private readonly organizationFields = {
    id: true,
    name: true,
    description: true,
    status: true
  };
  constructor(private prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      return await this.prisma.organization.create({
        data: createOrganizationDto,
        select: this.organizationFields,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Ya existe un instrumento con este nombre.');
      }
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.organization.findMany({
        select: this.organizationFields,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const organization = await this.prisma.organization.findUnique({
        where: { id },
        select: this.organizationFields,
      });
      if (!organization) {
        throw new BadRequestException(`Organization with id ${id} not found`);
      }
      return organization;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    try {
      return await this.prisma.organization.update({
        where: { id },
        data: updateOrganizationDto,
        select: this.organizationFields,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException(`Organization with id ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id); // Verifica si existe
      await this.prisma.organization.delete({
        where: { id },
      });
      return { message: `Organization with id ${id} has been deleted` };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
