import { Injectable } from '@nestjs/common';
import { ImgurService } from './imgur.service';

@Injectable()
export class ImageUploadService {
  constructor(private readonly imageProvider: ImgurService) {}

  async uploadFunction(image: string) {
    return this.imageProvider.uploadImage(image, 'base64');
  }
}
