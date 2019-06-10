import { Router, Request, Response, NextFunction } from 'express';
import { ValidationChain } from 'express-validator/check';
type Wrapper = (router: Router) => void;

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router): void => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void | Response> | void | Response;

interface Route {
  path: string;
  method: string;
  validation?: ValidationChain[];
  handler: Handler | Handler[];
}

export const applyRoutes = (routes: Route[], router: Router): void => {
  for (const route of routes) {
    const { method, path, handler, validation } = route;
    if (validation) (router as any)[method](path, validation, handler);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    else (router as any)[method](path, handler);
  }
};
