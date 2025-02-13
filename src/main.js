// Name: Jennie Le
// Game: Skate or Die!
// Completion Time: 30 hrs
// Creative tilt (technical): If you press enter on the play scene, it shows the instructions again. 
// Creative tilt (visual): The game features a vibrant visual style inspired by urban skate culture!
// Players navigate through obstacles and avoid colliding with police officers and cats.
// The game features a vibrant visual style inspired by urban skate culture.
// The game uses a fast-paced soundtrack with a "DJ mix" vibe to enhance immersion.

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 1080,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Load, Menu, InstructionScene, Play, gameOver, Credits ]
}

let game = new Phaser.Game(config)

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let centerX = game.config.width / 2
let centerY = game.config.height / 2
let w = game.config.width
let h = game.config.height
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER, keyW, keyD, keyA, keyE
const SkaterVelocity = 200 
let skater = null 
let cursors;
