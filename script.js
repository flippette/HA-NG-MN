const Dictionary = (async () => {
  const res = await fetch("/dict.json");
  const dict = await res.json();
  return dict;
})();

const wrapper = document.getElementById("wrapper");
const subtitle = document.getElementById("subtitle");
const playbutton = document.getElementById("playbutton");
const title = document.getElementById("title");
const wordlist = Object.keys(Dictionary);
let lifearray = [];
let gameproceeding = false;

const newgame = () => {
  lifearray = ["🧡", "❤️", "💛", "❤️", "❤️", "💚", "❤️", "❤️"];
  incorrect_guesses = [];
  gameproceeding = true;

  wrapper.innerHTML = "";
  life_number = 8;
  letter1guessed = false;
  letter2guessed = false;

  // Selects a random a 2 letter word
  let index = Math.floor(Math.random() * 107);
  answer = wordlist[index];
  answerdef = Dictionary[answer];
  letter1 = answer.split("")[0];
  letter2 = answer.split("")[1];

  guessing_tile = document.createElement("p");
  guessing_tile.textContent = "_ _";
  guessing_tile.id = "guessing_tile";
  wrapper.append(guessing_tile);

  hintbox = document.createElement("div");
  hintbox.id = "hintbox";
  wrapper.append(hintbox);

  wordtype = document.createElement("p");
  wordtype.id = "wordtype";
  wordtype.textContent = "[Wo rd   ty pe]";
  hintbox.append(wordtype);

  worddef = document.createElement("p");
  worddef.id = "worddef";
  worddef.textContent = "[Wo rd   de fi]";
  hintbox.append(worddef);

  wordex = document.createElement("p");
  wordex.id = "wordex";
  wordex.textContent = "[Wo rd   ex am pl]";
  hintbox.append(wordex);

  lives = document.createElement("p");
  lives.textContent = "Li fe:  🧡❤️💛❤️❤️💚❤️❤️";
  lives.id = "lives";
  wrapper.append(lives);

  const letterbuttons = document.createElement("div");
  letterbuttons.id = "letter-buttons";
  wrapper.append(letterbuttons);
  const create_keyboard = (buttons, rownum) => {
    const row = document.createElement("div");
    row.id = "row-" + rownum;
    row.className = "row";
    letterbuttons.append(row);

    buttonlist = buttons.slice("");
    for (i = 0; i < buttonlist.length; i++) {
      const row = document.getElementById("row-" + rownum);
      button = document.createElement("button");
      button.className = "button";
      button.id = buttonlist[i];
      button.setAttribute("onclick", "checkletter('" + buttonlist[i] + "')");
      button.textContent = buttonlist[i];
      row.append(button);
    }
  };
  create_keyboard("qwertyuiop", 1);
  create_keyboard("asdfghjkl", 2);
  create_keyboard("zxcvbnm", 3);
};

document.addEventListener("keypress", (event) => {
  if (gameproceeding === true) {
    if ("qwertyuiopasdfghjklzxcvbnm".split("").includes(event.key)) {
      checkletter(event.key);
    }
  }

  if (gameproceeding === false) {
    if (event.key === "Enter") {
      newgame();
    }
  }
});

const checkletter = (guessed_letter) => {
  if (incorrect_guesses.includes(guessed_letter) === false) {
    if (guessed_letter === letter1) {
      letter1guessed = true;
    } else if (guessed_letter === letter2) {
      letter2guessed = true;
    } else {
      life_number -= 1;
      lifearray.splice(-1, 1);
      incorrect_guesses.push(guessed_letter);
    }
  }
  updatescreen();
};

const updatescreen = () => {
  life = "";
  for (i = 0; i < lifearray.length; i++) {
    life += lifearray[i];
  }
  lives.textContent = "Li fe:  " + life;

  if (letter1guessed === true) {
    firsttile = letter1;
    document.getElementById(letter1).style.backgroundColor = "lime";
  } else {
    firsttile = "_";
  }
  if (letter2guessed === true) {
    secondtile = letter2;
    document.getElementById(letter2).style.backgroundColor = "lime";
  } else {
    secondtile = "_";
  }
  guessing_tile.textContent = firsttile + " " + secondtile;

  if (life_number < 6) {
    wordtype.textContent = answerdef.type;
  }
  if (life_number < 3) {
    worddef.textContent = answerdef.definition;
  }

  if (letter1guessed === true && letter2guessed === true) {
    EndGame("WW");
  }
  if (life_number <= 0) {
    EndGame("LL");
  }

  for (i = 0; i < incorrect_guesses.length; i++) {
    incorrectbutton = document.getElementById(incorrect_guesses[i]);
    if (incorrectbutton != null) {
      incorrectbutton.style.backgroundColor = "red";
    }
  }
};

const EndGame = (outcome) => {
  gameproceeding = false;
  guessing_tile.textContent = letter1 + letter2;

  wordtype.textContent = answerdef.type;
  worddef.textContent = answerdef.definition;
  wordex.textContent = answerdef.example;

  wrapper.removeChild(document.getElementById("letter-buttons"));
  wrapper.removeChild(document.getElementById("lives"));

  outcometext = document.createElement("p");
  outcometext.id = "outcometext";
  outcometext.textContent = "Yu " + outcome + "!!!";
  wrapper.append(outcometext);

  newgamebutton = document.createElement("button");
  newgamebutton.id = "newgame";
  newgamebutton.textContent = "MO RE DO IT!";
  newgamebutton.setAttribute("onclick", "newgame()");
  wrapper.append(newgamebutton);
};
