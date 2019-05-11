import express from 'express';
import Routes from './routes/routes';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import path from 'path';
import * as swaggerUI from 'swagger-ui-express';
import swaggerJSON from './swagger/swagger.json';
import helmet from 'helmet';

export class App {
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
    this.staticPages();
    this.mountMiddleware();
    this.mountRoutes();
    this.moutSwagger();
    this.moutHelmtet();
  }

  private moutHelmtet(): void {
    this.express.use(
      helmet({
        featurePolicy: {
          features: {
            notifications: ["'none'"],
          },
        },
        hidePoweredBy: true,
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
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

  private mountMiddleware(): void {
    this.express.use(bodyParser.json());
  }

  private mountRoutes(): void {
    this.express.use(Routes);
  }

  private staticPages(): void {
    const ss = path.join(__dirname + '/..', 'public/');
    console.log(ss);
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
