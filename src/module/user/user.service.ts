import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserEmail } from '../mail/interface/user_email';
import { MailService } from '../mail/mail.service';
@Injectable()
export class UserService {

  private readonly userSelectFields = {
    id: true,
    first_name: true,
    last_name: true,
    email: true,
    phone: true,
    description: true,
    rol: true,
    status: true,
  };

  constructor(
    private prismaService: PrismaService,
    private emailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { first_name, last_name, email, ...userData } = createUserDto;
      let password = uuidv4().split('-').slice(0, 2).join('');
      const data: UserEmail = {
        name: `${first_name} ${last_name}`,
        password,
        to: email,
        subject: 'Bienvenido a la plataforma GD-IEA',
      };
      await this.emailService.sendUserConfirmation(data);
      const user = await this.prismaService.user.create({
        data: {
          password: await bcrypt.hash(password, 10),
          first_name,
          last_name,
          email,
          ...userData,
        },
      });

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prismaService.user.findMany({
      select: this.userSelectFields,
    });
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        select: this.userSelectFields,
      });
      if (!user) {
        throw new BadRequestException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
        select: this.userSelectFields
      });
      return user;
    } catch (error) {
      throw new BadRequestException(`User with id ${id} not found or ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
      return { message: `User with id ${id} has been deleted` };
    } catch (error) {
      throw new BadRequestException(`User with id ${id} not found or ${error.message}`);
    }
  }
}
