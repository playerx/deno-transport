import { CallStackMetadata } from '../metadataReducers/callStack.reducer.ts'
import { TransactionMetadata } from '../metadataReducers/transaction.reducer.ts'
import { RecursionCallError } from '../errors/recursion.error.ts'
import { ValidatorMessage } from '../transport.ts'

export function callStackValidator(
  prefixesToCheck: string[] | 'all',
) {
  return (
    msg: ValidatorMessage<CallStackMetadata & TransactionMetadata>,
  ) => {
    const callStack = <string[]>msg.metadata.callStack ?? []

    if (
      callStack.length &&
      (prefixesToCheck === 'all' ||
        prefixesToCheck.some(p => msg.route.startsWith(p))) &&
      callStack.includes(msg.route)
    ) {
      const transactionId = <string>msg.metadata.transactionId

      throw new RecursionCallError(
        transactionId,
        msg.route,
        callStack,
      )
    }
  }
}
