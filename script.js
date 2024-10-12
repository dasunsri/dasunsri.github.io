const ball = document.getElementById('ball');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');

let score = 0;
let timeLeft = 30;

function moveBall() {
    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;
    const maxX = gameAreaWidth - ball.offsetWidth;
    const maxY = gameAreaHeight - ball.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;
}

ball.addEventListener('click', function() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveBall();
});

function countdown() {
    const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `Time left: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Game over! Your score is ${score}`);
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time left: 30s`;
    moveBall();
}

moveBall();
countdown();
