import {OpenApiHttpSecurityScheme, OpenApiParameterLocation, OpenApiSecuritySchemeType} from "./enums";

export interface IOpenApiApiKeySecurityScheme {
  type: 'apiKey';
  description?: string;
  name: string;
  in: Exclude<keyof typeof OpenApiParameterLocation, 'path'>;
}

export interface IOpenApiHttpSecurityScheme {
  type: 'http';
  description?: string;
  scheme: keyof typeof OpenApiHttpSecurityScheme;
  bearerFormat?: string;
}

export interface IOpenApiOauth2SecuritySchema {
  type: 'oauth2';
  description?: string;
  flows: any;
}

export interface IOpenApiOpenIdConnectSecurityScheme {
  type: 'openIdConnect';
  description?: string;
  openIdConnectUrl: string;
}

export type IOpenApiSecurityScheme = IOpenApiApiKeySecurityScheme
  | IOpenApiHttpSecurityScheme
  | IOpenApiOauth2SecuritySchema
  | IOpenApiOpenIdConnectSecurityScheme;

export type IOpenApiSecuritySettings = Partial<Record<string, any[]>>[];
