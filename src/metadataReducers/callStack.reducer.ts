import { MessageMetadata, MetadataReducer } from '../transport.ts'

/**
 * Adds new `callStack` metadata
 */
export function callStackReducer(): MetadataReducer<CallStackMetadata> {
  const rule: MetadataReducer<CallStackMetadata> = x => {
    if (x.referrer?.route) {
      const callStack = (
        <string[]>x.referrer.metadata?.callStack ?? []
      ).concat([x.referrer.route])

      return { callStack }
    }

    return { callStack: [] }
  }

  return rule
}

export type CallStackMetadata = MessageMetadata & {
  callStack: string[]
}
