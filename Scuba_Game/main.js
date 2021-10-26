const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const menuImage = new Image();
canvas.width = 1000;
canvas.height = 600;

let score = 0;
let gameFrame = 0;
let gameSpeed=1;
let gameOver= false;
ctx.font = '50px Georgia';



// Mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

let startGame=false;
canvas.addEventListener('mousemove', function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;

});
window.addEventListener('mouseup', function(event){
    mouse.click = false;
    startGame=true;
});

// Player
const playerLeft = new Image();
playerLeft.src = 'redfishy3.png';
const playerRight = new Image();
playerRight.src = 'redfishy3f.png';

class Player {
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.radius = 50;
        //this.height = 20;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 160;
        this.spriteHeight = 105;
    }
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x){
            this.x -= dx/20;
            this.moving = true;
        }
        if (mouse.y != this.y){
            this.y -= dy/20;
            this.moving = true;
        }
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width) this.x = canvas.width;
        if (this.y < 50) this.y = 50;
        if (this.y > canvas.height) this.y = canvas.height;
        let theta = Math.atan2(dy,dx);
        this.angle = theta;
    }
    draw(){
        if (gameFrame % 10 == 0) {
            this.frame++;
            if (this.frame >= 12) this.frame = 0;
            if ( this.frame == 3 ||  this.frame == 7 ||  this.frame == 11) {
                this.frameX = 0;
            } else this.frameX++;
            if (this.frame < 3){
                this.frameY = 0;
            } else if (this.frame < 7){
                this.frameY = 1;
            } else if (this.frame < 11){
                this.frameY = 2;
            } else this.frameY = 0;
        }
      
        ctx.fillStyle = 'black';
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        //ctx.beginPath();
        //ctx.arc(0, 0, this.radius, 0, Math.PI * 360);
        //ctx.fill();
        if (this.x >= mouse.x){
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth * 0.8, this.spriteHeight * 0.8);
        } else {
            ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth * 0.8, this.spriteHeight * 0.8);
        }
        ctx.restore();
    }
}

const player = new Player();


//Enemies
const enemyImage= new Image();
enemyImage.src = 'spiky_ball.png';

class Enemy {
   constructor(){
      this.x= canvas.width + 200;
      this.y= Math.random() * (canvas.height -150) +90;
      this.radius=40;
      this.speed= Math.random() * 2 + 2;
      //this.frame= 0;
      //this.frameX=0;
      //this.frameY=0;
      this.spriteWidth=300;
      this.spriteHeight=305;
    }

draw(){
      ctx.drawImage(enemyImage,this.x-70,this.y-20,this.spriteWidth/3,this.spriteHeight/3);
}
update(){
    this.x -= this.speed;
    if(this.x < 0 - this.radius *2){
        this.x = canvas.width+200;
        this.y= Math.random()* (canvas.height -150)+ 90;
        this.speed = Math.random()*2 + 2;
    }
      //collision with player
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx *dx +dy *dy);
    if ( distance < this.radius +player.radius){
        handleGameOver();
    }
 }
}

const enemy1= new Enemy();
function handleEnemies(){
    enemy1.update();
    enemy1.draw();
}

function handleGameOver(){
    ctx.fillstyle='white';
    ctx.fillText('GAME OVER, you scored '+ score +' tasty catches!', 300, 400);
    gameOver=true;
}


//Enemies2
const enemyImage2= new Image();
enemyImage2.src = 'broken_bottle.png';

class Enemy2 {
   constructor(){
      this.x= canvas.width + 250;
      this.y= Math.random() * (canvas.height -150) +90;
      this.radius=40;
      this.speed= Math.random() * 2 + 2;
      //this.frame= 0;
      //this.frameX=0;
      //this.frameY=0;
      this.spriteWidth=104;
      this.spriteHeight=236;
    }

draw(){
      ctx.drawImage(enemyImage2,this.x-60,this.y-60,this.spriteWidth/3,this.spriteHeight/3);
}
update(){
    this.x -= this.speed;
    if(this.x < 0 - this.radius *2){
        this.x = canvas.width+200;
        this.y= Math.random()* (canvas.height -150)+ 90;
        this.speed = Math.random()*2 + 2;
    }
      //collision with player
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx *dx +dy *dy);
    if ( distance < this.radius +player.radius){
        handleGameOver();
    }
 }
}

const enemy2= new Enemy2();
function handleEnemies2(){
    enemy2.update();
    enemy2.draw();
}



//Enemies3
const enemyImage3= new Image();
enemyImage3.src = 'shark.png';

class Enemy3 {
   constructor(){
      this.x= canvas.width + 350;
      this.y= Math.random() * (canvas.height -150)+50;
      this.radius=40;
      this.speed= Math.random() * 2 + 2;
      //this.frame= 0;
      //this.frameX=0;
      //this.frameY=0;
      this.spriteWidth=1133;
      this.spriteHeight=629;
    }

draw(){
      ctx.drawImage(enemyImage3,this.x-55,this.y-75,this.spriteWidth/3,this.spriteHeight/3);
}
update(){
    this.x -= this.speed;
    if(this.x < 0 - this.radius *2){
        this.x = canvas.width+300;
        this.y= Math.random()* (canvas.height -150)+ 50;
        this.speed = Math.random()*2 + 2;
    }
      //collision with player
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx *dx +dy *dy);
    if ( distance < this.radius +player.radius){
        handleGameOver();
    }
 }
}

const enemy3= new Enemy3();
function handleEnemies3(){
    enemy3.update();
    enemy3.draw();
}



// Bubbles
const bubblesArray = [];
const bubble = new Image();
bubble.src = 'pop2.png';

class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height +100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.frameX = 0;
        this.spriteWidth = 91;
        this.spriteHeight = 91;
        
    }
    update(){
        this.y -= this.speed
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw(){
      ctx.drawImage(bubble, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 68, this.y - 68, this.spriteWidth/6, this.spriteHeight/6);
    }
}
function handleBubbles(){
    for (let i = 0; i < bubblesArray.length; i++){
        if (bubblesArray[i].y > canvas.height * 2){
            bubblesArray.splice(i, 1);
        }
    }
    for (let i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    if (gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble());

    }
}


const textCoordinates = ctx.getImageData(0, 0, 100, 100);



// worms
const bugArray = [];
const bug = new Image();
bug.src = 'wormy.png';

class Bug {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y =  0 - 50 - Math.random() * canvas.height/2;
        this.radius = 50;
        this.speed = Math.random() * -5 + -1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        this.frameX = 0;
        this.spriteWidth = 460;
        this.spriteHeight = 672;
        this.pop = false;
        this.counted = false;
            }
    update(){
        this.y -= this.speed
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw(){
        ctx.drawImage(bug, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - 68, this.y - 68, this.spriteWidth/7, this.spriteHeight/7);
    }
}

const bugEat1 = document.createElement('audio');
bugEat1.src= 'splash1.mp3';
const bugEat2 = document.createElement('audio');
bugEat2.src= 'splash2.mp3';



function handleBug(){
    for (let i = 0; i < bugArray.length; i++){
        if (bugArray[i].y > canvas.height * 2){
            bugArray.splice(i, 1);
        }
    }
    for (let i = 0; i < bugArray.length; i++){
        if (bugArray[i].distance < bugArray[i].radius + player.radius){
             if (bugArray[i].sound =='sound1') {
                 bugEat1.play();
               }else {
                  bugEat2.play();
               }
            popAndRemove(i);
        }
    }
    for (let i = 0; i < bugArray.length; i++){
        bugArray[i].update();
        bugArray[i].draw();
    }
    if (gameFrame % 50 == 0) {
        bugArray.push(new Bug());

    }
}




function popAndRemove(i){
    if (bugArray[i]) {
        if (!bugArray[i].counted)score++;
        bugArray[i].counted = true;
        bugArray[i].frameX++;
        if (bugArray[i].frameX > 12) bugArray[i].pop = true;
        if (bugArray[i].pop) bugArray.splice(i, 1);
        requestAnimationFrame(popAndRemove);
    }

}

//menu image 
menuImage.src = 'gamecover.png';
let showMenu= true;


// animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

if (showMenu) {
  ctx.drawImage(menuImage,0, 0);
   if (startGame== true){
    showMenu= false;
    startGame == false;
   }
}
  else { 
    handleBubbles();
    handleBug();
    handleEnemies();
    handleEnemies2();
    handleEnemies3();
    player.update();
    player.draw();
    ctx.fillStyle = 'rgba(34,147,214,1)';
    ctx.font = '20px Georgia';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText('score: ' + score, 141, 336);
    ctx.fillStyle = 'rgba(34,147,214,1)';
    ctx.fillText('score: ' + score, 140, 335);
    gameFrame ++;
}

    if (!gameOver)requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
  canvasPosition = canvas.getBoundingClientRect();
  mouse.x = canvas.width/2;
  mouse.y = canvas.height/2;
});