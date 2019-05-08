import express from 'express';
import Routes from './routes';
import bodyParser from 'body-parser';
import {createConnection} from 'typeorm';

export class App {
  public express: express.Express

  constructor () {
    this.express = express()
    const options = this.databaseURL()
    createConnection(options).then()
    .catch(error => {
      console.log(error)
    })
    this.mountMiddleware()
    this.mountRoutes()
  }

  private mountMiddleware() {
    this.express.use(bodyParser.json())
  }

  private mountRoutes() {
    this.express.use(Routes)
  }

  private databaseURL(): any{
    const info = {      
      synchronize: true,
      logging: true,
      entities: [
         "dist/models/entity/*.js"
      ],
      cli: {
        entitiesDir: "src/models/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
      }
    }
    if(process.env.DATABASE_URL) {
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ...info
      }
    }
    return {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "test",
      database: "test",
      ...info
    }
  } 
}
