const config = {
    width: 480,
    height: 800,
    type: Phaser.AUTO,
    parent: 'battleship',
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [BootScene, ShipsScene, AttackScene]
};

const game = new Phaser.Game(config);
game.global = {};