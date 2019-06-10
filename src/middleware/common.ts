import { Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

export const handleCors = (router: Router): void => {
  router.use(cors({ credentials: true, origin: true }));
};

export const handleBodyRequestParsing = (router: Router): void => {
  router.use(parser.json());
};

export const handleCompression = (router: Router): void => {
  router.use(compression());
};

export const handleHelmet = (router: Router): void => {
  router.use(
    helmet({
      featurePolicy: {
        features: {
          camera: ["'none'"],
        },
      },
      hidePoweredBy: true,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'code.jquery.com', 'stackpath.bootstrapcdn.com', 'cdn.jsdelivr.net', "'unsafe-eval'"],
          styleSrc: ["'self'", 'stackpath.bootstrapcdn.com'],
          fontSrc: ["'self'", 'stackpath.bootstrapcdn.com'],
        },
      },
      referrerPolicy: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any),
  );
};
