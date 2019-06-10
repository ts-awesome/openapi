import {IOpenApiSchema} from "./schema";
import {IOpenApiReference} from "./reference";

export interface IOpenApiRequestBody {
  description?: string;
  content: Record<string, {schema: IOpenApiSchema | IOpenApiReference}>;
  required?: true;
}
