// https://stackoverflow.com/a/2450976/3837223
const shuffleArray = (input) => {
  const output = [...input]
  let currentIndex = output.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = output[currentIndex];
    output[currentIndex] = output[randomIndex];
    output[randomIndex] = temporaryValue;
  }

  return output;
};

export default shuffleArray;
