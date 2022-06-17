import 'reflect-metadata';

import {IOpenApiModelPropertyArgs} from "./interfaces";
import {OpenApiService} from "../service";
import {OpenApiDataType} from "../openapi";

export function OpenApiSchemaProperty(args?: IOpenApiModelPropertyArgs): PropertyDecorator {
  return <TFunction extends Function>(target: TFunction, key: string | symbol) => {
    // @ts-ignore
    const {name} = Reflect.getMetadata('design:type', target, key) ?? Object;
    const {type = name.toLowerCase() as OpenApiDataType, ...rest} = args || {};
    OpenApiService.addSchemaProperty(target.constructor.name, key, {...rest, type});
  };
}
