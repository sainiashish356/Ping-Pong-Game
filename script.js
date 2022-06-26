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

window.addEventListener('keypress' , function(event){

    let rodSpeed = 20;

    let rodRect = rod1.getBoundingClientRect();


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
                        storeWin(rode2Name , score);
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