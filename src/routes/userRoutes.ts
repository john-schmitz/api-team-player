  /* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';

import userController from '../controllers/userController';
import { GetUserAuthInfoRequest } from '../request';

class UserRoutes {
  public Router: express.Router;
  public constructor() {
    this.Router = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {
    this.Router.post(
      '/register',
      async (req, res, next): Promise<void> => {
        const user = {
          name: req.body.name,
          nameOrganization: req.body.nameOrganization,
          email: req.body.email,
          password: req.body.password,
        };
        try {
          await userController.add(user);
          res.status(200);
          res.send({ message: 'ok' });
        } catch (error) {
          next(error);
        }
      },
    );
    this.Router.post(
      '/user/authenticate',
      (req, res, next): void => {
        userController
          .authenticate(req.body.email, req.body.password)
          .then(
            (user): any => {
              user ? res.json(user) : res.status(406).json({ message: 'Email or password is incorrect' });
            },
          )
          .catch((err): any => next(err));
      },
    );

    this.Router.post(
      '/user/follow/:id',
      async (req: GetUserAuthInfoRequest, res, next): Promise<void> => {
        try {
          await userController.follow(req.user.sub, req.params.id);
          res.status(200);
          res.send({ message: 'ok' });
        } catch (error) {
          next(error);
        }
      },
    );

    this.Router.get(
      '/user/feed',
      async (req: GetUserAuthInfoRequest, res, next): Promise<void> => {
        try {
          res.status(200);
          res.send(await userController.getFeed(req.user.sub));
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
export default new UserRoutes().Router;
