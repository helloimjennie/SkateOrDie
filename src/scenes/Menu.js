class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // Title screen
        this.load.image("title", './assets/title.png');
        // Game over
        this.load.image('gameover', './assets/gameover.png');
        // Credits
        this.load.image('cred', './assets/credits.png');
        // Instruction
        this.load.image('instructions', './assets/instructions.png');

        // Assets
        this.load.image('road', './assets/road.png');
        this.load.image('car', './assets/skater.png');
        this.load.image('child', './assets/kitty.png');
        this.load.image('grandma', './assets/police.png');

        this.load.spritesheet('bus2', './assets/skater2.png', {
            frameWidth: 300,
            frameHeight: 300
        });

        this.load.spritesheet('childRUN', './assets/kidrun.png', {
            frameWidth: 64,
            frameHeight: 32
        });

        this.load.image('hole', './assets/hole.png');

        // Load audio
        this.load.audio('music', './assets/music.wav');
        this.load.audio('crash', './assets/sound effects/crash.wav');
        this.load.audio('skate', './assets/sound effects/skate.mp3');
        this.load.audio('beep', './assets/sound effects/scratch3.wav');
        this.load.audio('kidscream', './assets/sound effects/kitty.mp3');
        this.load.audio('ladyscream', './assets/sound effects/police.mp3');
        this.load.audio('yay', './assets/sound effects/scratch2.wav');
    }

    create() {
        // Title screen
        this.add.sprite(640, 540, 'title');

        // Background music
        this.bgMusic = this.sound.add('music', { volume: 0.1, loop: true });

        if (!this.musicPlayed) {
            this.bgMusic.play();
            this.musicPlayed = true;
        }

        // Define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER) || Phaser.Input.Keyboard.JustDown(keyE)) {
            // Play sound effect when transitioning to the playScene
            

            // Start the next scene
            this.scene.start('instructionScene');

            // Optional game settings (if needed)
            game.settings = {
                busSpeed: 3,
            };

            // Beep sound for feedback
            this.sound.play('beep');
        }
    }
}
