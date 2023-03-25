const startButton = document.getElementById('startButton');
const progressBar = document.querySelector('#progressBar div')
const correctLetters = document.querySelector('#correctLetters span')
const errors = document.querySelector('#errors span')
const wpm = document.querySelector('#wpm span')
const final = document.querySelector('#final')
const restartButton = document.querySelector('#final button')

const gameTime = 2;

function start(){
  console.log('Start')
  final.classList.toggle('hidden',true)
  progressBar.classList.toggle('completeTime',true)
  startButton.classList.toggle('hidden',true)
}


startButton.addEventListener('click', () => start())

progressBar.addEventListener('animationend', () => {
  final.classList.toggle('hidden',false)
  console.log('Time ended')
  progressBar.classList.toggle('completeTime',false)
  correctLetters.textContent = 'change'
  errors.textContent = 'change'
  wpm.textContent = 'change'
})

restartButton.addEventListener('click', () => start())

document.documentElement.style.setProperty('--time',gameTime+'s')
