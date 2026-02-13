const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('.btn-restart')

const highScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');

const blockHeight = 50
const blockWidth = 50

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = '00-00';

highScoreElement.innerText = highScore

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;
let timerIntervalId = null;

let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }
const blocks = []
let snake = [{
    x: 3, y: 1
}]

let direction = 'down'

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block")
        board.appendChild(block);
        blocks[`${row}--${col}`] = block
    }
}

function render() {

    let head = null

    blocks[`${food.y}--${food.x}`].classList.add("food")

    if (direction === "left") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }
    else if (direction === "right") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    else if (direction === "down") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    }
    else if (direction === "up") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }

    // Self Collision Logic
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            clearInterval(intervalId)
            clearInterval(timerIntervalId)

            modal.style.display = "flex"
            startGameModal.style.display = "none"
            gameOverModal.style.display = "flex"
            return;
        }
    }

    // Wall Collision Logic
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        clearInterval(intervalId)
        modal.style.display = "flex"
        startGameModal.style.display = "none"
        gameOverModal.style.display = "flex"
        return;
    }

    // Food Consume Logic
    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.y}--${food.x}`].classList.remove("food")
        let valid = false
        while (!valid) {
            food = {
                x: Math.floor(Math.random() * cols),
                y: Math.floor(Math.random() * rows)
            }

            valid = true
            for (let segment of snake) {
                if (segment.x === food.x && segment.y === food.y) {
                    valid = false
                    break
                }
            }
        }

        blocks[`${food.y}--${food.x}`].classList.add("food")

        snake.unshift(head)
        score += 10
        scoreElement.innerText = score

        if (score > highScore) {
            highScore = score
            localStorage.setItem("highScore", highScore.toString())
        }
    }


    snake.forEach(segment => {
        blocks[`${segment.y}--${segment.x}`].classList.remove("fill")
    })
    snake.unshift(head)
    snake.pop()


    snake.forEach(segment => {
        blocks[`${segment.y}--${segment.x}`].classList.add("fill")
    })
    // if (head.x==food.x && head.y==food.y){

    // }


}

startButton.addEventListener("click", () => {
    modal.style.display = "none"
    intervalId = setInterval(() => { render() }, 300)

    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split("-").map(Number)  // Destructuring

        if (sec == 59) {
            min += 1
            sec = 0
        } else {
            sec += 1
        }
        time = `${min}-${sec}`
        timeElement.innerText = time

    }, 1000)
})

restartButton.addEventListener("click", restartGame)

function restartGame() {
    blocks[`${food.y}--${food.x}`].classList.remove("food")
    snake.forEach(segment => {
        blocks[`${segment.y}--${segment.x}`].classList.remove("fill")
    })
    score = 0
    time = '00-00'

    scoreElement.innerText = score
    timeElement.innerText = time
    highScoreElement.innerText = highScore

    modal.style.display = "none"
    direction = "down"
    snake = [{ x: 1, y: 3 }]
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }
    intervalId = setInterval(() => { render() }, 300)
}
// ArrowUp
// script.js:55 ArrowDown
// script.js:55 ArrowRight
// script.js:55 ArrowLeft
addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        direction = "up"
    } else if (event.key == "ArrowRight") {
        direction = "right"
    } else if (event.key == "ArrowLeft") {
        direction = "left"
    } else if (event.key == "ArrowDown") {
        direction = "down"
    }
})