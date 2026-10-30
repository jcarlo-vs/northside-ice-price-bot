'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { reply } = require('../src/bot');

test('prices a full set named in the message', () => {
  const r = reply('how much for 8x8 honeycomb');
  assert.equal(r.action, 'send');
  assert.match(r.text, /\$9,800/);
});

test('uses the ad style when the customer names none', () => {
  const r = reply('how much for 6x6?', { adStyle: 'invisible' });
  assert.equal(r.action, 'send');
  assert.match(r.text, /\$9,900/);
});

test('holds when the size is not in the price book', () => {
  const r = reply('how much for 10x10 honeycomb');
  assert.equal(r.action, 'hold');
  assert.equal(r.reason, 'not_in_price_book');
});

test('holds when there is no style anywhere', () => {
  const r = reply('how much for 6x6');
  assert.equal(r.action, 'hold');
});

test('holds when there is no size', () => {
  const r = reply('how much is honeycomb');
  assert.equal(r.action, 'hold');
});

test('prices one row, not the full set, for "bottom 6" on the honeycomb ad', () => {
  const r = reply('how much for the bottom 6?', { adStyle: 'honeycomb' });
  assert.equal(r.action, 'send');
  assert.match(r.text, /\$3,700/);
});

test('holds when a bare number could mean a row or a full set', () => {
  const r = reply('how much for 6 teeth?', { adStyle: 'honeycomb' });
  assert.equal(r.action, 'hold');
});

test('holds when a message asks for a row and a full set at once', () => {
  const r = reply('how much for the bottom 6? also 8x8 price?', { adStyle: 'honeycomb' });
  assert.equal(r.action, 'hold');
});
