class gameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        // Add game over screen
        let gameOverScreen = this.add.sprite(0, 0, 'gameover').setOrigin(0, 0);

        // Play game over soun

        // Game over config
        let ggConfig = {
            fontFamily: 'Courier',
            fontSize: '40px',
            color: '#FFFFFF',
            align: 'center'
        };

        // Define keys
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        // M for menu
        if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.sound.play('dj');
            this.scene.start('menuScene');
        }

        // R to restart
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.sound.play('dj');
            this.scene.start('playScene');
        }

        // C to credits
        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            this.sound.play('cool');
            this.scene.start('creditsScene');
        }
    }
}
