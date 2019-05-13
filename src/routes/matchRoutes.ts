/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';

import matchController from '../controllers/matchController';
import { Match } from '../models/entity/Match';

class MatchRoutes {
  public Router: express.Router;
  public constructor() {
    this.Router = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {
    this.Router.get(
      '/match',
      async (req, res, next): Promise<void> => {
        try {
          const matches = await matchController.getAllMatches();
          res.status(200);
          res.send(matches);
        } catch (error) {
          next(error);
        }
      },
    );

    this.Router.get(
      '/match/:id',
      async (req, res, next): Promise<void> => {
        try {
          const match = await matchController.findMatchById(req.params.id);
          res.status(200);
          res.send(match);
        } catch (error) {
          next(error);
        }
      },
    );

    this.Router.post(
      '/match/new',
      async (req, res, next): Promise<void> => {
        try {
          const match = {
            namePrincipal: req.body.namePrincipal,
            nameVisitor: req.body.nameVisitor,
            modality: req.body.modality,
            place: req.body.place,
            date: req.body.date,
          };
          await matchController.add(match);
          res.status(200);
          res.send({ message: 'ok' });
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
export default new MatchRoutes().Router;
