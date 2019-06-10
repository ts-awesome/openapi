import {IOpenApiServer} from "./server";
import {IOpenApiReference} from "./reference";
import {IOpenApiOperation} from "./operation";
import {IOpenApiParameter} from "./parameter";

export const enum OpenApiOperationKind {
  get = 'get',
  put = 'put',
  post = 'post',
  delete = 'delete',
  options = 'options',
  head = 'head',
  patch = 'patch',
  trace = 'trace',
}

export interface IOpenApiPath extends Partial<IOpenApiReference>, Partial<Record<keyof typeof OpenApiOperationKind, IOpenApiOperation>>{
  summary?: string;
  description?: string;
  servers?: IOpenApiServer[];
  parameters?: (IOpenApiParameter | IOpenApiReference)[];
}
