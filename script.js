const board = document.querySelector('.board');
const blockHeight = 50
const blockWidth = 50

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }
const blocks = []
const snake = [{
    x: 3, y: 1
}]

let direction = 'down'

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block")
        board.appendChild(block);
        block.innerText = `${row}--${col}`
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

    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        alert("Game Over")
        clearInterval(intervalId)
    }

    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.y}--${food.x}`].classList.remove("food")
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }
        blocks[`${food.y}--${food.x}`].classList.add("food")

        snake.unshift(head)
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

intervalId = setInterval(() => {
    render()
}, 400);

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