import words from "./words";

export function getRandomWordsFromFile(number: number = 50): string[] {
    let selectedList: string[] = [];
    for (let i = 0; i < number; i++) {
      const rnd = Math.floor(Math.random() * words.length);
      const word = words[rnd];
      selectedList.push(String(word)); // Cast to string
    }
    return selectedList;
  }