import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthVerifyDto } from './dto/auth-verify.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async authentication(authVerifyDto: AuthVerifyDto) {
        const { email, password } = authVerifyDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                first_name: true,
                last_name: true,
                rol: true,
                status: true,
            },
        });
        if (!user) {
            throw new NotFoundException('Credentials are invalid (email)');
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Credentials are invalid (password)');
        }
        const { password: _, status, ...userData } = user;
        return {
            user: userData,
            status: user.status,
            token: this.getJwtToken({ id: user.id }),
        };
    }

    async privateRoute() {
        return 'This is a private route';
    }

    private getJwtToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }
}