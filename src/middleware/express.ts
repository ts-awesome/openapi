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
  info: Pick<IOpenApiV3, 'info' | 'security' | 'externalDocs'>;
}

export function openApi(options: IOpenApiExpressOptions): Router {
  const {path = '/api-docs/openapi.json', info } = options;
  const {static: content} = require('express');

  return Router()
    .get(path, (_: any, response: Response) => response.json(OpenApiService.buildV3(info)))
    .use(path.replace(/\.json$/, '')
      , content(resolve(__dirname + '../../../../public')))
    .use(path.replace(/\.json$/, '/assets')
      , content(require.resolve('swagger-ui-dist').replace('index.js', '')));
}
