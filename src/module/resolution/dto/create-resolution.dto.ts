import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateResolutionDto {

    @IsString()
    doc_date: string;

    @IsString()
    nro: string;

    @IsString()
    description: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsString()
    id_document: string;
}
