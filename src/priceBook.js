'use strict';
// Northside Ice price book (a fictional client, fictional prices).
// A full set is top AND bottom: "6x6" means 6 teeth on top and 6 on the bottom.
// A row is one arch only: "bottom 6" means 6 teeth on the bottom and nothing on top.

const FULL_SETS = {
  honeycomb: { '4x4': 4200, '6x6': 6900, '8x8': 9800 },
  invisible: { '4x4': 6100, '6x6': 9900, '8x8': 15500 },
};

const ROWS = {
  honeycomb: { 4: 2300, 6: 3700, 8: 5200 },
  invisible: { 4: 3300, 6: 5300, 8: 8200 },
};

const STYLES = Object.keys(FULL_SETS);

function fullSetPrice(style, size) {
  return FULL_SETS[style]?.[size] ?? null;
}

function rowPrice(style, teeth) {
  return ROWS[style]?.[teeth] ?? null;
}

module.exports = { STYLES, fullSetPrice, rowPrice };
