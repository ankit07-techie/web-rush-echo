import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cn } from './utils';

test('cn merges tailwind utility classes cleanly and resolves conflicts', () => {
  const result = cn('px-2 py-1', 'px-4', { 'text-red-500': true, 'text-blue-500': false });
  assert.equal(result, 'py-1 px-4 text-red-500');
});
