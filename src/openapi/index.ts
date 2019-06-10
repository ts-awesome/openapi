import {IOpenApiInfo} from "./info";
import {IOpenApiServer} from "./server";
import {IOpenApiPath} from "./path";
import {IOpenApiReference} from "./reference";
import {IOpenApiParameter} from "./parameter";
import {IOpenApiResponse} from "./response";
import {IOpenApiRequestBody} from "./request-body";
import {IOpenApiSecuritySchema, OpenApiSecuritySchemaType} from "./security-schema";
import {IOpenApiHeader} from "./header";
import {IOpenApiExternalDocs} from "./external-docs";
import {IOpenApiSchema} from "./schema";

export interface IOpenApiV3 {
  version: "3.0";
  info: IOpenApiInfo;
  servers?: IOpenApiServer[];
  paths: Record<string, IOpenApiPath>;
  components?: {
    schemas?: Record<string, IOpenApiSchema | IOpenApiReference>;
    responses?: Record<string, IOpenApiResponse | IOpenApiReference>;
    parameters?: Record<string, IOpenApiParameter | IOpenApiReference>;
    // examples?: Record<string, IOpenApiExample | IOpenApiReference>;
    requestBodies?: Record<string, IOpenApiRequestBody | IOpenApiReference>;
    headers?: Record<string, IOpenApiHeader | IOpenApiReference>;
    securitySchemes?: Record<string, IOpenApiSecuritySchema | IOpenApiReference>;
    // links?: Record<string, IOpenApiLink | IOpenApiReference>;
    callbacks?: Record<string, Record<string, IOpenApiPath> | IOpenApiReference>;
  };
  security?: Partial<Record<keyof typeof OpenApiSecuritySchemaType, string[]>>;
  tags?: string[];
  externalDocs?: IOpenApiExternalDocs;
}
