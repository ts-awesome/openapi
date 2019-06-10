import {
  IOpenApiModelPropertyArgs,
  IOpenApiOperationArgs, IOpenApiParameterArgs,
  IOpenApiPathArgs, IOpenApiRequestBodyArgs,
  IOpenApiSchemaArgs, OpenApiSchemaArgs
} from "./decorators/interfaces";
import {IOpenApiV3} from "./openapi";
import {IOpenApiInfo} from "./openapi/info";
import {OpenApiSecuritySchemaType} from "./openapi/security-schema";
import {IOpenApiExternalDocs} from "./openapi/external-docs";
import {IOpenApiSchema, OpenApiDataType} from "./openapi/schema";
import {IOpenApiReference} from "./openapi/reference";
import {IOpenApiPath} from "./openapi/path";
import {IOpenApiOperation} from "./openapi/operation";
import sha1 = require("sha1");
import {OpenApiResponseStatusCodes} from "./openapi/response";
import {IOpenApiRequestBody} from "./openapi/request-body";
import {IOpenApiParameter, OpenApiParameterLocation} from "./openapi/parameter";

function objectEntities<T = any>(obj: Record<string, T>): Array<[string, T]> {
  return Object.keys(obj).map(key => [key, obj[key]]);
}

function buildObj<T = any>(x: Array<[string, T]>): Record<string, T> {
  return x.reduce((p, [k, v]) => {
    p[k] = v;
    return p
  }, {} as Record<string, T>);
}

function buildRef({name}: Function) {
  return `#/components/schemas/${name}`;
}

function buildType(x: OpenApiDataType | keyof typeof OpenApiDataType | Function | IOpenApiModelPropertyArgs | OpenApiSchemaArgs): IOpenApiSchema | IOpenApiReference {
  if (Array.isArray(x)) {
    return {
      type: OpenApiDataType.array.toString(),
      items: {
        $ref: buildRef(x[0]),
      }
    }
  }

  if (typeof x === 'function') {
    return {
      $ref: buildRef(x)
    }
  }

  if (typeof x === 'string') {
    x = {
      type: x,
    } as IOpenApiModelPropertyArgs;
  }

  const {type, items, format, ...def} = x as IOpenApiModelPropertyArgs;
  if (Array.isArray(type)) {
    return {
      ...def,
      type: OpenApiDataType.array.toString(),
      items: {
        $ref: buildRef(type[0]),
      }
    }
  }

  if (typeof type === 'function') {
    return {
      $ref: buildRef(type)
    }
  }

  return {
    ...def,
    type: type!.toString(),
    format: (format && format.toString()) as (string | undefined),
    items: items ? buildType(items) : undefined,
  }
}

function buildSchemas(
  schemas: Record<string, IOpenApiSchemaArgs>,
  properties: Record<string, Record<string, IOpenApiModelPropertyArgs>>
): Record<string, IOpenApiSchema> {
  return buildObj(
    objectEntities(schemas)
      .map(([key, def]) => {

        return [key, {
          type: OpenApiDataType.object.toString(),
          ...def,
          properties: buildObj(
            objectEntities(properties[key])
              .map(([key, def]) => [key, buildType(def)])
          )
        } as IOpenApiSchema];
      })
  )
}

function convertToContent(def: Record<string, OpenApiSchemaArgs> | Function | [Function]): Record<string, OpenApiSchemaArgs> {
  if (Array.isArray(def) || typeof def === 'function') {
    return  {
      'application/json': def
    }
  }

  return def;
}

function buildBody({schema, ...def}: IOpenApiRequestBodyArgs): IOpenApiRequestBody {
  return {
    ...def,
    content: buildObj(
      objectEntities(convertToContent(schema))
        .map(([key, def]) => [key, {schema: buildType(def)}])
    ),
  }
}

function buildParameters(params: Partial<Record<keyof typeof OpenApiParameterLocation, Record<string, IOpenApiParameterArgs>>>): IOpenApiParameter[] {
  return objectEntities(params)
    .map(([kind, params]) => objectEntities(params!)
        .map(([name, {schema, ...def}]) => ({
          ...def,
          name,
          in: kind as OpenApiParameterLocation,
          schema: buildType(schema as any),
        }))
    )
    .reduce((p, c) => [...p, ...c], []);
}

function buildOperation(operationId: string, {responses, request, ...def}: Omit<IOpenApiOperationArgs, 'path'|'kind'>): IOpenApiOperation {

  const {body = undefined, ...parameters} = request || {};

  return {
    operationId,
    ...def,
    parameters: parameters ? buildParameters(parameters) : undefined,
    requestBody: body ? buildBody(body) : undefined,
    responses: buildObj(
      objectEntities(responses)
        .map(([key, def]) => [
          key,
          {
            description: def!.description || OpenApiResponseStatusCodes[key],
            headers: def!.headers ? buildObj(
              objectEntities(def!.headers!)
                .map(([key, {schema, ...def}]) => [key, {
                  ...def,
                  schema: schema ? buildType(schema) : undefined,
                }])) : undefined,
            content: def!.content ? buildObj(
              objectEntities(convertToContent(def!.content))
                .map(([key, def]) => [key, buildType(def)])) : undefined,
          }
        ])
    )
  }
}

function buildPaths(
  paths: Record<string, IOpenApiSchemaArgs>,
  operations: Record<string, Omit<IOpenApiOperationArgs, 'path'>[]>
): Record<string, IOpenApiPath> {
  return {
    ...buildObj(
      objectEntities(operations)
        .map(([path, defs]) => {

          let pathKey = '/';
          Object.keys(paths)
            .forEach((p) => {
              if (path.startsWith(p) && p.length > pathKey.length) {
                pathKey = p;
              }
            });


          const value: IOpenApiPath = {
            ...paths[pathKey],
            ...buildObj(
              defs.map(({kind, ...def}) => [kind, buildOperation(sha1(`${path}::${kind}`), def)]),
            ),
          };

          return [path, value];
        })
    )
  }
}

class OpenApiServiceImpl {

  private schemas: Record<string, IOpenApiSchemaArgs> = {};
  private properties: Record<string, Record<string, IOpenApiModelPropertyArgs>> = {};
  private paths: Record<string, IOpenApiSchemaArgs> = {};
  private operations: Record<string, Omit<IOpenApiOperationArgs, 'path'>[]> = {};

  public buildV3(
    data: Pick<IOpenApiV3, 'info' | 'security' | 'externalDocs' | 'tags' | 'components'>,
  ): IOpenApiV3 {
    const {components, ...def} = data;
    const {schemas = {}} = components || {};

    return {
      version: "3.0",
      ...def,
      components: {
        ...components,
        schemas: {
          ...schemas,
          ...buildSchemas(this.schemas, this.properties),
        }
      },
      paths: buildPaths(this.paths, this.operations),
    };
  }

  public reset() {
    this.schemas = {};
    this.properties = {};
    this.paths = {};
    this.operations = {};
  }

  public addSchema<TFunction extends Function>(key: string, def: IOpenApiSchemaArgs): this {
    this.schemas[key] = {
      ...this.schemas[key],
      ...def
    };
    return this;
  }

  public addSchemaProperty(model: string, key: string | symbol, def: IOpenApiModelPropertyArgs): this {
    this.properties[model] = {
      ...this.properties[model],
      [key]: def,
    };
    return this;
  }

  public addPath({path, ...def}: IOpenApiPathArgs): this {
    this.paths[path] = {
      ...this.paths[path],
      ...def,
    };
    return this;
  }

  public addOperation(key: string, {path, ...def}: IOpenApiOperationArgs): this {
    this.operations[path] = this.operations[path] || [];

    this.operations[path] = [
      ...this.operations[path],
      def,
    ];
    return this;
  }
}

export const OpenApiService = new OpenApiServiceImpl();
