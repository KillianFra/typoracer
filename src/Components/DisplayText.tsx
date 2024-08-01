import words from "../Utils/words";

export default function DisplayText() {
  function getRandomWordsFromFile(number: number = 50) {
    let selectedList = [];
    for (let i = 0; i < number; i++) {
      const rnd = Math.floor(Math.random() * words.length);
      selectedList.push(words[rnd]);
    }
    return selectedList;
  }

  const wordsList = getRandomWordsFromFile();
  return (
    <div className="flex flex-wrap mx-20 w-9/12 h-1/3 text-3xl font-bold text-slate-200">
      {wordsList
        ? wordsList.map((word, index) => {
            return (
              <span className="w-auto mx-1" key={index}>
                {word}
              </span>
            );
          })
        : ""}
    </div>
  );
}
