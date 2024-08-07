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

    @IsNumber()
    id_document: number;

    @IsNumber()
    id_file: number;

    @IsNumber()
    @IsOptional()
    id_instrument: number;

    @IsNumber()
    @IsOptional()
    id_item: number;
}
