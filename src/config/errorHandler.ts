/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (typeof err === 'string') {
    // custom application error
    res.status(400);
    res.send({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    res.status(401);
    res.send({ message: 'Invalid Token' });
  }
  if (err.name === 'ExistingEmail') {
    res.status(406);
    res.send({ message: 'Email exists' });
  }

  res.status(500);
  res.send({ message: err.message });
}
