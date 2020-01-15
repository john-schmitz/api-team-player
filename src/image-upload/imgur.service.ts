import { ConfigService } from '../config/config.service';
import { Injectable, HttpService } from '@nestjs/common';
import * as FormData from 'form-data';
import fetch = require('node-fetch');
import ImageProvider from './image-provider.interface';

@Injectable()
export class ImgurService implements ImageProvider {
  constructor(private readonly configService: ConfigService) {}

  public async uploadImage(image: string, type: string) {
    const formData = new FormData();
    formData.append('image', image.trim());
    return fetch(`${this.configService.IMGUR_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Client-ID ${this.configService.IMGUR_CLIENT_ID}`,
      },
    });
  }
}
