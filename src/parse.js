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
  // A row is one arch: "bottom 6" or "6 on the bottom". Both arches named
  // without an NxN size is unclear, so it holds. So is one arch plus an NxN
  // size ("bottom 6x6"): it could mean either.
  const hasTop = /\btop\b/.test(t);
  const hasBottom = /\bbottom\b/.test(t);
  const oneArch = hasTop !== hasBottom;
  if (full && !oneArch) return { kind: 'full', size: `${full[1]}x${full[2]}` };
  if (!full && oneArch) {
    const row = t.match(/\b(?:top|bottom)\s+(\d{1,2})\b|\b(\d{1,2})\s+(?:on\s+(?:the\s+)?)?(?:top|bottom)\b/);
    if (row) return { kind: 'row', position: hasTop ? 'top' : 'bottom', teeth: Number(row[1] ?? row[2]) };
  }
  // A bare number ("6 teeth") could be a row or a full set. Never guess.
  return { kind: null, size: null };
}

function parseAsk(message, adStyle) {
  return {
    style: parseStyle(message) || adStyle || null,
    ...parseSize(message),
  };
}

module.exports = { parseAsk };
