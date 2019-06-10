import {IOpenApiSchemaArgs} from "./interfaces";
import {OpenApiService} from "../service";

export function OpenApiSchema(args?: IOpenApiSchemaArgs): ClassDecorator {
  return <TFunction extends Function>({name}: TFunction) => {
    OpenApiService.addSchema(name, args || {});
  }
}
