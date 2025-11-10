export function formatIsoDate(date: Date) {
  return date.toISOString();
}

export function toDayRange(date: Date) {
  const start = new Date(date.getTime());
  start.setHours(0, 0, 0, 0);

  const end = new Date(date.getTime());
  end.setHours(23, 59, 59, 999);

  return { start, end };
}


