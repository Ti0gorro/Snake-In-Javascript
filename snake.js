// Primero seteamos el canvas y su contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Se setean dimensiones
const gridSize = 20;
const squareSize = canvas.width / gridSize;

// Se setea la posicion inicial de la serpiente y su direccion inicial
let snake = [{ x: 10, y: 10 }];
let direction = "right";

// Se setea de forma random la posicion de las comidas
let food = {
  x: Math.floor(Math.random() * gridSize),
  y: Math.floor(Math.random() * gridSize),
};

setInterval(update, 100);

// Actualizar el estado actual del juego
function update() {
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") head.x++;
  else if (direction === "left") head.x--;
  else if (direction === "up") head.y--;
  else if (direction === "down") head.y++;
  snake.unshift(head);

  // Caso colisión con la comida
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } else {
    snake.pop();
  }

  // Caso colisión con paredes o con el cuerpo de la serpiente
  if (
    head.x < 0 ||
    head.x >= gridSize ||
    head.y < 0 ||
    head.y >= gridSize ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over!");
    location.reload();
  }

  // Setear espacio visual, visuales de la serpiente y comida
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * squareSize, segment.y * squareSize, squareSize, squareSize);
  });
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * squareSize, food.y * squareSize, squareSize, squareSize);
}

// Teclas de juego
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
});
