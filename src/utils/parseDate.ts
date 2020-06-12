export function parseDate(date: Date) {
  const [year, month, day, hour, minute, second, millisecond] = date
    .toISOString()
    .split(/[^0-9]/)
    .slice(0, -1);

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  };
}
