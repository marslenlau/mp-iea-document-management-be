import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('image')
  @UseInterceptors( FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/images',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
        return cb(null, filename);
      },
    })
  }))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() createFileDto: CreateFileDto
  ) {
    return {
      image,
      createFileDto
    };
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }
}
