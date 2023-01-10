import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  Res,
  NotFoundException,
  ServiceUnavailableException,
  CacheInterceptor,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { of } from 'rxjs';
import { CloudStorageService } from 'src/core/Services/gcp/cloud-storage.service';
import { multerOptions } from '../../shared/config/multer-config';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

@Controller('media')
@UseInterceptors(CacheInterceptor)
export class MediaController {
  constructor(private storageService: CloudStorageService) {}
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<object> {
    if (!file) throw new BadRequestException('invalid file');

    const filename = await this.storageService.save(file, 'media');
    return of({
      message: 'file has been uploaded',
      filename: filename,
    });
  }

  @Get('url/:mediaId')
  async getMediaURL(@Param('mediaId') mediaId: string): Promise<string> {
    try {
      const url = await this.storageService.getSignedUrl('media/' + mediaId);
      return url;
    } catch (e) {
      if (e.message.toString().includes('No such object')) {
        throw new NotFoundException('image not found');
      } else {
        throw new ServiceUnavailableException('internal error');
      }
    }
  }

  @Get('download/:mediaId')
  async downloadMedia(@Param('mediaId') mediaId: string, @Res() res: Response) {
    try {
      const storageFile = await this.storageService.get('media/' + mediaId);
      res.setHeader('Cache-Control', 'max-age=60d');
      res.end(storageFile.buffer);
    } catch (e) {
      if (e.message.toString().includes('No such object')) {
        throw new NotFoundException('image not found');
      } else {
        throw new ServiceUnavailableException('internal error');
      }
    }
  }
}
