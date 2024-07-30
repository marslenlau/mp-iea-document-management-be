import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ResolutionService } from './resolution.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('resolution')
export class ResolutionController {
  constructor(private readonly resolutionService: ResolutionService) {}

  @Post()
  @UseInterceptors( FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/pdf',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
        return cb(null, filename);
      },
    })
  }))
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createResolutionDto: CreateResolutionDto
  ) {
    return this.resolutionService.create(createResolutionDto, image);
  }

  @Get()
  findAll() {
    return this.resolutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resolutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResolutionDto: UpdateResolutionDto) {
    return this.resolutionService.update(+id, updateResolutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resolutionService.remove(+id);
  }
}
