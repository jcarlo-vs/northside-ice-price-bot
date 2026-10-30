'use strict';
const { fullSetPrice, rowPrice } = require('./priceBook');
const { parseAsk } = require('./parse');

// Decides the bot's reply to a price question.
// The rule over everything: never guess a price. If we can't price exactly
// what the customer asked for, hold the message for a person.

function reply(message, context = {}) {
  const ask = parseAsk(message, context.adStyle);
  if (!ask.style || !ask.kind) return hold('missing_style_or_size', ask);

  const price = ask.kind === 'full'
    ? fullSetPrice(ask.style, ask.size)
    : rowPrice(ask.style, ask.teeth);
  if (price == null) return hold('not_in_price_book', ask);

  const what = ask.kind === 'full'
    ? `${ask.size} ${ask.style} set`
    : `${ask.position} ${ask.teeth} ${ask.style}`;
  return { action: 'send', text: `The ${what} is $${price.toLocaleString('en-US')}.` };
}

function hold(reason, ask) {
  return { action: 'hold', reason, ask };
}

module.exports = { reply };
