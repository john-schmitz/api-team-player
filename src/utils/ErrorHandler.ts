import { Response, NextFunction } from 'express';
import { HTTP404Error, HTTP401Error } from '../utils/httpErrors';

interface Error {
  statusCode?: number;
  name?: string;
  message?: string;
  stack?: string;
}

export const notFoundError = (): void => {
  throw new HTTP404Error('Method not found.');
};

export const unauthorized = (err: Error, res: Response, next: NextFunction): void => {
  if (err.name === 'UnauthorizedError') {
    throw new HTTP401Error('Invalid token.');
  } else {
    next(err);
  }
};

export const clientError = (err: Error, res: Response, next: NextFunction): Response => {
  if (err.statusCode) return res.status(err.statusCode).json({ erros: [{ msg: err.message }] });
  next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const serverError = (err: Error, res: Response, next: NextFunction): Response => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({ erros: [{ msg: 'Internal Server Error' }] });
  } else {
    return res.status(500).json(err.stack);
  }
};
