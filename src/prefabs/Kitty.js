class Kitty extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, game.config.width + 150, Phaser.Math.Between(50, 430), 'kitty');

        this.parentScene = scene; 
        this.parentScene.add.existing(this); 
        this.parentScene.physics.add.existing(this); 
        this.setVelocityX(velocity); 
        this.setImmovable(); 
        this.newKitty = true; 
    }

    update() {
        if (this.newKitty && Phaser.Math.Between(1, 100) <= 1 && this.x < (game.config.width * 0.4)) {
            this.parentScene.addKitty();
            this.newKitty = false; 
        }
        if (this.x < -this.width) {
            this.destroy();
        }
    }
}

