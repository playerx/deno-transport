import { MessageMetadata, MetadataReducer } from '../transport.ts'

/**
 * Adds new `createdAt` metadata
 * @param dateNow - function which will return current date representation in string or number
 */
export function createdAtReducer(
  dateNow: () => string | number,
): MetadataReducer<CreatedAtMetadata> {
  const rule: MetadataReducer<CreatedAtMetadata> = _ => ({
    createdAt: dateNow(),
  })

  return rule
}

export type CreatedAtMetadata = MessageMetadata & {
  createdAt: string | number
}
