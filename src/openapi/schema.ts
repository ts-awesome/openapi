import {IOpenApiReference} from "./reference";
import {IOpenApiExternalDocs} from "./external-docs";

export const enum OpenApiDataFormat {
  int32 = 'int32',
  int64 = 'int64',
  float = 'float',
  double = 'double',
  string = 'string',
  byte = 'byte',
  binary = 'binary',
  boolean = 'boolean',
  date = 'date',
  'date-time' = 'date-time',
  password = 'password',
}

export const enum OpenApiDataType {
  string = 'string',
  number = 'number',
  integer = 'integer',
  boolean = 'boolean',
  object = 'object',
  array = 'array',
}

export interface IOpenApiSchema {
  title?: string;

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

  type: keyof typeof OpenApiDataType | string;
  items?: IOpenApiSchema | IOpenApiReference;
  allOf?: IOpenApiSchema | IOpenApiReference;
  oneOf?: IOpenApiSchema | IOpenApiReference;
  anyOf?: IOpenApiSchema | IOpenApiReference;
  not?: IOpenApiSchema | IOpenApiReference;
  additionalProperties?: true | IOpenApiSchema | IOpenApiReference;
  properties?: Record<string, IOpenApiSchema | IOpenApiReference>;
  description?: string;
  format?: keyof typeof OpenApiDataFormat | string;
  default?: any;

  nullable?: true;
  readOnly?: true;
  writeOnly?: true;
  deprecated?: true;

  externalDocs?: IOpenApiExternalDocs
}
