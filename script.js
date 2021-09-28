let inputDir = {x:0,y:0};
const moveSound = new Audio('./media/move.mp3');
const music = new Audio('./media/music.mp3');
const gameOver = new Audio('./media/gameover.mp3');
const foodSound = new Audio('./media/food.mp3');
let board = document.getElementById('board');
let countScore = document.getElementById('score');
let highScore = document.getElementById('highScore');

let speed = 8;
let lastPaintTime = 0;
let score = 0;
let hscore = 0;

//music.play();
let snakeArr = [
    {x: 13, y: 15}
];
food = {x :6, y :7};
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log("Render");
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
     
}
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    if(isCollide(snakeArr))
    {
        gameOver.play();
        music.pause();
        inputDir =  {x:0, y:0}; 
        if(score > hscore)
        {
            hscore = score;
            highScore.innerHTML = "High Score: " + hscore;
        }
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        music.play();
        countScore.innerHTML = "Score: " + 0;
        score = 0; 
    }
    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y)
    {
        foodSound.play();
        score += 1;
        if(score > hscore)
        {
            highScore.innerHTML = "High Score: " + score;
        }
        countScore.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
        let a = 1;
        let b = 17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }
    for(let i = snakeArr.length-2; i>=0; i--)
    {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index == 0)
    {
    snakeElement.classList.add('head');  
    }
    else
    {
    snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});