import { cities } from './data.js';
import { getDistanceAndDirection } from './geo.js';

let BULLSEYE = Math.floor(Math.random() * cities.length);
const GUESS_INPUT = document.querySelector("input[id='hy']");

window.onload = () => {
  document.querySelector("#city")
    .setAttribute("src", `static/geo/${cities[BULLSEYE].code}.svg`);
}

horsey(GUESS_INPUT, { source: [{ list: cities.map(c => c.name) }], limit: 5 });

let maxGuesses = 6;
let initialGuesses = maxGuesses;

const processGuess = (e) => {
  const city = e.target.value;
  if (e.key != "Enter" || city === '')
    return;

  const guess = cities.filter(c => city === c.name)[0];
  const target = cities[BULLSEYE];

  if (guess === undefined)
    return;

  if (guess === target) {
    addTry(city, "false");
    finishGuessBox("Dope ass job! Ya got it right buddy!");
    return;
  }

  if (guess !== target) {
    const [distance, direction] = getDistanceAndDirection(guess, target);
    const msg = `${city} (${direction} ${distance.toFixed(2)} micro meters)`;

    addTry(msg, "true");
    --maxGuesses;

    GUESS_INPUT.setAttribute("placeholder",
        `You got ${maxGuesses} guesse(s), buddy.`);
    GUESS_INPUT.value = "";
  }

  if (e.which === 13) {
    let isValidGuess = true;
    maxGuesses--;

    if (maxGuesses == 0) {
      finishGuessBox(`The wright country is: ${target.name}.`);
    }
  }
}

const addTry = (msg, isInvalid) => {
  const item = document.createElement("input");
  item.setAttribute("type", "text");
  item.setAttribute("placeholder", msg);
  item.setAttribute("disabled", "true");
  item.setAttribute("aria-invalid", isInvalid);
  document.querySelector("#tries").appendChild(item);
}

const finishGuessBox = (msg) => {
  GUESS_INPUT.setAttribute("placeholder", msg);
  GUESS_INPUT.setAttribute("disabled", "true");
  GUESS_INPUT.value = "";
  sharebuddy(initialGuesses - maxGuesses);
}

const sharebuddy = (guessesTaken) => {
  if (navigator.share) {
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share your result';
    shareButton.addEventListener('click', () => {
      const emojiBlocks = '🧱'.repeat(guessesTaken);
      navigator.share({
        title: 'Beast!',
        text: `I'M ADDICTED to this DOPE ASS GAME and took ${guessesTaken} guesses (${emojiBlocks}) in the hopes to win it all! Huzzah!`,
        url: window.location.href,
      });
    });

    document.querySelector("#tries").appendChild(shareButton);
  } else {
    console.warn("Web Share API is not supported in your browser.");
  }
};

GUESS_INPUT.addEventListener("keyup", processGuess);