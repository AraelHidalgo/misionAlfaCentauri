const config = {
    type: Phaser.AUTO,
    //Consol.log(window.innerWidth, window.innerHeight);
    width: window.innerWidth,
    height: window.innerHeight,
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
    this.load.image('fondo1', 'assets/entorno/fondo1.jpeg')
    this.load.image('fondo2', 'assets/fondo2.jpeg')
    this.load.image('pato', 'assets/pato1.png');
}

function create() {
    let fondo = this.add.image(0, 0, 'fondo1');
    fondo.setOrigin(0, 0);
    fondo.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    this.add.image(400, 300, 'pato');
}

function update() {
    // No se necesita lógica de actualización en este ejemplo
    // Aquí puedes agregar la lógica de actualización del juego
}