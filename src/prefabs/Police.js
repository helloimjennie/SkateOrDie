class Police extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        
        super(scene, game.config.width + 150, Phaser.Math.Between(100, game.config.height - 100), 'police');

        this.parentScene = scene; 
        this.parentScene.add.existing(this); 
        this.parentScene.physics.add.existing(this); 
        this.setVelocityX(velocity); 
        this.setImmovable(); 
        this.newPolice = true; 
    }

    update() {

        if (this.newPolice && Phaser.Math.Between(1, 100) <= 1 && this.x < (game.config.width * 0.4)) {
            
            this.parentScene.addPolice();
            this.newPolice = false; 
        }

        // Destroy the police if it moves off-screen (left side)
        if (this.x < -this.width) {
            this.destroy();
        }
    }
}




