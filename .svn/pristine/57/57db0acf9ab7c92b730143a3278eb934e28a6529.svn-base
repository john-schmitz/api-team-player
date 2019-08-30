import { Module, HttpModule } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ConfigModule } from '../config/config.module';
import { ImgurService } from './imgur.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [ImageUploadService, ImgurService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
