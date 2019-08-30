import { INestApplication } from '@nestjs/common';

export const applyMiddleware = (
  app: INestApplication,
  middlewares: Array<(app: INestApplication) => void>,
) => {
  for (const middleware of middlewares) {
    middleware(app);
  }
};
