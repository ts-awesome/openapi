# @ts-awesome/openapi

[OpenApi](https://www.openapis.org/) provider and 
[UI](https://github.com/swagger-api/swagger-ui). 
Schema is collected from decorators.

Library is an extension for [@ts-awesome/rest](https://github.com/ts-awesome/rest)

### Common params declarations

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

### Sample endpoint decorator 

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

### Declare endpoints group

```ts
export * from './get-device.route';

OpenApiPath({
  path: '/api/v1/device',
  tag: 'Device',
  security: [{ BearerAuth: [] }]
});

```

### Sample use with express

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

# License
May be freely distributed under the [MIT license](https://opensource.org/licenses/MIT).

Copyright (c) 2022 Volodymyr Iatsyshyn and other contributors
