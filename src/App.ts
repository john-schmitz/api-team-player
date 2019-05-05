import express from 'express'
import Routes from './routes'

import bodyParser from "body-parser";

class App {
  public express: express.Express

  constructor () {
    this.express = express()
    this.mountMiddleware()
    this.mountRoutes()
  }

private mountMiddleware() {
  this.express.use(bodyParser.json())
}

  private mountRoutes (): void {
    this.express.use(Routes)
  }
}

export default new App().express