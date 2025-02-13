class Kitty extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // Set the initial position of the kitty (spawns off-screen to the right)
        super(scene, game.config.width + 150, Phaser.Math.Between(50, 430), 'kitty');

        this.parentScene = scene; // Reference to the main scene
        this.parentScene.add.existing(this); // Add to the scene
        this.parentScene.physics.add.existing(this); // Enable physics for this sprite
        this.setVelocityX(velocity); // Set horizontal velocity
        this.setImmovable(); // Prevent movement from external forces
        this.newKitty = true; // Custom property to track new spawn
    }

    update() {
        // Reduce dynamic spawning frequency
        if (this.newKitty && Phaser.Math.Between(1, 100) <= 1 && this.x < (game.config.width * 0.4)) {
            // 1% chance of spawning a new kitty when less than 40% across the screen
            this.parentScene.addKitty();
            this.newKitty = false; // Prevent repeated spawning from the same kitty
        }

        // Destroy the kitty if it moves off-screen (left side)
        if (this.x < -this.width) {
            this.destroy();
        }
    }
}

