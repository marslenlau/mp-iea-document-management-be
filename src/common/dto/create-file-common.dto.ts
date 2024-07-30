import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FileCommonDto {
    @IsString()
    content_type: string;

    @IsString()
    file_name: string;

    @IsString()
    file_size: string;

    @IsString()
    file_path: string;

    @IsBoolean()
    @IsOptional()
    is_picture: boolean;
}