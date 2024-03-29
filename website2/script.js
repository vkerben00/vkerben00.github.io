window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;
    let gameSpeed = .5;
  

//audio
    const music1 = document.createElement('audio');
    music1.src = 'music.mp3';
    const music2 = document.createElement('audio');
    music2.src = 'ding.mp3';





  

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
                      e.key === 'ArrowRight' ||
                      e.key === 'Enter')
                    && this.keys.indexOf(e.key) === -1){
                  this.keys.push(e.key);
                    }
                 });
             window.addEventListener('keyup', e => {
                if (  e.key === 'ArrowDown' ||
                      e.key === 'ArrowUp' ||
                      e.key === 'ArrowLeft'||
                      e.key === 'ArrowRight' ||
                      e.key === 'Enter'){
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
        //this.switchToRunning();
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
        constructor(spawnX,spawnY,popup,gemImage){
            this.width = 512;
            this.height= 512;
            this.popupImage = popup;
            this.image = gemImage;
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
                music2.play();
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
            this.width = 500;
            this.height= 500;
            this.image = imagePopup;
            this.x = 850;
            this.y = 100;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }

     }


     const popupImage1 = new Image();
     popupImage1.src = 'popImage1.png';
    const popupImage2 = new Image();
    popupImage2.src = 'popImage2.png';
    const popupImage3 = new Image();
    popupImage3.src = 'popImage3.png';
     const popupImage4 = new Image();
   popupImage4.src = 'popImage4.png';
    const popupImage5 = new Image();
     popupImage5.src = 'popImage5.png';
     const popupImage6 = new Image();
     popupImage6.src = 'popImage6.png';


     const gemImage1 = new Image();
     gemImage1.src = 'Gems1.png';
    const gemImage2 = new Image();
    gemImage2.src = 'Gems2.png';
    const gemImage3 = new Image();
    gemImage3.src = 'Gems3.png';
     const gemImage4 = new Image();
   gemImage4.src = 'Gems4.png';
    const gemImage5 = new Image();
     gemImage5.src = 'Gems5.png';
     const gemImage6 = new Image();
     gemImage6.src = 'Gems6.png';

     const input = new InputHandler();
     const player = new Player(canvas.width, canvas.height);
     const gem1 = new Gem(2000,400,popupImage1,gemImage1);
     const gem2 = new Gem(3000,300,popupImage2,gemImage2);
     const gem3 = new Gem(4000,450,popupImage3,gemImage3);
     const gem4 = new Gem(5000,250,popupImage4,gemImage4);
     const gem5 = new Gem(6000,400,popupImage5,gemImage5);
     const gem6 = new Gem(6500,350,popupImage6,gemImage6);



    const gemObjects = [gem1,gem2,gem3,gem4,gem5,gem6];

var splashUp = true;
const splashImage = new Image();
     splashImage.src = 'titleCover.png';

 const popObjects =[];
     function animate(){
 ctx.clearRect(0,0, canvas.width, canvas.height);
if(splashUp){
     ctx.drawImage(splashImage,0,0,2400,700);

     if(input.keys.indexOf('Enter') > -1){
        splashUp = false;
     }
}
else{

if(popObjects.length ==0){
       
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

              if (input.keys.indexOf('Enter') > -1){
                  
                popObjects.splice(0, 1)
              }
}

}

         requestAnimationFrame(animate);

     }
  
    
   animate();
});