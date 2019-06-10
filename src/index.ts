import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import routes from './api';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandlers';
import { createConnection } from 'typeorm';
import { options } from './utils/dbConnectionOptions';
import logger from './utils/logger';
import winston from 'winston';

const router = express();

logger.info('Applying middlewares');
applyMiddleware(middleware, router);
logger.info('Applying routes');
applyRoutes(routes, router);
logger.info('Applying error handlers');
applyMiddleware(errorHandlers, router);

logger.info('Create server');
const { PORT = 5500 } = process.env;
const server = http.createServer(router);

logger.info('Attempting to connect to the databse');
createConnection(options())
  .then(
    (): void => {
      server.listen(PORT, (): winston.Logger => logger.info(`Server is running at port ${PORT}...`));
    },
  )
  .catch(
    (error): void => {
      logger.error(error);
    },
  );
