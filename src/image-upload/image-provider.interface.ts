import { ConfigService } from 'src/config/config.service';

export default interface ImageProvider {
  uploadImage(image: string, type: string);
}
