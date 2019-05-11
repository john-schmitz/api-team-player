import express from 'express';
import userRoutes from './userRoutes';
import feedRoutes from './feedRoutes';

class Routes {
  public Router: express.Router;

  public constructor() {
    this.Router = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {
    this.Router.use(userRoutes);
    this.Router.use(feedRoutes);
  }
}
export default new Routes().Router;
