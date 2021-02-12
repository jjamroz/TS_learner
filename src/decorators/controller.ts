import 'reflect-metadata';
import { Methods } from './utils/Methods';
import { AppRouter } from '../AppRouter';
import { MetadataKeys } from './utils/MetadataKeys';
import { NextFunction, RequestHandler, Request, Response } from 'express';

function bodyValidator(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }
    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.required, target.prototype, key) || [];

      const validator = bodyValidator(requiredBodyProps);

      if (path) {
        console.log(`registering ${method}: ${routePrefix}${path}`);
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
