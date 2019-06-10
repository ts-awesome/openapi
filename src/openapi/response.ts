import {IOpenApiReference} from "./reference";
import {IOpenApiSchema} from "./schema";
import {IOpenApiHeader} from "./header";
import {OpenApiResponseStatusCodes} from "./enums";

export type OpenApiResponseType = 'default' | keyof typeof OpenApiResponseStatusCodes;

export interface IOpenApiResponse {
  description?: string;
  headers?: Record<string, IOpenApiHeader | IOpenApiReference>;
  content?: Partial<Record<OpenApiResponseType, {schema: IOpenApiSchema | IOpenApiReference}>>;
  // links?: Record<string, IOpenApiLink | IOpenApiReference>;
}
