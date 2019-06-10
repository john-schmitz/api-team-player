import { Request, Response, NextFunction } from 'express';
import userController from './userController';
import { GetUserAuthInfoRequest } from '../../utils/requests';
import { check, validationResult, body } from 'express-validator/check';
import userRepository from './userRepository';
import { HTTP401Error } from '../../utils/httpErrors';

export default [
  {
    validation: [
      check('email')
        .isEmail()
        .exists(),
      check('password')
        .isLength({ min: 5 })
        .exists(),
      check('name')
        .isString()
        .exists(),
      body('email').custom(
        (value): any => {
          return userRepository.findUserByEmail(value).then(
            (user): any => {
              if (user) {
                return Promise.reject('E-mail already in use');
              }
            },
          );
        },
      ),
      body('passwordConfirmation').custom(
        (value, { req }): boolean => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
          }
          return true;
        },
      ),
    ],
    method: 'post',
    path: '/register',
    handler: async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        await userController.add(req.body);
        return res.status(200).json({ message: 'ok' });
      } catch (error) {
        next(error);
      }
    },
  },

  {
    validation: [
      check('email')
        .isEmail()
        .exists(),
      check('password')
        .isLength({ min: 5 })
        .exists(),
    ],
    method: 'post',
    path: '/user/authenticate',
    handler: async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const user = await userController.authenticate(req.body.email, req.body.password);
        if (user) {
          return res.status(200).json(user);
        } else {
          throw new HTTP401Error('Email or password is incorrect');
        }
      } catch (error) {
        next(error);
      }
    },
  },
  {
    validation: [check('id').isUUID()],
    method: 'post',
    path: '/user/follow/match',
    handler: async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
      try {
        await userController.followMatch(req.user.sub, req.body.id);
        res.status(200);
        res.send({ message: 'ok' });
      } catch (error) {
        next(error);
      }
    },
  },
  {
    method: 'get',
    path: '/user/feed',
    handler: async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction): Promise<void> => {
      try {
        res.status(200).send(await userController.getFeed(req.user.sub));
      } catch (error) {
        next(error);
      }
    },
  },
];
