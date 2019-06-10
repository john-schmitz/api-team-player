import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator/check';
import updateController from './updateController';

export default [
  {
    validation: [check('scorePrincipal').isNumeric(), check('scoreVisitor').isNumeric(), check('id').isUUID()],
    method: 'post',
    path: '/match/update',
    handler: async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const update = {
          scorePrincipal: req.body.scorePrincipal,
          scoreVisitor: req.body.scoreVisitor,
          action: {
            type: req.body.action.type,
            text: req.body.action.text,
          },
        };
        await updateController.add(update, req.body.id);
        res.send({ message: 'ok' });
      } catch (error) {
        next(error);
      }
    },
  },
];
