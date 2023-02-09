document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground-moving");
  const gameOverMessageContainer = document.querySelector(".game-notover");

  let birdLeft = 220;
  let birdBottom = 100; //100px from ground
  let gravity = 2;
  let isGameOver = false;
  let gap = 430;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }

  let timer = setInterval(startGame, 20);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) {
      birdBottom += 50;
    }
    bird.style.bottom = birdBottom + "px";
  }

  document.addEventListener("touchstart", (e) => {
    jump();
  });

  document.addEventListener("keyup", control);

  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");

    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }

    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);

    obstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";

    topObstacle.style.left = obstacleLeft + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }

      if (
        (obstacleLeft > 200 &&
          obstacleLeft < 280 &&
          birdLeft === 220 &&
          (birdBottom < obstacleBottom + 153 ||
            birdBottom > obstacleBottom + gap - 200)) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }

    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }

  generateObstacle();

  function gameOver() {
    clearInterval(timer);
    isGameOver = true;
    document.removeEventListener("keyup", control);
    ground.classList.remove("ground-moving");
    ground.classList.add("ground");

    gameOverMessageContainer.classList.remove("game-notover");
    gameOverMessageContainer.classList.add("game-over");
  }
});
