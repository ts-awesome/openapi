import 'reflect-metadata';
import {IOpenApiModelPropertyArgs} from "./interfaces";
import {OpenApiService} from "../service";
import {OpenApiDataType} from "../openapi/schema";

export function OpenApiSchemaProperty(args?: IOpenApiModelPropertyArgs): PropertyDecorator {
  return <TFunction extends Function>(target: TFunction, key: string | symbol) => {
    const {name} = Reflect.getMetadata('design:type', target, key);
    const {type = name.toLowerCase() as OpenApiDataType, ...rest} = args || {};
    OpenApiService.addSchemaProperty(target.constructor.name, key, {...rest, type});
  };
}
