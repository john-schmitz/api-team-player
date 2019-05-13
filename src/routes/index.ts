import express from 'express';
import userRoutes from './userRoutes';
import feedRoutes from './feedRoutes';
import matchRoutes from './matchRoutes';
import updateRoutes from './updateRoutes';

class Routes {
  public Router: express.Router;

  public constructor() {
    this.Router = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {
    this.Router.use(userRoutes);
    this.Router.use(feedRoutes);
    this.Router.use(matchRoutes);
    this.Router.use(updateRoutes);
  }
}
export default new Routes().Router;
