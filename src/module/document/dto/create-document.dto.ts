import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDocumentDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}
