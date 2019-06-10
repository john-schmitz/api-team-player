import { Request, Response, NextFunction } from 'express';
import matchController from './matchController';
import { check, validationResult, body } from 'express-validator/check';
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
    validation: [
      check('modality').exists(),
      check('place').exists(),
      check('namePrincipal').exists(),
      check('nameVisitor').exists(),
      check('date').exists()
    ],
    method: 'post',
    path: '/match/new',
    handler: async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const match = {
          modality: req.body.modality,
          place: req.body.place,
          namePrincipal: req.body.namePrincipal,
          nameVisitor: req.body.nameVisitor,
          date: new Date(req.body.date),
        };
        await matchController.add(match);
        return res.status(200).send({ message: 'ok' });
      } catch (error) {
        next(error);
      }
    },
  },
];
