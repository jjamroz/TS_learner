import 'reflect-metadata';
import { MetadataKeys } from './utils/MetadataKeys';
import { IRouteHandlerPropertyDescriptor } from './utils/IRouteHandlerPropertyDescriptor';

export function required(...keys: string[]) {
  return function (
    target: any,
    key: string,
    desc: IRouteHandlerPropertyDescriptor
  ) {
    Reflect.defineMetadata(MetadataKeys.required, keys, target, key);
  };
}
