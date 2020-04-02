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

const global = {
    socket: io("http://51.91.8.97:4002/"),
    room: null,
    coordinates: null
};

const game = new Phaser.Game(config);