document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    const court = document.getElementById("tennis-court");
    const racket1 = document.getElementById("racket1");
    const racket2 = document.getElementById("racket2");
    const courtRect = court.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    const racketWidth = racket1.offsetWidth;
    const racketHeight = racket1.offsetHeight;
    let ballX = courtRect.width / 2 - ballRect.width / 2;
    let ballY = courtRect.height / 2 - ballRect.height / 2;
    let dx = 1;
    let dy = 1;
    let racket1Y = courtRect.height / 2 - racketHeight / 2;
    let racket2Y = courtRect.height / 2 - racketHeight / 2;
  
    function moveBall() {
      ballX += dx;
      ballY += dy;
  
      if (ballX + ballRect.width >= courtRect.width || ballX <= 0) {
        dx = -dx;
      }
  
      if (ballY + ballRect.height >= courtRect.height || ballY <= 0) {
        dy = -dy;
      }
  
      // Check collision with rackets
      if (ballX <= racketWidth && ballY >= racket1Y && ballY <= racket1Y + racketHeight ||
          ballX + ballRect.width >= courtRect.width - racketWidth && ballY >= racket2Y && ballY <= racket2Y + racketHeight) {
        dx = -dx;
      }
  
      ball.style.left = ballX + "px";
      ball.style.top = ballY + "px";
    }
  
    function moveRackets() {
      document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp" && racket2Y > 0) {
          racket2Y -= 10;
        } else if (event.key === "ArrowDown" && racket2Y + racketHeight < courtRect.height) {
          racket2Y += 10;
        } else if (event.key === "w" && racket1Y > 0) {
          racket1Y -= 10;
        } else if (event.key === "s" && racket1Y + racketHeight < courtRect.height) {
          racket1Y += 10;
        }
        racket1.style.top = racket1Y + "px";
        racket2.style.top = racket2Y + "px";
      });
    }
  
    setInterval(moveBall, 10);
    moveRackets();
  });
  