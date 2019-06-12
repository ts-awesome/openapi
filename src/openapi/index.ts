import {IOpenApiInfo} from "./info";
import {IOpenApiServer} from "./server";
import {IOpenApiPath} from "./path";
import {IOpenApiReference} from "./reference";
import {IOpenApiParameter} from "./parameter";
import {IOpenApiResponse, OpenApiResponseType} from "./response";
import {IOpenApiRequestBody} from "./request-body";
import {IOpenApiSecurityScheme} from "./security-scheme";
import {IOpenApiHeader} from "./header";
import {IOpenApiExternalDocs} from "./external-docs";
import {IOpenApiSchema} from "./schema";
import {OpenApiSecuritySchemeType} from "./enums";

export * from './enums';

export interface IOpenApiV3 {
  openapi: "3.0.0";
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
    securitySchemes?: Record<string, IOpenApiSecurityScheme | IOpenApiReference>;
    // links?: Record<string, IOpenApiLink | IOpenApiReference>;
    callbacks?: Record<string, Record<string, IOpenApiPath> | IOpenApiReference>;
  };
  security?: Partial<Record<keyof typeof OpenApiSecuritySchemeType, string[]>>;
  tags?: string[];
  externalDocs?: IOpenApiExternalDocs;
}
