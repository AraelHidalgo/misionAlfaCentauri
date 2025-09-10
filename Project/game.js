const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    backgroundColor: '#3498db',
    parent: "game",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);

function preload() {
    this.load.image('fondo1', 'assets/fondo1.jpg')
    this.load.image('pato', 'assets/pato1.png');
}

function create() {
    let fondo = this.add.image(0, 0, 'fondo1');
    fondo.setOrigin(0, 0);
    fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.add.image(400, 300, 'pato');
}

function update() {
    // Aquí puedes agregar la lógica de actualización del juego
}