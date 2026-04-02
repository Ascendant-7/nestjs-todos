import { UnauthorizedException } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(() => {
    guard = new ApiKeyGuard();
    delete process.env.API_KEY;
  });

  const testCases = [
    {
      name: 'valid key',
      apiKey: 'itc-123',
      envKey: 'itc-123',
      expected: 'pass'
    },
    {
      name: 'invalid key',
      apiKey: 'itc-456',
      envKey: 'itc-123',
      expected: 'fail'
    },
    {
      name: 'missing env',
      apiKey: 'itc-123',
      envKey: undefined,
      expected: 'fail'
    },
  ];

  test.each(testCases)('Scenario: $name', ({ apiKey, envKey, expected }) => {
    // set environment variable
    if (envKey) {
      process.env.API_KEY = envKey;
    }

    // make mock context
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': apiKey,
          },
        }),
      }),
    };

    // test
    if (expected === 'pass') {
      expect(guard.canActivate(mockContext as any)).toBe(true);
    } else {
      expect(() => guard.canActivate(mockContext as any)).toThrow(UnauthorizedException);
    }
  });
});