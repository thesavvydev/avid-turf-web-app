export default function getInitials(word: string) {
  const [firstWord = "", secondWord = ""] = word.split(" ") ?? "";
  const [firstInitial] = firstWord.split("");
  const [secondInitial] = secondWord.split("");

  return `${firstInitial}${secondInitial}`;
}
