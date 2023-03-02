import { DateTime } from 'luxon';

export function dateToString(date: string, full = true): string {
  const luxonDate = DateTime.fromISO(date);
  return luxonDate.toLocaleString(
    full ? DateTime.DATETIME_FULL : DateTime.DATE_MED
  );
}
