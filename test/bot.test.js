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
