import '/src/css/hold-that-tower.pcss';
import Phaser from 'phaser';

class Game extends Phaser.Scene {
	constructor() {
		super();
	}

	preload ()
	{
		// this.load.setBaseURL('localhost:5173');
		this.load.image('toy', './images/shocktroopers-toy.png');
		this.load.bitmapFont('atari', './fonts/atari-classic.png', './fonts/atari-classic.xml');
		this.load.spritesheet('veg', './images/fruitnveg32wh37.png', { frameWidth: 32, frameHeight: 37 });
		this.load.image('mushroom', './images/mine.png');
		this.load.tilemapTiledJSON('map1', './images/super-mario.json');
		this.load.image('tiles1', './images/super-mario.png');
	}

	create ()
	{
		this.tilesprite = this.add.tileSprite(400, 300, 800, 600, 'mushroom');

		const map1 = this.make.tilemap({ key: 'map1' });
		const tileset1 = map1.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
		const layer1 = map1.createLayer('World1', tileset1, 0, 64).setScale(2);

		this.add.image(0, 600, 'toy').setOrigin(0, 1).setScale(2);

		this.add.text(400, 8, 'Phaser 3 pixelArt: true', { font: '16px Courier', fill: '#00ff00' }).setOrigin(0.5, 0).setScale(3);

		this.add.particles(400, 300, 'veg', {
			frame: 0,
			speed: 100,
			frequency: 300,
			lifespan: 4000
		}).setScale(4);

		this.add.bitmapText(400, 128, 'atari', 'PHASER').setOrigin(0.5).setScale(2);
	}

	update ()
	{
		this.tilesprite.tileScaleX = Math.max(2, Math.sin(this.iter) * 8);
		this.tilesprite.tileScaleY = Math.max(2, Math.sin(this.iter) * 8);

		this.iter += 0.01;
	}
}
const multiplier = .98;
const config = {
	type: Phaser.AUTO,
	width: window.innerWidth * multiplier,
	height: window.innerHeight * multiplier,
	parent: 'phaser-example',
	pixelArt: true,
	scene: Game
};

const game = new Phaser.Game(config);