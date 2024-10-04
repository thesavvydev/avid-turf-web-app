export default function limitStringEllipsis(value: string, length: number) {
  const stringLength = value.length;
  if (stringLength < length) return value;

  const trimmedString = value.substring(0, length);

  return `${trimmedString}...`;
}
