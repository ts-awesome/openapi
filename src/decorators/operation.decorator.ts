import {IOpenApiOperationArgs} from "./interfaces";
import {OpenApiOperationKind} from "../openapi";
import {OpenApiService} from "../service";

export function OpenApiOperation(args: IOpenApiOperationArgs): MethodDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    OpenApiService.addOperation(target.constructor.name, args);
  }
}

export function OpenApiOperationGet(args: Omit<IOpenApiOperationArgs, 'kind'>): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.get});
}

export function OpenApiOperationDelete(args: Omit<IOpenApiOperationArgs, 'kind'>): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.delete});
}

export function OpenApiOperationHead(args: Omit<IOpenApiOperationArgs, 'kind'>): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.head});
}

export function OpenApiOperationOptions(args: Omit<IOpenApiOperationArgs, 'kind'>): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.options});
}

export function OpenApiOperationPatch(args: Omit<IOpenApiOperationArgs, 'kind'>): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.patch});
}

export function OpenApiOperationPost(args: Omit<IOpenApiOperationArgs, 'kind'>): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.post});
}

export function OpenApiOperationPut(args: Omit<IOpenApiOperationArgs, 'kind'>): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.put});
}

export function OpenApiOperationTrace(args: Omit<IOpenApiOperationArgs, 'kind'>): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.trace});
}
