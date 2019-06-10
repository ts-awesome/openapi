import {IOpenApiReference} from "./reference";
import {IOpenApiParameter} from "./parameter";
import {IOpenApiExternalDocs} from "./external-docs";
import {IOpenApiRequestBody} from "./request-body";
import {IOpenApiResponse} from "./response";
import {IOpenApiPath} from "./path";
import {IOpenApiServer} from "./server";
import {OpenApiSecuritySchemeType} from "./enums";
import {IOpenApiSecuritySettings} from "./security-scheme";

export interface IOpenApiOperation {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: IOpenApiExternalDocs;
  operationId?: string;
  parameters?: (IOpenApiParameter | IOpenApiReference)[];
  requestBody?: IOpenApiRequestBody | IOpenApiReference;
  responses: Record<string, IOpenApiResponse | IOpenApiReference>;
  callbacks?: Record<string, Record<string, IOpenApiPath> | IOpenApiReference>;
  deprecated?: true;
  security?: IOpenApiSecuritySettings;
  servers?: IOpenApiServer[];
}
