import {IOpenApiServer} from "./server";
import {IOpenApiReference} from "./reference";
import {IOpenApiOperation} from "./operation";
import {IOpenApiParameter} from "./parameter";
import {OpenApiOperationKind} from "./enums";

export interface IOpenApiPath extends Partial<IOpenApiReference>, Partial<Record<keyof typeof OpenApiOperationKind, IOpenApiOperation>>{
  summary?: string;
  description?: string;
  servers?: IOpenApiServer[];
  parameters?: (IOpenApiParameter | IOpenApiReference)[];
}
