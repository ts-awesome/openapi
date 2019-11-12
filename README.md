# ts-openapi

OpenApi provider and UI, build as an helper for `@viatsyshyn/ts-rest`

```bash
npm install --save @viatsyshyn/ts-openapi
#or
yarn add @viatsyshyn/ts-openapi
```

### `routes/param.definitions.ts`

```ts
export const SORT: IOpenApiParameterArgs = {
  description: `Sort pattern`,
  schema: {
    type: OpenApiDataType.string,
  }
};

export const OFFSET: IOpenApiParameterArgs = {
  description: `Offset`,
  schema: {
    type: OpenApiDataType.integer,
    minimum: 0,
  }
};

export const LIMIT: IOpenApiParameterArgs = {
  description: `Limit`,
  schema: {
    type: OpenApiDataType.integer,
    minimum: 1,
    maximum: 100,
  }
};

export const COUNT_ONLY: IOpenApiParameterArgs = {
  description: `Get total count`,
  schema: {
    type: OpenApiDataType.boolean,
  },
};

export const UID: IOpenApiParameterArgs = {
  description: 'UUID',
  required: true,
  schema: {
    type: OpenApiDataType.string,
    format: 'uuid',
  }
};

```

### `routes/v1/device/get-device.route.ts`

```ts
export class GetDeviceRoute {

  @OpenApiOperationGet({
    path: '/api/v1/device/{uid}',
    description: `Get device`,
    summary: `Get device`,
    request: {
      path: {
        uid: UID,
      },
      query: {
        sort: SORT,
        offset: OFFSET,
        limit: LIMIT,
        count: COUNT_ONLY,
      }
    },
    responses: {
      200: {content: DeviceResponseModel}
    }
  })
  public handle() {}
}
```

### `routes/v1/device/index.ts`

```ts

export * from './get-device.route';

OpenApiPath({
  path: '/api/v1/device',
  tag: 'Device',
  security: [{ BearerAuth: [] }]
});

```

### part of Application setup routine

```ts
app.use(openApi({
    def: {
      info: {
        title: 'My API',
        version: '1.0.0'
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: OpenApiHttpSecurityScheme.bearer,
            bearerFormat: 'JWT',
          }
        }
      },
    }
}));
```
