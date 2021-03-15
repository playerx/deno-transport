import { MemoryTransport } from '../memory.transport.ts'
import { assertEquals } from '../../testDeps.ts'

Deno.test('memory.transport - basic example', async () => {
  const transport = new MemoryTransport()

  await transport.init()

  transport.on('PING', async () => 'PONG')

  await transport.start()

  const result = await transport.execute({
    route: 'PING',
    payload: {},
  })

  assertEquals(result, 'PONG', 'Should return PONG')
})
