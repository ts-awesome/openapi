import {OpenApiOperationParameterStyle} from "./enums";
import {IOpenApiSchema} from "./schema";
import {IOpenApiReference} from "./reference";

export interface IOpenApiHeader {
  description?: string;
  required?: true;
  deprecated?: true;
  allowEmptyValue?: true;
  style?: keyof typeof OpenApiOperationParameterStyle;
  explode?: true;
  schema?: IOpenApiSchema | IOpenApiReference;
}
