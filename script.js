const ball = document.getElementById('ball');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');

// Retrieve stored high score or set to 0 if not found
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

// Display high score
let highScoreDisplay = document.createElement('p');
highScoreDisplay.id = 'high-score';
highScoreDisplay.textContent = `High Score: ${highScore}`;
document.body.insertBefore(highScoreDisplay, timeDisplay);

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
            endGame();
        }
    }, 1000);
}

function endGame() {
    // Check if the current score is higher than the high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore); // Store the new high score
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        alert(`New high score! Your score is ${score}`);
    } else {
        alert(`Game over! Your score is ${score}`);
    }
    resetGame();
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
