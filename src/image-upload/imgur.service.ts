import { ConfigService } from '../config/config.service';
import { Injectable, HttpService } from '@nestjs/common';
import * as FormData from 'form-data';
import fetch = require('node-fetch');

@Injectable()
export class ImgurService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

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
