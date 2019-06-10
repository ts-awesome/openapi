import {IOpenApiPathArgs} from "./interfaces";
import {OpenApiService} from "../service";

export function OpenApiPath(args: IOpenApiPathArgs): ClassDecorator {
  OpenApiService.addPath(args);
  return <TFunction extends Function>(target: TFunction) => target;
}
