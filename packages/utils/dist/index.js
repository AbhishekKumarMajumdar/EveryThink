// src/money.ts
var CURRENCY_LOCALE = "en-US";
function formatMoney(value, currency) {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency
  }).format(value);
}
function parseMoney(input) {
  const numeric = parseFloat(input.replace(/[^\d.-]/g, ""));
  if (Number.isNaN(numeric)) {
    throw new Error(`Unable to parse monetary value from "${input}"`);
  }
  return numeric;
}

// src/dates.ts
function formatIsoDate(date) {
  return date.toISOString();
}
function toDayRange(date) {
  const start = new Date(date.getTime());
  start.setHours(0, 0, 0, 0);
  const end = new Date(date.getTime());
  end.setHours(23, 59, 59, 999);
  return { start, end };
}
export {
  formatIsoDate,
  formatMoney,
  parseMoney,
  toDayRange
};
