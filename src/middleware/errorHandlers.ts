import { Request, Response, NextFunction, Router } from 'express';
import { notFoundError, clientError, serverError, unauthorized } from '../utils/ErrorHandler';
import logger from '../utils/logger';

interface Error {
  statusCode: number;
  name?: string;
  message?: string;
  stack?: string;
}

const loggerError = (router: Router): void => {
  router.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      logger.error(err);
      next(err);
    },
  );
};

const handle401Error = (router: Router): void => {
  router.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      unauthorized(err, res, next);
    },
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleClientError = (router: Router): void => {
  router.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      clientError(err, res, next);
    },
  );
};

const handleServerError = (router: Router): void => {
  router.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      serverError(err, res, next);
    },
  );
};

const handle404Error = (router: Router): void => {
  router.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (req: Request, res: Response): void => {
      notFoundError();
    },
  );
};

export default [loggerError, handle401Error, handleClientError, handleServerError, handle404Error];
