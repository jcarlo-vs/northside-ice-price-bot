'use strict';
const { STYLES } = require('./priceBook');

// Reads what the customer wants priced. Any field it can't tell is null.

function parseStyle(text) {
  const t = text.toLowerCase();
  for (const style of STYLES) {
    if (t.includes(style)) return style;
  }
  return null;
}

function parseSize(text) {
  const t = text.toLowerCase();
  const full = t.match(/(\d{1,2})\s*x\s*(\d{1,2})/);
  if (full) return { kind: 'full', size: `${full[1]}x${full[2]}` };
  const bare = t.match(/\b(4|6|8)\b/);
  if (bare) return { kind: 'full', size: `${bare[1]}x${bare[1]}` };
  return { kind: null, size: null };
}

function parseAsk(message, adStyle) {
  return {
    style: parseStyle(message) || adStyle || null,
    ...parseSize(message),
  };
}

module.exports = { parseAsk };
