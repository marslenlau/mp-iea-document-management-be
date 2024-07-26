import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";
import { Role } from "../interfaces";

export class CreateUserDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    phone: string;

    @IsString()
    description: string;
    
    @IsString()
    rol: Role;

    @IsBoolean()
    status: boolean;

    @IsString()
    @IsOptional()
    id_file: string;
}
