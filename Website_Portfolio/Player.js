class Player extends Sprite {
    constructor({
        collisionBlocks = [], imageSrc, frameRate }) {
        super({imageSrc, frameRate})
        this.position = {
            x:200,
            y:200
        }

        this.velocity = {
            x:0,
            y:0
        }

        this.sides = {
            bottom: this.position.y + this.height,
        }
        this.gravity = 1

        this.collisionBlocks = collisionBlocks
       }


   update() {
    //c.fillStyle = 'rgba(0,0,255,.5)'
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    this.hitbox = {
      position: {
        x:this.position.x +58,
        y:this.position.y +34,
      },
      width: 50,
      height:53,
    }

    this.position.x += this.velocity.x
    // check for horizontal collisions 
    for (let i =0; i < this.collisionBlocks.length; i++){
        const collisionBlock = this.collisionBlocks[i]

        // if  collision exists
        if (this.hitbox.position.x <=  collisionBlock.position.x + collisionBlock.width &&
            this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x
            && this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
            && this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height)
     {
        //collision on the x axis going to the left
        if (this.velocity.x < 0) {
            this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01
            break
        }
         if (this.velocity.x > 0){
            this.position.x = collisionBlock.position.x - this.width - 0.01
            break
         }

      }
    }

// apply gravity 
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y

    //check for vertical collisions
for (let i =0; i < this.collisionBlocks.length; i++){
        const collisionBlock = this.collisionBlocks[i]

        // if  collision exists
        if (this.hitbox.position.x <=  collisionBlock.position.x + collisionBlock.width &&
            this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x
            && this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y
            && this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height)
     {
        //collision on the y axis going to the left
        if (this.velocity.y < 0) {
            this.velocity.y=0
            const offset = this.hitbox.position.y - this.position.y
            this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01
            break
        }
         if (this.velocity.y > 0){
            this.velocity.y = 0
            const offset = 
            this.hitbox.position.y - this.position.y + this.hitbox.height
            this.position.y = collisionBlock.position.y - offset - 0.01
            break
         }

      }
    }

   }

}
