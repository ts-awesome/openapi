import {OpenApiDataType, OpenApiDataFormat, OpenApiParameterLocation, OpenApiOperationKind} from "../openapi";
import {IOpenApiExternalDocs} from "../openapi/external-docs";
import {IOpenApiParameter, } from "../openapi/parameter";
import {IOpenApiRequestBody} from "../openapi/request-body";
import {IOpenApiHeader} from "../openapi/header";
import {OpenApiResponseType} from "../openapi/response";
import {IOpenApiSecuritySettings} from "../openapi/security-scheme";

export interface IOpenApiTypeArgs {
  title?: string;
  description?: string;

  type: OpenApiDataType | keyof typeof OpenApiDataType | Function | [Function] | string;
  items?: OpenApiDataType | keyof typeof OpenApiDataType | Function | IOpenApiTypeArgs;
  format?: OpenApiDataFormat | keyof typeof OpenApiDataFormat | string;
  default?: any;

  nullable?: true;
  readOnly?: true;
  writeOnly?: true;
  deprecated?: true;

  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: number;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: string[];

  externalDocs?: IOpenApiExternalDocs
}

export type OpenApiSchemaArgs = Function | [Function] | IOpenApiModelPropertyArgs;

export interface IOpenApiParameterArgs extends Omit<IOpenApiParameter, 'schema'|'name'|'in'> {
  schema?: OpenApiSchemaArgs | IOpenApiTypeArgs;
}

export interface IOpenApiParametersArgs extends Partial<Record<keyof typeof OpenApiParameterLocation, Record<string, IOpenApiParameterArgs>>> {
  body?: IOpenApiRequestBodyArgs;
}

export interface IOpenApiRequestBodyArgs extends Omit<IOpenApiRequestBody, 'content'> {
  schema: Function | [Function] | Record<string, OpenApiSchemaArgs>;
}

export interface IOpenApiHeaderArgs extends Omit<IOpenApiHeader, 'schema'> {
  schema?: OpenApiSchemaArgs
}

export interface IOpenApiResponseArgs {
  description?: string;
  headers?: Record<string, IOpenApiHeaderArgs>;
  content?: Record<string, OpenApiSchemaArgs> | Function | [Function];
}

export interface IOpenApiOperationArgs {
  path: string;
  kind: OpenApiOperationKind | keyof typeof OpenApiOperationKind;
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: IOpenApiExternalDocs;
  request?: IOpenApiParametersArgs;
  responses: Partial<Record<OpenApiResponseType, IOpenApiResponseArgs>>;
  callbacks?: Record<string, {$ref: string}>;
  deprecated?: true;
  security?: IOpenApiSecuritySettings;
}

export interface IOpenApiSchemaArgs {
  description?: string;
  title?: string;
  additionalProperties?: true | Function;

  externalDocs?: {
    description?: string;
    url: string;
  }
}

export interface IOpenApiPathArgs {
  path: string;
  tag: string;
  summary?: string;
  description?: string;
  parameters?: Partial<Record<keyof typeof OpenApiParameterLocation, Record<string, IOpenApiParameterArgs>>>;
  security?: IOpenApiSecuritySettings;
}

export interface IOpenApiModelPropertyArgs extends Omit<IOpenApiTypeArgs, 'type'|'items'> {
  type?: OpenApiDataType | keyof typeof OpenApiDataType | Function | [Function];
  items?: OpenApiDataType | keyof typeof OpenApiDataType | Function | IOpenApiModelPropertyArgs;
}
