import { Router } from 'express';
import logger from '../utils/logger';

export const reqLogger = (router: Router): void => {
  router.use(
    (req, res, next): void => {
      const today = new Date();
      const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      const dateTime = date + ' ' + time;
      logger.info(`[${dateTime}] ${req.method} at:${req.path}`);
      next();
    },
  );
};
