const gameBoard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#resetbtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);


gameStart();
// createFood();
// drawFood();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick (){
    if (running) {
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 95)
    } else {displayGameOver()};
}
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}
// function createFood() {
//     function randomFood(min, max) {
//         const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
//         return randNum;
//     }
    
//     foodX = randomFood(0, gameWidth - unitSize);
//     foodY = randomFood(0, gameWidth - unitSize);
// }

function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }

    while (true) {
        foodX = randomFood(0, gameWidth - unitSize);
        foodY = randomFood(0, gameWidth - unitSize);

        let collision = snake.some(snakePart => snakePart.x === foodX && snakePart.y === foodY);

        if (!collision) break;
    }
}


function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
                    y: snake[0].y + yVelocity};

    snake.unshift(head);

    if (snake[0].x == foodX && snake[0].y == foodY) {
        score +=1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;

        case (keyPressed == up && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;

        case(keyPressed == right && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;

        case(keyPressed == down && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    
        // default:
        //     break;
    }
    
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x > gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
       
    }

    for (let i = 1; i < snake.length; i+=1){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
         
    }

}

function displayGameOver() {
    
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    
    let text = generateRandom();
    let x = ctx.canvas.width / 2;
    let y = ctx.canvas.height / 2;
    
    // Ensure the text fits within the canvas
    while(ctx.measureText(text).width > ctx.canvas.width) {
        ctx.font = (parseFloat(ctx.font) - 1) + "px MV Boli";
    }
    

    ctx.fillText(text, x, y);
    
    running = false;
}




function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart(); 
}




function generateRandom() {
    const randomText = ["Program To War Gya",
                        "Baap ko bhej, terey bas ka nahi hay!",
                        "Hun Aram i?",
                        "Terey say na ho pay ga beta"];
    const genIndex = Math.floor(Math.random()*4);

    return randomText[genIndex];
    
    
    // console.log(randomIndex);

}

window.addEventListener("keydown", function(event) {
    if (!running && event.keyCode === 13) {
        resetGame();
    }
});


