import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service"; // Asegúrate de que la ruta sea correcta
import { JwtPayload } from "../interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly prisma: PrismaService,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: JwtPayload) {
        const { id } = payload;
        const user = await this.prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                rol: true,
                status: true,
            }
        });
        if (!user) {
            throw new UnauthorizedException('Token is invalid');
        }
        if (!user.status) {
            throw new UnauthorizedException('Account is disabled');
        }
        return user;
    }
}