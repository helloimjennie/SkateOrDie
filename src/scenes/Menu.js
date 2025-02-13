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
        this.load.image('skater2', './assets/skater.png');
        this.load.image('kitty', './assets/kitty.png'); 
        this.load.image('police', './assets/police.png'); 

        this.load.spritesheet('skater', './assets/skater2.png', {
            frameWidth: 300,
            frameHeight: 300
        });

        // Load audio
        this.load.audio('music', './assets/music.wav');
        this.load.audio('crash', './assets/sound effects/crash.wav');
        this.load.audio('skate', './assets/sound effects/skate.mp3');
        this.load.audio('dj', './assets/sound effects/scratch3.wav');
        this.load.audio('meow', './assets/sound effects/kitty.mp3'); 
        this.load.audio('sirens', './assets/sound effects/police.mp3'); 
        this.load.audio('cool', './assets/sound effects/scratch2.wav');
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

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER) || Phaser.Input.Keyboard.JustDown(keyE)) {
            this.scene.start('instructionScene');
            this.sound.play('dj', { volume: 1 }); // Play DJ sound effect

            game.settings = {
                busSpeed: 3,
            };
        }
    }
}


