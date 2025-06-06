const words = ["apple", "banana", "javaScript", "hangman", "code"];
let selectedWord = "";
let correctLetters = [];
let wrongLetters = [];
const maxGuesses = 6;

const wordDisplay = document.getElementById("wordDisplay");
const wrongLettersEl = document.getElementById("wrongLetters");
const remainingEl = document.getElementById("remaining");
const messageEl = document.getElementById("message");
const playAgainBtn = document.getElementById("playAgain");

function pickRandomWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
}

function updateWordDisplay() {
    wordDisplay.textContent = selectedWord
        .split("")
        .map(letter => (correctLetters.includes(letter) ? letter : "_"))
        .join(" ");
}
function updateWrongLetters() {
    wrongLettersEl.textContent = `Wrong: ${wrongLetters.join(", ")}`;
    remainingEl.textContent = `Rremaining guesses: ${maxGuesses - wrongLetters.length}`;
}

function showMessage(msg, color = "text-green-400") {
    messageEl.className = `text-2xl font-semibold ${color}`;
    messageEl.textContent = msg;

}

function checkGamesStatus() {
    const isWin = selectedWord.split("").every(letter => correctLetters.includes(letter));
    if (isWin) {
        showMessage("You Win!");
        endGame();
    } else if (wrongLetters.length >= maxGuesses) {
        showMessage(`You lose! the word was "${selectedWord}".`, "text-red-600");
        endGame();
    }
}
function endGame() {
    document.removeEventListener("keydown", handleKeydown);
    playAgainBtn.classList.remove("hidden");
}
function handleKeydown(e){
    const letter = e.key.toLowerCase();
    if (!/^[a-z]$/.test(letter)) return;

    if (selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
            correctLetters.push(letter);
        }
    }else{
        if(wrongLetters.includes(letter)){
            wrongLetters.push(letter);
        }
    }
    updateWordDisplay();
    updateWrongLetters();
    checkGamesStatus();
}

function resetGame(){
    correctLetters =[];
    wrongLetters =[];

    pickRandomWord();
    updateWordDisplay();
    updateWrongLetters();
    showMessage("");
    playAgainBtn.classList.add("hidden");
    document.addEventListener("keydown", handleKeydown);
}

// Init game
pickRandomWord();
updateWordDisplay();
updateWrongLetters();
document.addEventListener("keydown", handleKeydown);
playAgainBtn.addEventListener("click", resetGame)
