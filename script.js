let canvas = document.getElementById("snake");

let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}


// audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";


let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarcobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event){
    if (event.keyCode == 37 && direction != "right"){
        left.play();
        direction = "left";
    }else if (event.keyCode == 38 && direction != "down"){
        up.play();
        direction = "up";
    } else if (event.keyCode == 39 && direction != "left"){
        direction = "right";
        right.play();
    }else if (event.keyCode == 40 && direction != "up"){
        direction = "down";
        down.play();
    } 

}

function iniciarJogo(){

    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            dead.play();
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarcobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); 
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    
    if(snakeX > 15 * box && direction == "right") snakeX = 0;
    if(snakeX < 0 && direction == "left") snakeX = 15 * box;
    if(snakeY > 15 * box && direction == "down") snakeY = 0;
    if(snakeY < 0 && direction == "up") snakeY = 15 * box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);

