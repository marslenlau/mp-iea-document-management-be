import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInstrumentDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsNumber()
    id_organization: number;
}
