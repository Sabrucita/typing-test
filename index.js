const startButton = document.getElementById('startButton');
const progressBar = document.querySelector('#progressBar div')
const final = document.querySelector('#final')
const restartButton = document.querySelector('#final button')
const wordContainer = document.getElementById('currentWord')
const input = document.querySelector('input');
let correctLetters = document.querySelector('#correctLetters span')
let errors = document.querySelector('#errors span')
let wpm = document.querySelector('#wpm span')

const gameTime = 10;
let letterList = [];
let currentIndex;

function start(){
  correctLetters = 0;
  errors = 0;
  wpm = 0;
  console.log('Start')
  final.classList.toggle('hidden',true)
  letterList[0].classList.toggle('currentLetter')
  progressBar.classList.toggle('completeTime',true)
  startButton.classList.toggle('hidden',true)
}

function newWord(){
  if(letterList.length > 0) letterList.forEach(letter => {wordContainer.removeChild(letter)});
  const nrWordSelected = Math.floor(Math.random()*(wordsArray.length));
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
  console.log(letter,letterPosition)
  const newLetter = document.createElement('span')
  newLetter.textContent = letter;
  newLetter.style=`
  left: ${letterPosition.left}px;
  top: ${letterPosition.top}px;
  `
  newLetter.classList.add('disappear')
  document.body.appendChild(newLetter)
}

startButton.addEventListener('click', () => start())
restartButton.addEventListener('click', () => start())

progressBar.addEventListener('animationend', () => {
  final.classList.toggle('hidden',false)
  progressBar.classList.toggle('completeTime',false)
  correctLetters.textContent = 'change'
  errors.textContent = 'change'
  wpm.textContent = 'change'
})

input.focus();
document.documentElement.style.setProperty('--time',gameTime+'s')
newWord()

input.addEventListener('input', (e)=>{
  if(e.data === letterList[currentIndex].textContent) {
    createLetterEffect(letterList[currentIndex])
    currentIndex++
    correctLetters++;
    if(currentIndex === letterList.length){
      newWord()
    }
    letterList[currentIndex].classList.toggle('currentLetter')
  }else{
    errors++;
  }
})
input.addEventListener('blur', ()=> input.focus())