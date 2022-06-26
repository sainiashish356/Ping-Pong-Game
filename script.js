var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');

const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name =  "Rod 1";
const rod2Name =  "Rod 2";

let score , maxScore , movement , rod, ballSpeedX = 2 , ballSpeedY = 2;

let gameon = false;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

(function() {

    rod = localStorage.getItem(storeName);
    maxScore= localStorage.getItem(storeScore);

    if(rod == "null" || maxScore == "null"){
        alert("This is the first time you are playing...LETS STRT");
        maxScore = 0;
        rod = "Rod1";
    }else{
        alert(rod + "has max score of" + maxScore*100);
    }
    resetBoard(rod);

})();


function resetBoard(rodName){
    rod1.style.left = (window.innerWidth - rod1.offsetWidth) /2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) /2 + 'px';
    ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + 'px';

    //losing player gets the ball
    if(rodname == rod2Name){
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballSpeedY= 2;
    }else if(rodname == rod1Name){
        ball.style.top = (rod2.offsetTop + rod2.offsetHeight) + 'px';
        ballSpeedY = -2;
    }
    score = 0;
    gameon = false;
}


function storeWin(rod , score){
    if(score > maxScore){
        maxScore = score;
        localStorage.setItem(storeName , rod);
        localStorage.setItem(storeScore , maxScore);
    }

    clearInterval(movement);
    resetBoard(rod);

    alert(rod + "wins with the score of " + (score * 100) + "max Score is:" + (maxScore*100));

}

window.addEventListener('keypress' , function(event){

    let rodSpeed = 20;

    let rodRect = rod1.getBoundingClientRect();


    if(event.code === "KeyD" && ((rodRect.x + rodRect.width) < window.innerWidth)){
        rod1.style.left = (rodRect.x) + rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    }else if(event.code === "KeyA" && (rodRect.x > 0)) {
        rod1.style.left = (rodRect.x) - rodSpeed + 'px';
        rod2.style.left = rod1.style.left; 
    }


    if(event.code === "Enter"){
        if(!gameon){
            gameon = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;

            let rod1Height = rod1.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Height = rod2.offsetHeight;
            let rod2Width = rod2.offsetWidth;

            movement = this.setInterval(function() {
                // ball move
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                let rod1X = rod1.getBoundingClientRect().x;
                let rod2X = rod2.getBoundingClientRect().x;

                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';

                //this is for when our ball touch the viewport width so we reverse the direction of ball
                if((ballX + ballDia) > windowWidth || ballX < 0){
                        ballX = -ballSpeedX;
                }

                //this specifies the center of the ball on viewport
                let ballPos = (ballX + ballDia) / 2;

                //check rod1 if ball hit the rod 1 then we reverse the direction of ball
                if(ballY <= rod1Height){
                    ballSpeedY = -ballSpeedY;
                    score++;

                    //check if game ends
                    if((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))){
                        storeWin(rod2Name , score);
                    }
                }
                //check for ball 2
                else if((ballY + ballDia) >= (windowHeight - rod2Height)){
                    ballSpeedY = -ballSpeedY; //reverse the direction
                    score++;

                    //check if game ends
                    if((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))){
                        storeWin(rod1Name , score);
                    }
                }


            },10);
        }
    }
})