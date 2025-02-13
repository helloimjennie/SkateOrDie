class InstructionScene extends Phaser.Scene {
    constructor() {
        super('instructionScene');
    }

    create() {
        // Display the instruction image (ensure it's preloaded in the preload method)
        this.add.sprite(0, 0, 'instructions').setOrigin(0, 0);

        // Define input keys to transition to the Play Scene
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Add some text to guide the player
        this.add.text(this.scale.width / 2, this.scale.height - 50, 'Press ENTER to Start', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center',
        }).setOrigin(0.5);
    }

    update() {
        // Check if the player presses ENTER to start the game
        if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
            this.sound.play('skate', { volume: 1 });
            
            // Transition to the Play Scene
            this.scene.start('playScene');

            // Set global game settings (optional)
            game.settings = {
                skaterSpeed: 3, // Updated from busSpeed to skaterSpeed
            };
        }
    }
}

