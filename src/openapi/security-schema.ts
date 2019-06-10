import {OpenApiParameterLocation} from "./parameter";

export const enum OpenApiSecuritySchemaType {
  apiKey,
  http,
  oauth2,
  openIdConnect,
}

export interface IOpenApiApiKeySecuritySchema {
  type: keyof OpenApiSecuritySchemaType.apiKey;
  description?: string;
  name: string;
  in: Exclude<keyof OpenApiParameterLocation, 'path'>;
}

export const enum OpenApiHttpSecuritySchema {
  Basic = 'Basic',
  Bearer = 'Bearer',
  Digest = 'Digest',
  OAuth = 'OAuth',
}

export interface IOpenApiHttpSecuritySchema {
  type: keyof OpenApiSecuritySchemaType.http;
  description?: string;
  scheme: keyof typeof OpenApiHttpSecuritySchema;
  bearerFormat?: string;
}

export interface IOpenApiOauth2SecuritySchema {
  type: keyof OpenApiSecuritySchemaType.oauth2;
  description?: string;
  flows: any;
}

export interface IOpenApiOpenIdConnectSecuritySchema {
  type: keyof OpenApiSecuritySchemaType.openIdConnect;
  description?: string;
  openIdConnectUrl: string;
}

export type IOpenApiSecuritySchema = IOpenApiApiKeySecuritySchema
  | IOpenApiHttpSecuritySchema
  | IOpenApiOauth2SecuritySchema
  | IOpenApiOpenIdConnectSecuritySchema;

export type IOpenApiSecuritySettings = Partial<Record<keyof typeof OpenApiSecuritySchemaType, any[]>>;
