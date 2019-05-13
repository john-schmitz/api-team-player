import express from 'express';
import feedController from '../controllers/feedController';

class FeedRoutes {
  public Router: express.Router;
  public constructor() {
    this.Router = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {}
}
export default new FeedRoutes().Router;
