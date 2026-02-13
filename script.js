// ========================================
// 🐍 Snake Game - Script
// ========================================

// --- DOM Elements ---
const board = document.getElementById('game-board');
const startButton = document.getElementById('btn-start');
const modal = document.getElementById('modal');
const startGameModal = document.getElementById('start-game-modal');
const gameOverModal = document.getElementById('game-over-modal');
const restartButton = document.getElementById('btn-restart');
const pauseOverlay = document.getElementById('pause-overlay');

const highScoreElement = document.getElementById('high-score');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const speedElement = document.getElementById('speed');
const finalScoreElement = document.getElementById('final-score');

// Mobile D-Pad buttons
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnPause = document.getElementById('btn-pause');

// --- Constants ---
const BASE_SPEED = 200; // ms per tick (slowest)
const MIN_SPEED = 80;   // ms per tick (fastest)
const SPEED_STEP = 15;  // ms reduction per food eaten

// --- State ---
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let score = 0;
let time = '00:00';
let isPaused = false;
let isGameRunning = false;
let currentSpeed = BASE_SPEED;
let speedLevel = 1;

let intervalId = null;
let timerIntervalId = null;

let direction = 'down';
let nextDirection = 'down'; // buffered direction (for reverse protection)

let snake = [{ x: 3, y: 1 }];
let food = null;
const blocks = {};

highScoreElement.innerText = highScore;

// --- Opposite Direction Map (for reverse protection) ---
const OPPOSITES = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
};

// --- Board Setup ---
const blockSize = window.innerWidth <= 768 ? 30 : 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}--${col}`] = block;
    }
}

// Spawn initial food
food = spawnFood();

// --- Helper: Spawn food in valid position ---
function spawnFood() {
    let pos;
    let valid = false;
    while (!valid) {
        pos = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
        };
        valid = true;
        for (const segment of snake) {
            if (segment.x === pos.x && segment.y === pos.y) {
                valid = false;
                break;
            }
        }
    }
    if (blocks[`${pos.y}--${pos.x}`]) {
        blocks[`${pos.y}--${pos.x}`].classList.add('food');
    }
    return pos;
}

// --- Helper: Update speed based on score ---
function updateSpeed() {
    const foodEaten = score / 10;
    const maxLevels = Math.floor((BASE_SPEED - MIN_SPEED) / SPEED_STEP);
    currentSpeed = Math.max(MIN_SPEED, BASE_SPEED - foodEaten * SPEED_STEP);
    speedLevel = Math.min(foodEaten, maxLevels) + 1;
    speedElement.innerText = speedLevel;

    // Restart the interval with the new speed
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = setInterval(render, currentSpeed);
    }
}

// --- Core Render / Game Loop ---
function render() {
    // Apply buffered direction
    direction = nextDirection;

    let head = null;

    if (direction === 'left') {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === 'right') {
        head = { x: snake[0].x + 1, y: snake[0].y };
    } else if (direction === 'down') {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === 'up') {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    }

    // Self Collision
    for (const segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            gameOver();
            return;
        }
    }

    // Wall Collision
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        gameOver();
        return;
    }

    // Track whether the snake ate food this tick
    let ate = false;

    // Food Consumption
    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.y}--${food.x}`].classList.remove('food');

        score += 10;
        scoreElement.innerText = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore.toString());
            highScoreElement.innerText = highScore;
        }

        food = spawnFood();
        updateSpeed();
        ate = true;
    }

    // Clear old snake rendering
    snake.forEach((segment) => {
        const key = `${segment.y}--${segment.x}`;
        if (blocks[key]) {
            blocks[key].classList.remove('fill', 'head');
        }
    });

    // Move snake
    snake.unshift(head);
    if (!ate) {
        snake.pop(); // Only remove tail if snake didn't grow
    }

    // Render snake
    snake.forEach((segment, i) => {
        const key = `${segment.y}--${segment.x}`;
        if (blocks[key]) {
            blocks[key].classList.add('fill');
            if (i === 0) blocks[key].classList.add('head');
        }
    });
}

// --- Game Over ---
function gameOver() {
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    intervalId = null;
    timerIntervalId = null;
    isGameRunning = false;
    isPaused = false;
    pauseOverlay.classList.remove('visible');

    finalScoreElement.innerText = score;
    modal.style.display = 'flex';
    startGameModal.style.display = 'none';
    gameOverModal.style.display = 'flex';
}

// --- Start Game ---
function startGame() {
    modal.style.display = 'none';
    isGameRunning = true;
    isPaused = false;
    currentSpeed = BASE_SPEED;
    speedLevel = 1;
    speedElement.innerText = speedLevel;

    intervalId = setInterval(render, currentSpeed);

    timerIntervalId = setInterval(() => {
        const [min, sec] = time.split(':').map(Number);
        let newMin = min;
        let newSec = sec + 1;
        if (newSec >= 60) {
            newMin += 1;
            newSec = 0;
        }
        time = `${String(newMin).padStart(2, '0')}:${String(newSec).padStart(2, '0')}`;
        timeElement.innerText = time;
    }, 1000);
}

// --- Restart Game ---
function restartGame() {
    // Clear old state visuals
    if (food && blocks[`${food.y}--${food.x}`]) {
        blocks[`${food.y}--${food.x}`].classList.remove('food');
    }
    snake.forEach((segment) => {
        const key = `${segment.y}--${segment.x}`;
        if (blocks[key]) blocks[key].classList.remove('fill', 'head');
    });

    // Reset state
    score = 0;
    time = '00:00';
    direction = 'down';
    nextDirection = 'down';

    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highScore;

    snake = [{ x: 3, y: 1 }];
    food = spawnFood();

    startGame();
}

// --- Pause / Resume ---
function togglePause() {
    if (!isGameRunning) return;

    if (isPaused) {
        // Resume
        isPaused = false;
        pauseOverlay.classList.remove('visible');
        intervalId = setInterval(render, currentSpeed);
        timerIntervalId = setInterval(() => {
            const [min, sec] = time.split(':').map(Number);
            let newMin = min;
            let newSec = sec + 1;
            if (newSec >= 60) {
                newMin += 1;
                newSec = 0;
            }
            time = `${String(newMin).padStart(2, '0')}:${String(newSec).padStart(2, '0')}`;
            timeElement.innerText = time;
        }, 1000);
    } else {
        // Pause
        isPaused = true;
        pauseOverlay.classList.add('visible');
        clearInterval(intervalId);
        clearInterval(timerIntervalId);
        intervalId = null;
        timerIntervalId = null;
    }
}

// --- Direction Change (with reverse protection) ---
function changeDirection(newDir) {
    if (!isGameRunning || isPaused) return;
    // Prevent reversing into yourself
    if (OPPOSITES[newDir] === direction) return;
    nextDirection = newDir;
}

// --- Keyboard Controls ---
addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            event.preventDefault();
            changeDirection('up');
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            event.preventDefault();
            changeDirection('down');
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            event.preventDefault();
            changeDirection('left');
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            event.preventDefault();
            changeDirection('right');
            break;
        case ' ':
            event.preventDefault();
            togglePause();
            break;
    }
});

// --- Mobile D-Pad Controls ---
btnUp.addEventListener('click', () => changeDirection('up'));
btnDown.addEventListener('click', () => changeDirection('down'));
btnLeft.addEventListener('click', () => changeDirection('left'));
btnRight.addEventListener('click', () => changeDirection('right'));
btnPause.addEventListener('click', () => togglePause());

// Prevent default touch behaviour on D-pad to avoid scroll
document.querySelectorAll('.dpad-btn').forEach((btn) => {
    btn.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
});

// --- Touch Swipe Controls (fallback for mobile) ---
let touchStartX = 0;
let touchStartY = 0;

board.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

board.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) < 20) return; // too small

    if (absDx > absDy) {
        changeDirection(dx > 0 ? 'right' : 'left');
    } else {
        changeDirection(dy > 0 ? 'down' : 'up');
    }
}, { passive: true });

// --- Event Listeners ---
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log("Service Worker Registered"));
}
