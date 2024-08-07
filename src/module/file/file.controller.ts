import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors( FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/pdf',
      filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${Date.now()}.${fileExtension}`;
        return cb(null, filename);
      },
    })
  }))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.create(file);
  }

  @Patch(':id')
  @UseInterceptors( FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/pdf',
      filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${Date.now()}.${fileExtension}`;
        return cb(null, filename);
      },
    })
  }))
  uploadImageHUpdate(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.update(+id, updateFileDto, file);
  }
}
