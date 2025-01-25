import {IOpenApiReference} from "./reference";
import {IOpenApiExternalDocs} from "./external-docs";
import {OpenApiDataFormat, OpenApiDataType} from "./enums";

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
  /**
   * More information https://spec.openapis.org/registry/format/
   */
  format?: keyof typeof OpenApiDataFormat | string;
  default?: any;

  nullable?: true;
  readOnly?: true;
  writeOnly?: true;
  deprecated?: true;

  externalDocs?: IOpenApiExternalDocs
}
