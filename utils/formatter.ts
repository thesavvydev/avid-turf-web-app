export function formatAsPercentage(
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    ...options,
    style: "percent",
  });
}

export function formatAsCompactNumber(
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  return Number(value).toLocaleString(undefined, {
    ...options,
    notation: "compact",
  });
}

export function formatAsCompactCurrency(
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  return Number(value).toLocaleString(undefined, {
    currency: "USD",
    ...options,
    notation: "compact",
    style: "currency",
  });
}

export function formatAsCurrency(
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  return Number(value).toLocaleString(undefined, {
    currency: "USD",
    ...options,
    style: "currency",
  });
}

export function formatAsReadableDate(
  value: string,
  options?: Intl.DateTimeFormatOptions,
) {
  const date = new Date(value);

  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function formatEmptyOrUndefinedWithPlaceholder<T>(
  placeholder = "--",
  value: T,
  formatter: (s: T) => string,
) {
  if (!value || value === "") return placeholder;

  return formatter(value);
}

export function formatMinutesToHoursAndMinutes(minutes: number = 0) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} hrs${remainingMinutes > 0 ? `, ${remainingMinutes} mins` : ""}`;
}
