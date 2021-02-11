import 'reflect-metadata';
import { Methods } from './utils/Methods';
import { MetadataKeys } from './utils/MetadataKeys';
import { IRouteHandlerPropertyDescriptor } from './utils/IRouteHandlerPropertyDescriptor';

function routeBinder(method: string) {
  return function (path: string) {
    return function (
      target: any,
      key: string,
      desc: IRouteHandlerPropertyDescriptor
    ) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
