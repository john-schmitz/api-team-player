import express from 'express';
import Routes from './routes';
import bodyParser from 'body-parser';
import {createConnection} from 'typeorm';
import {User} from './models/entity/User';



export class App {
  public express: express.Express

  constructor () {
    this.express = express()
    const options = this.databaseURL()
    createConnection(options).then(async connection => {
      const userRepository = connection.getRepository(User);
      const user = new User()
      user.nome = "John"
      user.email = "johngc2014@gmail.com"
      user.nomeOrganizacao = "NiceGuy Organizacao"
      const us = userRepository.create(user)
      userRepository.save(us)
      console.log("User criado");
      
    }).catch(error => {
      console.log(error)
      console.log('Deu erro')
      
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
    if(process.env.DATABASE_URL) {
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL
      }
    }
    return {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "test",
      database: "test",
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
  } 
}
