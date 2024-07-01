//game constant and variable
document.querySelector(".sidebar .toggle-btn").addEventListener("click",function(){
    document.querySelector(".sidebar").classList.toggle("active");
});
let togglespeed=document.getElementById("speedset");
let back=1;
function changeback(back) {
    var boardpattern=document.getElementById("board");
    boardpattern.style.backgroundImage=`url(boardtheme/${back}.png)`;
}
let InputDir={x:0, y:0};
let speed=8;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:1,y:1},
]

food={x:6,y:7};
let speedset=document.getElementById('speedset');
function setsp(spe){
    speed=spe;
}

//game funtions
function main(ctime){
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if you bump in yourself
    for (let i = 1; i <snakeArr.length; i++) {
        if (snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if (snake[0].x>=16 || snake[0].x<=0 || snake[0].y>=16 || snake[0].y<=0){
        return true;
    }
    return false;

}

function gameEngine(){
    //updating snake array
    if (isCollide(snakeArr)){
        InputDir={x:0, y:0};
        alert("Game Over, press any key to play again");
        snakeArr=[{x:1,y:1}];
        score=0;
        scoreBox.innerHTML="Score: "+score;
        speed=8;   
        togglespeed.style.display='flex';
    }
    if (snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score+=1;
        if (score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="HiScore: "+hiscoreval;
        };
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x+InputDir.x,y: snakeArr[0].y+InputDir.y});
        let a=1;
        let b=15;
        let c={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        while ((c in snakeArr)) {
            c={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        }
        food=c;
    }
    //Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
        
    }
    snakeArr[0].x+=InputDir.x;
    snakeArr[0].y+=InputDir.y;
    //Display the snake
    board.innerHTML="";
    
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if (index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    
    })
    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement)
}



//main logic starts here
let hiscore=localStorage.getItem("hiscore");
if (hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hiscore: " + hiscore; 
}
InputDir={x:0,y:0}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    //start the game
    togglespeed.style.display='none';
    
    switch(e.key){
        case "ArrowUp":
            InputDir.x=0;
            InputDir.y=-1;
            break;
        case "ArrowDown":
            InputDir.x=0;
            InputDir.y=1;
            break;
        case "ArrowLeft":
            InputDir.x=-1;
            InputDir.y=0;
            break;
        case "ArrowRight":
            InputDir.x=1;
            InputDir.y=0;
            break; 
        default:
            break;
    }
});