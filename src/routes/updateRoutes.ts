/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';

import updateController from '../controllers/updateController';

class UpdateRoutes {
  public Router: express.Router;
  public constructor() {
    this.Router = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {
    this.Router.post(
      '/match/update/:id',
      (req, res, next): any => {
        try {
          const update = {
            scorePrincipal: req.body.scorePrincipal,
            scoreVisitor: req.body.scoreVisitor,
            action: {
              type: req.body.action.type,
              text: req.body.action.text,
            },
          };
          updateController.add(update, req.params.id);
          res.send({ message: 'ok' });
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
export default new UpdateRoutes().Router;
