import { MessageMetadata, Transport } from '../transport.ts'
import {
  Api,
  ApiWithExecutableKeys,
  TransportApi,
  ExecutableApi,
  TransportApiOptions,
} from './types.ts'
import { recursiveApiCaller } from './recursiveApiCaller.ts'

export function createTransportApi<
  TApi extends ApiWithExecutableKeys
>(
  transport: Transport,
  options?: {
    joinSymbol?: string
  },
  referrer?: {
    route: string
    metadata: MessageMetadata
  },
): TransportApi<TApi['api'], TApi['executableKeys']> {
  const { joinSymbol = '.' } = options ?? {}

  return <any>{
    execute: transportApi(transport, {
      mode: 'EXECUTE',
      joinSymbol,
      referrer,
    }),
    publish: transportApi(transport, {
      mode: 'PUBLISH',
      joinSymbol,
      referrer,
    }),
  }
}

function transportApi<TApi extends Api>(
  transport: Transport,
  options?: TransportApiOptions,
): ExecutableApi<TApi> {
  const { joinSymbol = '.' } = options ?? {}

  return <any>recursiveApiCaller(transport, <any>{
    ...options,
    joinSymbol,
  })
}
