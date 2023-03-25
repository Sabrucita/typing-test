const startButton = document.getElementById('startButton');
const progressBar = document.querySelector('#progressBar div')
const correctLetters = document.querySelector('#correctLetters span')
const errors = document.querySelector('#errors span')
const wpm = document.querySelector('#wpm span')
const final = document.querySelector('#final')

const gameTime = 3;


startButton.addEventListener('click', () => {
  console.log('Start')
  progressBar.classList.toggle('completeTime',true)
  startButton.classList.toggle('hidden',true)
})

progressBar.addEventListener('animationend', () => {
  final.classList.toggle('hidden',false)
  console.log('Time ended')
  progressBar.classList.toggle('completeTime',false)
  correctLetters.textContent = 'change'
  errors.textContent = 'change'
  wpm.textContent = 'change'
})

document.documentElement.style.setProperty('--time',gameTime+'s')
