import Ground from '/src/classes/Ui/Ground.js';
import Statistics from "../Statistics.js";

export default class Beginning extends Phaser.Scene {
	#ground;

	constructor() {
		super({
			key: 'beginning-scene',
		});
		this.#ground = new Ground({ scene: this });
	}

	preload() {
		Ground.preload(this);

		this.load.image('picture-frame', '/src/images/picture-frame.png');
		this.load.image('castle', '/src/images/castle.png');
		this.load.image('finger', '/src/images/one-finger.png');
		this.load.image('new-game-button', '/src/images/new-game-button.png');
	}

	create() {
		this.input.gamepad.enabled = true;
		const { width, height } = this.cameras.main;
		const middleX = Math.floor(width / 2);
		const middleY = Math.floor(height / 2);
		this.#ground.create();
		// this.add.image(100, 100, 'picture-frame').setOrigin(0, 0).setScale(0.5);
		const pictureFrame = this.add.image(500, 500, 'picture-frame').setScale(2).setVisible(false);
		pictureFrame.setPosition(Math.floor(width / 2), Math.floor(height / 2));
		pictureFrame.setVisible(true);

		this.add.text(middleX - 300, middleY - 150, 'Hold That Tower!', {
			fontFamily: '"Press Start 2P"',
			fontSize: '38px',
			fill: '#bb2222'
		});

		const castle = this.add.image(500, 500, 'castle').setScale(.5).setVisible(false);
		castle.setPosition(middleX, middleY);
		castle.setVisible(true);

		const fingerLeft = this.add.image(500, 500, 'finger').setScale(.15).setVisible(false);
		fingerLeft.setPosition(middleX - 150, middleY + 100);
		fingerLeft.rotation = Math.PI / 2;
		fingerLeft.setVisible(true);

		const fingerRight = this.add.image(500, 500, 'finger').setScale(.15).setVisible(false);
		fingerRight.setPosition(middleX + 150, middleY + 100);
		fingerRight.rotation = -Math.PI / 2;
		fingerRight.flipX = true;
		fingerRight.setVisible(true);

		const newGameButton = this.add.image(500, 500, 'new-game-button').setScale(.5).setVisible(false);
		newGameButton.setPosition(middleX, middleY + 100);
		newGameButton.setInteractive();
		newGameButton.once('pointerdown', this.#switchScenes.bind(this));
		newGameButton.setVisible(true);
	}

	update() {}

	#switchScenes() {
		this.scene.stop('beginning-scene');
		this.game.events.emit('start', 'game-play-scene');
		/*this.scene.get('game-play-scene').events.once('create', () => {
			if (gamepad && gamepad.connected) {
				this.scene.get('game-play-scene').input.gamepad.emit('connected', gamepad);
			}
		});*/

	}
}