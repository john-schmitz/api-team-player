import express from 'express';
import feedController from '../controllers/feedController';

class FeedRoutes {
  public Router: express.Router;
  public constructor() {
    this.Router = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {
    this.Router.get(
      '/feed',
      (req, res): void => {
        res.status(200);
        res.send(feedController.getFeed());
      },
    );

    this.Router.post(
      '/feed',
      (req, res): void => {
        if (feedController.addEvent(req.body)) {
          res.status(200);
          res.send({ message: 'ok' });
        } else {
          res.status(500);
          res.send({ message: 'Deu pau aqui.' });
        }
      },
    );
  }
}
export default new FeedRoutes().Router;
