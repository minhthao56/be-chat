import { CloudinaryService } from './cloudinary.service';
import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Param,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Put('/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express, @Param('userId') userId: string) {
    return await this.cloudinaryService.uploadImage(file.path, userId);
  }

  @Put('/banner/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBanner(
    @UploadedFile() file: Express,
    @Param('userId') userId: string,
  ) {
    return await this.cloudinaryService.uploadImageBanner(file.path, userId);
  }
}
