const config = {
    width: 1000,
    height: 1000,
    type: Phaser.AUTO,
    parent: 'battleship',
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: Scene
};

const game = new Phaser.Game(config);