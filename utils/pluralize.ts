export default function pluralize(
  singular: string,
  plural: string,
  length: number,
) {
  return length > 1 ? plural : singular;
}
