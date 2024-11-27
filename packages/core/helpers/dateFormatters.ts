import { DateTime, DateTimeFormatOptions } from "luxon";

export const formatDate = (date: string, template?: string) => {
  return DateTime.fromISO(date).toFormat(template ?? "d MMM y");
};
