import { MessageMetadata, MetadataReducer } from '../transport.ts'

/**
 * Adds new `transactionId` metadata
 * @param newId - function which will always return unique string
 */
export function transactionReducer(
  newId: () => string,
  dateNow: () => string | number,
): MetadataReducer<TransactionMetadata> {
  const rule: MetadataReducer<TransactionMetadata> = (
    x,
  ): TransactionMetadata => ({
    transactionId: x.referrer?.metadata?.transactionId ?? newId(),
    transactionStartedAt:
      x.referrer?.metadata?.transactionStartedAt ?? dateNow(),
  })

  return rule
}

export type TransactionMetadata = MessageMetadata & {
  transactionId: string
  transactionStartedAt: string | number
}
