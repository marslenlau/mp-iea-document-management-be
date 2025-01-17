import { IsEmail, IsString,  MaxLength,  MinLength } from "class-validator";

export class AuthVerifyDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}