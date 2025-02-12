class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        // Initialize any global settings here
    }

    create() {
        // Tile sprite
        this.road = this.add.tileSprite(0, 0, 1280, 1080, 'road').setOrigin(0, 0);

        // Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // Initialize score
        this.p1Score = 0;

        // Display the score
        this.scoreText = this.add.text(20, 20, `Score: ${this.p1Score}`, {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#AAFF00',
            fontWeight: 'bold'
        });

        // START! UI
        this.fireText = this.add.text(game.config.width / 2, game.config.height / 2, 'START!', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#AAFF00',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        // Hide START! text
        this.time.delayedCall(2000, () => {
            this.fireText.visible = false;
        });

        // Game over flag
        this.gameOver = false;

        // Bus animations
        this.anims.create({
            key: 'drive',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bus2', {
                start: 0,
                end: 1
            })
        });

        // Set up player bus (physics sprite) and set properties
        Bus = this.physics.add.sprite(4, centerY, 'bus').setOrigin(0.5);
        Bus.setCollideWorldBounds(true);
        Bus.anims.play('drive');
        Bus.setBounce(0.5);
        Bus.setImmovable();
        Bus.setMaxVelocity(0, 500);
        Bus.setDragY(100);
        Bus.setDepth(3); // Ensures that bus stays above other sprites
        Bus.destroyed = false; // Custom property to track bus state
        Bus.setSize(100, 175, true);
        Bus.setOffset(100,75);

        // Define bus velocity
        this.BusVelocity = 100;

        this.childSpeed = -360;
        this.grandmaSpeed = -360;

        // Define child and grandma
        this.child = 0;
        this.grandma = 0;

        // Groups for children and grandmas
        this.childGroup = this.add.group({ runChildUpdate: true });
        this.grandmaGroup = this.add.group({ runChildUpdate: true });

        // Set up repeated spawning for grandmas
        this.time.addEvent({
            delay: 2000, // Spawn a grandma every 3 seconds
            callback: this.addGrandma,
            callbackScope: this,
            loop: true
        });

        // Set up repeated spawning for children
        this.time.addEvent({
            delay: 5000, // Spawn a child every 5 seconds
            callback: this.addChild,
            callbackScope: this,
            loop: true
        });

        // Cursor keys
        cursors = this.input.keyboard.createCursorKeys();

        // Add event for increasing child spawn rate over time
        this.time.addEvent({
            delay: 20000,
            callback: this.spamChild,
            callbackScope: this,
            loop: true
        });

        this.childSpam = 1;

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // Add points over time for surviving
        this.time.addEvent({
            delay: 1000, // Every second
            callback: () => {
                if (!this.gameOver) {
                    this.p1Score += 10; // Add 10 points
                    this.scoreText.setText(`Score: ${this.p1Score}`); // Update score text
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    addChild() {
        let speedVary = Phaser.Math.Between(0, 50);
        let child = new Child(this, this.childSpeed - speedVary, 'childTexture').setScale();
        child.body.setSize(75, 75);
        child.body.setOffset(115, 75);
        this.childGroup.add(child);
        child.body.setAllowGravity(false);
        console.log('Child spawned!');
    }

    addGrandma() {
        let speedVary = Phaser.Math.Between(0, 50);
        let grandma = new Grandma(this, this.grandmaSpeed - speedVary, 'grandmaTexture').setScale();
        grandma.body.setSize(75,150);
        grandma.body.setOffset(125, 75);
        this.grandmaGroup.add(grandma);
        grandma.body.setAllowGravity(false);
        console.log('Grandma spawned!');
    }

    update() {
        this.road.tilePositionX -= -5;

        // START! check
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('instructionScene');
        }

        // Make sure bus is alive
        if (!Bus.destroyed) {
            // Check player input
            if (cursors.up.isDown) {
                Bus.body.velocity.y -= this.BusVelocity;
            } else if (cursors.down.isDown) {
                Bus.body.velocity.y += this.BusVelocity;
            }
        }

        // Check for collisions
        this.physics.world.collide(Bus, this.grandmaGroup, this.gbusCollision, null, this);
        this.physics.world.collide(Bus, this.childGroup, this.cbusCollision, null, this);
    }

    cbusCollision(Bus, child) {
        this.sound.play('kidscream', { volume: 1 });
        Bus.destroyed = true;
        this.gameOver = true;

        if (this.gameOver === true) {
            this.sound.play('crash');
        }

        this.time.delayedCall(1500, () => {
            this.scene.start('gameOverScene');
        });
        child.destroy();
    }

    gbusCollision(Bus, grandma) {
        this.sound.play('ladyscream', { volume: 2 });
        Bus.destroyed = true;
        this.gameOver = true;

        if (this.gameOver === true) {
            this.sound.play('crash');
        }

        this.time.delayedCall(1500, () => {
            this.scene.start('gameOverScene');
        });
        grandma.destroy();
    }
    

    spamChild() {
        this.childSpam += 0.25;
        console.log('Increased child spawn rate!');
    }

    spamGrandma() {
        this.GrandmaSpam += 0.25;
        console.log('Increased child spawn rate!');
    }
}

