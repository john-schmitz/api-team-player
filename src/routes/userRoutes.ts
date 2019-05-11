import express from 'express';

import userController from '../controllers/userController';

class UserRoutes {
  public Router: express.Router;
  public constructor() {
    this.Router = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {
    this.Router.get(
      '/user/all',
      async (req, res): Promise<void> => {
        res.status(200);
        res.send(await userController.getAllUsers());
      },
    );

    this.Router.post(
      '/register',
      (req, res): void => {
        const user = { name: req.body.name, nomeOrganizacao: req.body.nomeOrganizacao, email: req.body.email };
        console.log(user);
        userController.add(user);
        res.status(200);
        res.send({ message: 'ok' });
      },
    );
  }
}
export default new UserRoutes().Router;
