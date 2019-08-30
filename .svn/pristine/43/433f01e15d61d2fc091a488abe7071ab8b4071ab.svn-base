import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';

import { INestApplication } from '@nestjs/common';

const useHelmet = (app: INestApplication) => {
  app.use(helmet());
};

const useRate = (app: INestApplication) => {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
};

const useCompression = (app: INestApplication) => {
  app.use(compression());
};

export default [useRate, useHelmet, useCompression];
