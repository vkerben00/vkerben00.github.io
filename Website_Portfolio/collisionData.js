const collisionsLevel1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,
            0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
            0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
            0, 292, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
            0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

Array.prototype.parse2D = function() {
    const rows = []
    for (let i=0; i < this.length; i+=16){
        rows.push(this.slice (i, i +16))
    }
  return rows
}

class CollisionBlock {
    constructor({ position}){
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
     }
}

const collisionBlocks = []

const parsedCollisions = collisionsLevel1.parse2D()
 parsedCollisions.forEach(( row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 292) {            
         collisionBlocks.push(
            new CollisionBlock({
                position: {
                    x: x * 64, 
                    y: y * 64,
                },
              })
            )  
           } 
       })
})