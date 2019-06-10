import {IOpenApiReference} from "./reference";
import {IOpenApiSchema} from "./schema";
import {OpenApiOperationParameterStyle, OpenApiParameterLocation} from "./enums";

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
