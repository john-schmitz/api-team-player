import express from 'express';
import Routes from './routes/';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import path from 'path';
import * as swaggerUI from 'swagger-ui-express';
import swaggerJSON from './swagger/swagger.json';
import helmet from 'helmet';
import errorHandler from './config/errorHandler';
import jwt from './config/jwt';

export class Api {
  public express: express.Express;

  public constructor() {
    this.express = express();
    const options = this.databaseURL();
    createConnection(options)
      .then()
      .catch(
        (error): void => {
          console.log(error);
        },
      );

    this.moutHelmtet();
    this.staticPages();
    this.moutAuth();
    this.mountBodyParser();
    this.mountRoutes();
    this.moutSwagger();
    this.mountErrorHandler();
  }

  private moutAuth(): void {
    this.express.use(jwt());
  }

  private mountErrorHandler(): void {
    this.express.use(errorHandler);
  }

  private moutHelmtet(): void {
    this.express.use(
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
  }

  private moutSwagger(): void {
    this.express.use('/swagger.json', express.static(__dirname + '/swagger/swagger.json'));
    this.express.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
  }

  private mountBodyParser(): void {
    this.express.use(bodyParser.json());
  }

  private mountRoutes(): void {
    this.express.use(Routes);
  }

  private staticPages(): void {
    const ss = path.join(__dirname + '/..', 'public/');
    this.express.use(express.static(ss));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private databaseURL(): any {
    const info = {
      synchronize: true,
      logging: true,
      entities: ['dist/models/entity/*.js'],
      cli: {
        entitiesDir: 'src/models/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
      },
      logger: 'file',
    };
    if (process.env.DATABASE_URL) {
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ...info,
      };
    }
    return {
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ...info,
    };
  }
}
