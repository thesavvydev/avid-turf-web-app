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
