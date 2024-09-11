export function isValidEmailInput(input: string) {
  if (input === "") return false;
  return !input.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
}
