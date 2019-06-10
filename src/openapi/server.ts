export interface IOpenApiServerVariable {
  enum?: string[];
  default: string;
  description?: string;
}

export interface IOpenApiServer {
  url: string;
  description?: string;
  variables?: Record<string, IOpenApiServerVariable>;
}
