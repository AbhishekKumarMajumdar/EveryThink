const CURRENCY_LOCALE = 'en-US';

export function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency
  }).format(value);
}

export function parseMoney(input: string) {
  const numeric = parseFloat(input.replace(/[^\d.-]/g, ''));
  if (Number.isNaN(numeric)) {
    throw new Error(`Unable to parse monetary value from "${input}"`);
  }
  return numeric;
}


