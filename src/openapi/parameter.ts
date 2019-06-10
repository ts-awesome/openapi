import {IOpenApiReference} from "./reference";
import {IOpenApiSchema} from "./schema";

export const enum OpenApiParameterLocation {
  query = 'query',
  header = 'header',
  path = 'path',
  cookie = 'cookie',
}

export const enum OpenApiOperationParameterStyle {
  matrix = 'matrix',
  label = 'label',
  form = 'form',
  simple = 'simple',
  spaceDelimited = 'spaceDelimited',
  pipeDelimited = 'pipeDelemited',
  deepObject = 'deepObject',
}

export interface IOpenApiParameter {
  name: string;
  in: keyof typeof OpenApiParameterLocation;
  description?: string;
  required?: true;
  deprecated?: true;
  allowEmptyValue?: true;
  style?: keyof typeof OpenApiOperationParameterStyle;
  explode?: true;
  schema?: IOpenApiSchema | IOpenApiReference;
}
