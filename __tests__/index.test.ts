/**
 * Unit tests for the action's entrypoint, src/index.ts
 */

import * as generate from '../src/generate'

// Mock the action's entrypoint
const runMock = jest.spyOn(generate, 'run').mockImplementation()

describe('index', () => {
  it('calls run when imported', async () => {
    require('../src/index')

    expect(runMock).toHaveBeenCalled()
  })
})
