import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CreateItemDto {
    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsNumber()
    id_document: number;
}
