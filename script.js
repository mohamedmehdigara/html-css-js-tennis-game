document.addEventListener("DOMContentLoaded", function () {
  const racket1 = document.getElementById("racket1");
  const racket2 = document.getElementById("racket2");
  const ball = document.getElementById("ball");
  const court = document.getElementById("tennis-court");
  const courtRect = court.getBoundingClientRect();
  const racketHeight = 70;
  const racketWidth = 10;
  const initialBallSpeed = 2;
  const maxBallSpeed = 6;
  let racket1Y = courtRect.height / 2 - racketHeight / 2;
  let racket2Y = courtRect.height / 2 - racketHeight / 2;
  let ballX = courtRect.width / 2;
  let ballY = courtRect.height / 2;
  let ballSpeedX = initialBallSpeed;
  let ballSpeedY = initialBallSpeed;
  let player1Score = 0;
  let player2Score = 0;
  let gameOver = false;

  // Function to update the elements positions
  function updateElements() {
    racket1.setAttribute("y", racket1Y);
    racket2.setAttribute("y", racket2Y);
    ball.setAttribute("cx", ballX);
    ball.setAttribute("cy", ballY);
  }

  // Function to move the ball
  function moveBall() {
    if (!gameOver) {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Ball collision with walls
      if (ballX <= 40 || ballX >= 590) {
        ballSpeedX = -ballSpeedX;
      }

      if (ballY <= 40 || ballY >= 260) {
        ballSpeedY = -ballSpeedY;
      }

      // Ball collision with rackets
      if (ballX <= 50 && ballY >= racket1Y && ballY <= racket1Y + racketHeight ||
          ballX >= 540 && ballY >= racket2Y && ballY <= racket2Y + racketHeight) {
        ballSpeedX = -ballSpeedX;

        // Increase ball speed after each collision
        if (Math.abs(ballSpeedX) < maxBallSpeed) {
          ballSpeedX *= 1.1;
          ballSpeedY *= 1.1;
        }
      }

      // Check for scoring
      if (ballX <= 0) {
        player2Score++;
        checkGameOver();
      } else if (ballX >= 600) {
        player1Score++;
        checkGameOver();
      }

      updateElements();
    }
  }

  // Function to move the rackets
  function moveRackets() {
    document.addEventListener("keydown", function(event) {
      switch (event.key) {
        case "ArrowUp":
          if (racket2Y > 40) racket2Y -= 10;
          break;
        case "ArrowDown":
          if (racket2Y + racketHeight < 260) racket2Y += 10;
          break;
        case "w":
          if (racket1Y > 40) racket1Y -= 10;
          break;
        case "s":
          if (racket1Y + racketHeight < 260) racket1Y += 10;
          break;
      }
      updateElements();
    });
  }

  // Function to check if game is over
  function checkGameOver() {
    if (!gameOver && (player1Score >= 5 || player2Score >= 5)) {
      gameOver = true;
      setTimeout(showGameOverOverlay, 1000); // Delay game over message by 1 second
    }
  }

  // Function to display game over overlay
  function showGameOverOverlay() {
    const gameOverOverlay = document.getElementById("game-over-overlay");
    gameOverOverlay.style.display = "flex";

    const winnerText = document.getElementById("winner-text");
    winnerText.innerText = player1Score > player2Score ? "Player 1 Wins!" : "Player 2 Wins!";

    // Hide the ball when game over
    ball.style.display = "none";
  }

  // Function to reset the game
  function resetGame() {
    player1Score = 0;
    player2Score = 0;
    ballX = courtRect.width / 2;
    ballY = courtRect.height / 2;
    ballSpeedX = initialBallSpeed;
    ballSpeedY = initialBallSpeed;
    gameOver = false;
    ball.style.display = "block"; // Show the ball again
    updateElements();

    const gameOverOverlay = document.getElementById("game-over-overlay");
    gameOverOverlay.style.display = "none";
  }

  // Event listener for reset button
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", resetGame);

  // Initialize game
  setInterval(moveBall, 10);
  moveRackets();
});
