window.addEventListener('load', function(){
	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 1920;
    canvas.height = 1080;
    let gameSpeed = .5;
  

//audio
    const music1 = document.createElement('audio');
    music1.src = 'music.mp3';




  

    //Background 
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'colorBG.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';
//const backgroundLayer6 = new Image();
//backgroundLayer6.src = 'layer-5.png';

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

   stopScrolling(){
    this.speed = 0;
   }
   startScrolling(){
    this.speed = gameSpeed * this.speedModifier;
        
   }
	update(){

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

const layer1 = new Layer(backgroundLayer1, 2);
const layer2 = new Layer(backgroundLayer2, 8);
const layer3 = new Layer(backgroundLayer3, 6);
const layer4 = new Layer(backgroundLayer4, 4);
const layer5 = new Layer(backgroundLayer5, 8.5);
const layer6 = new Layer(backgroundLayer5, 5.5);

const gameObjects = [layer1,layer2,layer3,layer4,layer5,layer6];

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
    		this.width = 177;
    		this.height = 400;
    		this.x = canvas.width/2 -200;
            this.y = 600 - this.height;
    		this.image = document.getElementById('playerStanding');
    		this.frameX = 0;
    		this.frameY = 0;
    		this.speed = 0;
    		this.totalFrames=60;
    		this.vy= 0;
    		this.weight = 1; 
            this.isRunning =false;
    		}

      draw(context){

      	context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,
      	 this.width, this.height, this.x, this.y, this.width, this.height);


      }

       isPlayerRunning(){
        return this.isRunning;
         
       }

      switchToRunning(){
          this.isRunning =true;
          this.width=341;
          this.height=400;
          this.totalFrames=30;
          this.image = document.getElementById('playerRunning');
      }
      switchToStanding(){
                this.isRunning =false;
                this.width=177;
                this.height=400;
                this.totalFrames=60;
                this.image = document.getElementById('playerStanding');

        }

      update(input){

        this.frameX++;
        if(this.frameX >this.totalFrames-1){
            this.frameX=0;
        }


      	if (input.keys.indexOf('ArrowRight') > -1){
      	this.switchToRunning();
        music1.play();
      		//this.speed = 5;
      	} else if (input.keys.indexOf('ArrowLeft') > -1){
      	this.switchToRunning();
            // this.speed = -5;
      	} else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
      	this.switchToRunning();
      		this.vy -= 30;
      	} else {
      	    this.switchToStanding();
      		//this.speed = 0;s
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
    	return this.y >= 600 - this.height;
    }
 }

    

     class Gem {
     	constructor(spawnX,spawnY,popup){
     		this.width = 512;
     		this.height= 512;
     		this.popupImage = popup;
     		this.image = document.getElementById('gem1');
     		this.x = spawnX;
     		this.y = spawnY;
     		this.speed = gameSpeed * 8.5;
     		this.timer =0;
     	}
     	draw(context){
     	 this.timer+=.016;
     	     this.y += Math.sin(this.timer *5);

     		context.drawImage(this.image, this.x, this.y, this.width/4, this.height/4)
     	}

        hasGemReachedPlayerPosition(playerPosition){

            if(this.x <=playerPosition +200)
            {
                this.x= -5000
                return true;
            }
            else{
               return false;
            }
        }

        getPopupImage(){
        return this.popupImage;
        }

        update(){


          //horizontal
              this.x -= this.speed;
        }


     }

class PopUpImage{
     	constructor(imagePopup){
     		this.width = 600;
     		this.height= 500;
     		this.image = imagePopup;
     		this.x = 600;
     		this.y = 200;
     	}
     	draw(context){
     		context.drawImage(this.image, this.x, this.y, this.width, this.height)
     	}

     }


     const popupImage1 = new Image();
     popupImage1.src = 'testimage.png';
    const popupImage2 = new Image();
    popupImage2.src = 'testimage.png';
    const popupImage3 = new Image();
    popupImage3.src = 'testimage.png';
     const popupImage4 = new Image();
   popupImage4.src = 'testimage.png';
    const popupImage5 = new Image();
     popupImage5.src = 'testimage.png';



     const input = new InputHandler();
     const player = new Player(canvas.width, canvas.height);
     const gem1 = new Gem(2000,400,popupImage1);
     const gem2 = new Gem(3000,400,popupImage2);
     const gem3 = new Gem(4000,400,popupImage3);
     const gem4 = new Gem(5000,400,popupImage4);
     const gem5 = new Gem(6000,400,popupImage5);

    const gemObjects = [gem1,gem2,gem3,gem4,gem5];

 const popObjects =[];
     function animate(){


if(popObjects.length ==0){
ctx.clearRect(0,0, canvas.width, canvas.height);
     	gameObjects.forEach(object =>{
     	if(player.isPlayerRunning()){
             	    object.startScrolling();
             	}
             	else{
             	    object.stopScrolling();
        }
     	object.update();
     	object.draw();
         });

     	 player.draw(ctx);
         player.update(input);

       for( var i = 0; i < gemObjects.length; i++){
            if(player.isPlayerRunning()){
                         gemObjects[i].update();
             }
              gemObjects[i].draw(ctx);
               if( gemObjects[i].hasGemReachedPlayerPosition(player.x)){

                            popObjects.push(new PopUpImage(  gemObjects[i].getPopupImage()));
                            gemObjects.splice(i, 1);
              }


       }
}
else{
   popObjects.forEach(object =>{
                 object.draw(ctx);
                 });

              if (input.keys.indexOf('ArrowLeft') > -1){
                    console.log("werk "+popObjects.length)
                popObjects.splice(0, 1)
              }
}
console.log(popObjects.length)
     	 requestAnimationFrame(animate);

     }
  
   animate();
});













