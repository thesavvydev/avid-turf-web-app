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
  return Number(value).toLocaleString(undefined, { notation: "compact" });
}
