class Skater extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame)

        scene.add.existing(this) 
        this.isVroom = false     
        this.moveSpeed = 4       
    }



    update() {
        this.x += this.moveSpeed
        }
    }