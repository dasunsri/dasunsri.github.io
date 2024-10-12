const player = document.getElementById('player');
const star = document.getElementById('star');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');

let score = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
highScoreDisplay.textContent = `High Score: ${highScore}`;
let gameInterval, starInterval;
let starSpeed = 5;
let isGameOver = false;

// Move player
document.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    
    const playerPosition = player.getBoundingClientRect();
    const gameAreaPosition = gameArea.getBoundingClientRect();
    
    if (e.key === 'ArrowLeft' && playerPosition.left > gameAreaPosition.left) {
        player.style.left = player.offsetLeft - 20 + 'px';
    }
    if (e.key === 'ArrowRight' && playerPosition.right < gameAreaPosition.right) {
        player.style.left = player.offsetLeft + 20 + 'px';
    }
});

// Start falling star
function startStar() {
    star.style.top = '0px';
    star.style.left = Math.random() * (gameArea.offsetWidth - star.offsetWidth) + 'px';
    
    starInterval = setInterval(() => {
        if (isGameOver) return;
        
        let starPosition = star.offsetTop + starSpeed;
        
        // Check if star is out of bounds
        if (starPosition > gameArea.offsetHeight) {
            star.style.top = '0px';
            star.style.left = Math.random() * (gameArea.offsetWidth - star.offsetWidth) + 'px';
            starSpeed += 0.5;  // Increase star speed over time
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            star.style.top = starPosition + 'px';
        }
        
        checkCollision();
    }, 30);
}

// Check for collision
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const starRect = star.getBoundingClientRect();
    
    if (!(playerRect.right < starRect.left || 
          playerRect.left > starRect.right || 
          playerRect.bottom < starRect.top || 
          playerRect.top > starRect.bottom)) {
        endGame();
    }
}

// End the game
function endGame() {
    isGameOver = true;
    clearInterval(starInterval);
    clearInterval(gameInterval);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
        alert(`Game over! New high score: ${score}`);
    } else {
        alert(`Game over! Your score: ${score}`);
    }
    
    resetGame();
}

// Reset the game
function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Score: 0`;
    starSpeed = 5;
    isGameOver = false;
    startStar();
}

// Start the game loop
function startGame() {
    startStar();
    gameInterval = setInterval(() => {
        if (!isGameOver) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }, 1000);
}

startGame();
