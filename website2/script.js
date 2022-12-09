window.addEventListener('load', function(){
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let gameSpeed = .5;


    //Background 
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';

class Layer {
	constructor(image, speedModifier){
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
	update(){
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width){
    	this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width){
    	this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
	}
	draw(){
       ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
       ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
	}
}

const layer1 = new Layer(backgroundLayer1, 1);
const layer2 = new Layer(backgroundLayer2, 4);
const layer3 = new Layer(backgroundLayer3, 3);
const layer4 = new Layer(backgroundLayer4, 2);
const layer5 = new Layer(backgroundLayer5, 0);

const gameObjects = [layer1,layer2,layer3,layer4,layer5];

//end of background above

    class InputHandler{
    	constructor(){
    		this.keys = [];
    		window.addEventListener('keydown', e => {
    			if (( e.key === 'ArrowDown' ||
    				  e.key === 'ArrowUp' ||
    				  e.key === 'ArrowLeft'||
    				  e.key === 'ArrowRight')
    				&& this.keys.indexOf(e.key) === -1){
                  this.keys.push(e.key);
    				}
                 });
		     window.addEventListener('keyup', e => {
    			if (  e.key === 'ArrowDown' ||
    				  e.key === 'ArrowUp' ||
    				  e.key === 'ArrowLeft'||
    				  e.key === 'ArrowRight'){
    				this.keys.splice(this.keys.indexOf(e.key), 1);
    				}
                 });
    		}
    	
     }

       class Player {
    	constructor(gameWidth, gameHeight){
    		this.gameWidth = gameWidth;
    		this.gameHeight = gameHeight;
    		this.width = 200;
    		this.height = 200;
    		this.x = 0;
            this.y = this.gameHeight - this.height;
    		this.image = document.getElementById('playerImage');
    		this.frameX = 0;
    		this.frameY = 0;
    		this.speed = 0;
    		this.vy= 0;
    		this.weight = 1; 

    		}


      draw(context){
      	context.fillStyle = 'white';
      	context.fillRect(this.x, this.y, this.width, this.height);
      	context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
      	 this.width, this.height, this.x, this.y, this.width, this.height);
      }
      update(input){
     
      	if (input.keys.indexOf('ArrowRight') > -1){
      		this.speed = 5;
      	} else if (input.keys.indexOf('ArrowLeft') > -1){
             this.speed = -5;
      	} else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
      		this.vy -= 30;
      	} else {
      		this.speed = 0;
      	}
      	  

      //horizontal
      	this.x += this.speed;
       if (this.x <0) this.x = 0;
      else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
      //vertical movement
      	this.y += this.vy;
      if (!this.onGround()){
      	this.vy += this.weight;
      } else {
      	this.vy = 0;
      }
      if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
    }
    onGround(){
    	return this.y >= this.gameHeight - this.height;
    }
 }

    

     class Gem {
     	constructor(gameWidth, gameHeight){
     		this.gameWidth = gameWidth;
     		this.gameHeight = gameHeight;
     		this.width = 512;
     		this.height= 512;
     		this.image = document.getElementById('gem1');
     		this.x = 0;
     		this.y = 0;
     	}
     	draw(context){
     		context.drawImage(this.image, this.x, this.y, this.width/4, this.height/4)
     	}

     }

     function handleGems(){

     }

     function displayStatusText(){

     }

     const input = new InputHandler();
     const player = new Player(canvas.width, canvas.height);
     const gem1 = new Gem(canvas.width, canvas.height);
  

     function animate(){
     	ctx.clearRect(0,0, canvas.width, canvas.height);
     	gameObjects.forEach(object =>{
     	object.update();
     	object.draw();
     });
     	player.draw(ctx);
         player.update(input);
         gem1.draw(ctx);
     	 requestAnimationFrame(animate);

     }
   animate();
});














