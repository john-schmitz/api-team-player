import { Request, Response, NextFunction } from 'express';
import matchController from './matchController';

export default [
  {
    method: 'get',
    path: '/match',
    handler: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const matches = await matchController.getAllMatches();
        res.status(200);
        res.send(matches);
      } catch (error) {
        next(error);
      }
    },
  },
  {
    method: 'get',
    path: '/match/:id',
    handler: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const match = await matchController.findMatchById(req.params.id);
        res.status(200);
        res.send(match);
      } catch (error) {
        next(error);
      }
    },
  },
  {
    method: 'post',
    path: '/match/new',
    handler: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const match = {
          modality: req.body.modality,
          place: req.body.place,
          namePrincipal: req.body.namePrincipal,
          nameVisitor: req.body.nameVisitor,
          date: new Date(),
        };
        await matchController.add(match);
        res.status(200);
        res.send({ message: 'ok' });
      } catch (error) {
        next(error);
      }
    },
  },
];
