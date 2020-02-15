const config = {
    width: 1000,
    height: 1000,
    type: Phaser.AUTO,
    parent: 'battleship',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: Scene
};

const game = new Phaser.Game(config);