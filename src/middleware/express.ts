import {Response, Router} from 'express';
import {OpenApiService} from '../service';
import {resolve} from "path";
import {IOpenApiV3} from "../openapi";

export interface IOpenApiExpressOptions {
  /**
   * Path of resource.
   * Default is "/api-docs/openapi.json".
   */
  path?: string;

  /**
   * Swagger Definition.
   */
  def?: Pick<IOpenApiV3, 'info' | 'security' | 'externalDocs' | 'tags' | 'components'>;
  schema?: IOpenApiV3;
}

export function openApiSchema(def: Pick<IOpenApiV3, 'info' | 'security' | 'externalDocs' | 'tags' | 'components'>): IOpenApiV3 {
  return OpenApiService.buildV3(def!);
}

export function openApi(options: IOpenApiExpressOptions): Router {
  const {path = '/api-docs/openapi.json', def, schema } = options;
  const {static: content} = require('express');

  if (!schema && !def) {
    throw new Error('openApi requires `def` or `schema`');
  }

  const built = schema ?? OpenApiService.buildV3(def!);

  const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath();

  const root = path.replace(/\.json$/, '');
  const assets = path.replace(/\.json$/, '/assets');
  return Router()
    .get(path, (_: any, response: Response) => response.json(built))
    .use(root, content(resolve(__dirname + '../../../public')))
    .use(assets, content(swaggerUiAssetPath));
}
