class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
    }

    create() {
        this.road = this.add.tileSprite(0, 0, 1280, 1080, 'road').setOrigin(0, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.p1Score = 0;

        this.scoreText = this.add.text(20, 20, `Score: ${this.p1Score}`, {
            fontFamily: 'Victor Mono',
            fontSize: '32px',
            color: '#FFFFFF',
            fontWeight: 'bold'
        });

        this.fireText = this.add.text(game.config.width / 2, game.config.height / 2, 'START!', {
            fontFamily: 'Victor Mono',
            fontSize: '32px',
            color: '#4F7942',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        this.time.delayedCall(2000, () => {
            this.fireText.visible = false;
        });

        this.gameOver = false;
        
        this.anims.create({
            key: 'drive',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('skater', {
                start: 0,
                end: 1
            })
        });
        Skater = this.physics.add.sprite(4, centerY, 'bus').setOrigin(0.5);
        Skater.setCollideWorldBounds(true);
        Skater.anims.play('drive');
        Skater.setBounce(0.2);
        Skater.setImmovable(false);
        Skater.setMaxVelocity(0, 550);
        Skater.setDragY(300);
        Skater.setDragX(300);
        Skater.setDepth(3);
        Skater.destroyed = false;
        Skater.setSize(100, 175, true);
        Skater.setOffset(100, 75);
        
        this.SkaterVelocity = 150;        

        this.kittySpeed = -360;
        this.policeSpeed = -360;

        // Define kitty and police
        this.kitty = 0;
        this.police = 0;

        // Groups for kitties and police
        this.kittyGroup = this.add.group({ runChildUpdate: true });
        this.policeGroup = this.add.group({ runChildUpdate: true });

        // Set up repeated spawning for police
        this.time.addEvent({
            delay: 5000, // Spawn a police every 3 seconds
            callback: this.addPolice,
            callbackScope: this,
            loop: true
        });

        // Set up repeated spawning for kitties
        this.time.addEvent({
            delay: 5000, // Spawn a kitty every 5 seconds
            callback: this.addKitty,
            callbackScope: this,
            loop: true
        });

        // Cursor keys
        cursors = this.input.keyboard.createCursorKeys();

        // Add event for increasing kitty spawn rate over time
        this.time.addEvent({
            delay: 20000,
            callback: this.spamKitty,
            callbackScope: this,
            loop: true
        });

        this.kittySpam = 1;

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

    addKitty() {
        let speedVary = Phaser.Math.Between(0, 50);
        let kitty = new Kitty(this, this.kittySpeed - speedVary, 'kittyTexture').setScale();
        kitty.body.setSize(75, 75);
        kitty.body.setOffset(115, 75);
        this.kittyGroup.add(kitty);
        kitty.body.setAllowGravity(false);
        console.log('Kitty spawned!');
    }

    addPolice() {
        let speedVary = Phaser.Math.Between(0, 50);
        let police = new Police(this, this.policeSpeed - speedVary, 'policeTexture').setScale();
        police.body.setSize(75, 150);
        police.body.setOffset(125, 75);
        this.policeGroup.add(police);
        police.body.setAllowGravity(false);
        console.log('Police spawned!');
    }

    update() {
        this.road.tilePositionX -= -5;

        // START! 
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('instructionScene');
            this.sound.play('dj');
        }

        // Make sure skater is alive
        if (!Skater.destroyed) {
            // Check player input
            if (cursors.up.isDown) {
                Skater.body.velocity.y -= this.SkaterVelocity;
            } else if (cursors.down.isDown) {
                Skater.body.velocity.y += this.SkaterVelocity;
            }
        }

        // Check for collisions
        this.physics.world.collide(Skater, this.policeGroup, this.pskaterCollision, null, this);
        this.physics.world.collide(Skater, this.kittyGroup, this.kskaterCollision, null, this);
    }

    kskaterCollision(Skater, kitty) {
        this.sound.play('meow', { volume: 1 });
        Skater.destroyed = true;
        this.gameOver = true;

        if (this.gameOver === true) {
            this.sound.play('crash');
        }

        this.time.delayedCall(1500, () => {
            this.scene.start('gameOverScene');
        });
        kitty.destroy();
    }

    pskaterCollision(Skater, police) {
        this.sound.play('sirens', { volume: 2 });
        Skater.destroyed = true;
        this.gameOver = true;

        if (this.gameOver === true) {
            this.sound.play('crash');
        }

        this.time.delayedCall(1500, () => {
            this.scene.start('gameOverScene');
        });
        police.destroy();
    }

    spamKitty() {
        this.kittySpam += 0.25;
        console.log('Increased kitty spawn rate!');
    }

    spamPolice() {
        this.policeSpam += 0.25;
        console.log('Increased police spawn rate!');
    }
}







