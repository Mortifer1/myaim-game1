const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})

function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		setTime(current)
	}
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}
	</span></h1>`

}

function setTime(value) {
	let min = Math.floor(value / 60)
	let sec = value % 60

	if (min > 60) {
		if (sec < 10) {
			timeEl.innerHTML = `${min}:0${sec}`
		} else {
			timeEl.innerHTML = `${min}:${sec}`
		}
	} else {
		if (sec < 10) {
			timeEl.innerHTML = `0${min}:0${sec}`
		} else {
			timeEl.innerHTML = `0${min}:${sec}`
		}
	}
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60)
	const { width, height } = board.getBoundingClientRect()
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)
	const color = getRandomColor()

	circle.style.backgroundColor = `${color}`
	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`

	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
	return 'rgb(' + getRandomNumber(0, 255) + ', ' + getRandomNumber(0, 255) + ', ' + getRandomNumber(0, 255) + ')'
}
