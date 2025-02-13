class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add credits 
        this.add.image(0, 0, 'cred').setOrigin(0)

        // credits config
        let credConfig = {
            fontFamily: 'Courier',
            fontSize: '55px',
            color: '#000000',
            align: 'center'
        }
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start('menuScene')
            this.sound.play('cool'), {
                volume: 13
            }
        }
    }
}