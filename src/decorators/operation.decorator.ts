import {IOpenApiOperationArgs} from "./interfaces";
import {OpenApiOperationKind} from "../openapi/path";
import {OpenApiService} from "../service";

export function OpenApiOperation(args: IOpenApiOperationArgs): MethodDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    OpenApiService.addOperation(target.constructor.name, args);
  }
}

export function OpenApiOperationGet(args: IOpenApiOperationArgs): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.get});
}

export function OpenApiOperationDelete(args: IOpenApiOperationArgs): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.delete});
}

export function OpenApiOperationHead(args: IOpenApiOperationArgs): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.head});
}

export function OpenApiOperationOptions(args: IOpenApiOperationArgs): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.options});
}

export function OpenApiOperationPatch(args: IOpenApiOperationArgs): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.patch});
}

export function OpenApiOperationPost(args: IOpenApiOperationArgs): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.post});
}

export function OpenApiOperationPut(args: IOpenApiOperationArgs): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.put});
}

export function OpenApiOperationTrace(args: IOpenApiOperationArgs): MethodDecorator {
  return OpenApiOperation({...args, kind: OpenApiOperationKind.trace});
}
