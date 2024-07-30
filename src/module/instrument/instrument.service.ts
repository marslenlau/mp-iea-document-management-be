import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Instrument } from './entities/instrument.entity';

@Injectable()
export class InstrumentService {
  private readonly instrumentFields = {
    id: true,
    name: true,
    description: true,
    status: true,
    organization: {
      select: {
        id: true,
        name: true,
        description: true,
      },
    }
  };

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createInstrumentDto: CreateInstrumentDto) {
    try {
      const instrument = await this.prisma.instrument.create({
        data: createInstrumentDto,
        select: this.instrumentFields,
      });
      return instrument;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const instruments =  await this.prisma.instrument.findMany({
      select: this.instrumentFields,
    });
    return instruments;
  }

  async findOne(id: number) {
    try {
      await this.getInstrument(id);
      const instrument = await this.prisma.instrument.findUnique({
        where: { id },
        select: this.instrumentFields,
      });
      return instrument;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateInstrumentDto: UpdateInstrumentDto) {
    try {
      await this.getInstrument(id);
      const instrument = await this.prisma.instrument.update({
        where: { id },
        data: updateInstrumentDto,
        select: this.instrumentFields,
      });
      return instrument;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.getInstrument(id);
      const instrument =await this.prisma.instrument.delete({
        where: { id },
      });
      return {
        raw: null, 
        affected: instrument ? 1 : 0,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async getInstrument(id: number): Promise<Omit<Instrument, 'created_at' | 'updated_at'>> {
    const instrument = await this.prisma.instrument.findUnique({
      where: { id },
      select: this.instrumentFields,
    });
    if (!instrument) {
      throw new BadRequestException(`Instrument with id ${id} not found`);
    }
    return instrument;
  }
}
