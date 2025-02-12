class Child extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // Set the initial position of the child (spawns off-screen to the right)
        super(scene, game.config.width + 150, Phaser.Math.Between(50, 430), 'child');

        this.parentScene = scene; // Reference to the main scene
        this.parentScene.add.existing(this); // Add to the scene
        this.parentScene.physics.add.existing(this); // Enable physics for this sprite
        this.setVelocityX(velocity); // Set horizontal velocity
        this.setImmovable(); // Prevent movement from external forces
        this.newChild = true; // Custom property to track new spawn
    }

    update() {
        // Reduce dynamic spawning frequency
        if (this.newChild && Phaser.Math.Between(1, 100) <= 1 && this.x < (game.config.width * 0.4)) {
            // 1% chance of spawning a new child when less than 40% across the screen
            this.parentScene.addChild();
            this.newChild = false; // Prevent repeated spawning from the same child
        }

        // Destroy the child if it moves off-screen (left side)
        if (this.x < -this.width) {
            this.destroy();
        }
    }
}
