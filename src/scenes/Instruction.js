class InstructionScene extends Phaser.Scene {
    constructor() {
        super('instructionScene');
    }

    create() {
        this.add.sprite(0, 0, 'instructions').setOrigin(0, 0);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyENTER)) {
            this.sound.play('skate', { volume: 1 });
            
            this.scene.start('playScene');
            game.settings = {
                skaterSpeed: 3, 
            };
        }
    }
}

