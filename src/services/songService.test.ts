import { test } from 'node:test';
import assert from 'node:assert/strict';
import { songService } from './songService';

test('songService queries tracks and returns structured SpotApi response', async () => {
  const result = await songService.query_songs('Weezer', 5);
  assert.ok(result);
  assert.ok(result.data);
  assert.ok(result.data.searchV2);
  assert.ok(Array.isArray(result.data.searchV2.tracksV2.items));
  assert.ok(result.data.searchV2.tracksV2.items.length > 0);
  const firstItem = result.data.searchV2.tracksV2.items[0];
  assert.ok(firstItem.item.data.name);
});

test('songService handles empty query string gracefully with empty payload', async () => {
  const result = await songService.query_songs('', 5);
  assert.equal(result.data.searchV2.tracksV2.totalCount, 0);
  assert.equal(result.data.searchV2.tracksV2.items.length, 0);
});

test('songService retrieves audio details and cover art for known tracks', async () => {
  const details = await songService.getTrackAudioDetails('Buddy Holly', 'Weezer');
  assert.ok(details);
  assert.ok(typeof details === 'object');
});
