const startButton = document.getElementById('startButton');
const progressBar = document.querySelector('#progressBar div')
const final = document.querySelector('#final')
const restartButton = document.querySelector('#final button')
const wordContainer = document.getElementById('currentWord')
const input = document.querySelector('input');
const correctLettersElement = document.querySelector('#correctLetters span')
const incorrectLettersElement = document.querySelector('#errors span')
const wpmElement = document.querySelector('#wpm span')

const gameTime = 60;
let letterList = [];
let currentIndex;
let correctLetters;
let incorrectLetters;
let finishedWords;
let playing = false;

function start(){
  playing = true;
  wordContainer.classList.toggle('hidden',false)
  newWord();
  correctLetters = 0;
  incorrectLetters = 0;
  finishedWords = 0;
  console.log('Start')
  final.classList.toggle('hidden',true)
  letterList[0].classList.toggle('currentLetter')
  progressBar.classList.toggle('completeTime',true)
  startButton.classList.toggle('hidden',true)
}

function newWord(){
  if(letterList.length > 0) letterList.forEach(letter => wordContainer.removeChild(letter));
  const nrWordSelected = Math.floor(Math.random()*wordsArray.length);
  const selectedWord = wordsArray[nrWordSelected]
  letterList = []
  currentIndex = 0
  for (let i = 0; i < selectedWord.length; i++) {
    const letterElement = document.createElement('span')
    letterElement.textContent = selectedWord[i]
    wordContainer.appendChild(letterElement)
    letterList.push(letterElement)
  }
}

function createLetterEffect(element){
  element.classList.toggle('invisible',true)
  const letter = element.textContent;
  const letterPosition = element.getBoundingClientRect();
  const newLetter = document.createElement('span')
  newLetter.style=`
    left: ${letterPosition.left}px;
    top: ${letterPosition.top}px;
  `
  newLetter.classList.add('disappear')
  newLetter.textContent = letter;
  document.body.appendChild(newLetter)
}

startButton.addEventListener('click', () => start())
restartButton.addEventListener('click', () => start())

progressBar.addEventListener('animationend', () => {
  playing = false;
  final.classList.toggle('hidden',false)
  progressBar.classList.toggle('completeTime',false)
  correctLettersElement.textContent = correctLetters;
  incorrectLettersElement.textContent = incorrectLetters;
  wpmElement.textContent = finishedWords*(60/gameTime);
  wordContainer.classList.toggle('hidden',true)
})

input.focus();
document.documentElement.style.setProperty('--time',gameTime+'s')

input.addEventListener('input', (e)=>{
  if(!playing){
    if(e.data === ' ') start();
    return
  }

  if(e.data === letterList[currentIndex].textContent) {
    createLetterEffect(letterList[currentIndex])
    currentIndex++
    correctLetters++;
    if(currentIndex === letterList.length){
      newWord();
      finishedWords++;
    }
    letterList[currentIndex].classList.toggle('currentLetter')
  }else{
    incorrectLetters++;
  }
})
input.addEventListener('blur', ()=> input.focus())