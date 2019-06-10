import expressJwt from 'express-jwt';
import { Router } from 'express';

export const handleExpressJwt = (router: Router): void => {
  if (process.env.NODE_ENV != 'test') {
    router.use(
      expressJwt({ secret: process.env.JWT_SECRET }).unless({
        path: [
          // public routes that don't require authentication
          '/user/authenticate',
          '/register',
        ],
      }),
    );
  }
};
