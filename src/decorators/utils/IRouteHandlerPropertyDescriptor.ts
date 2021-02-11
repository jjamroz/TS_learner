import { RequestHandler } from 'express';

export interface IRouteHandlerPropertyDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}
