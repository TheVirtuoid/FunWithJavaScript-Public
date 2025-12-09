export default class Credits extends Phaser.Scene {
	#scrollingContent;
	#scrollSpeed = 100;
	#offset = 200;

	constructor() {
		super({ key: 'credits' });
	}

	create() {
		const { width, height } = this.scale;

		// 1. The Static Header
		this.add.text(width / 2 + this.#offset, 50, 'CREDITS', {
			fontFamily: '"Press Start 2P"',
			fontSize: '42px',
			fill: '#2222bb'
		}).setOrigin(0.5);

		// 2. The Content Data
		const content = [
			"CREATED / PROGRAMMED BY",
			"TheVirtuoid",
			"",
			"ARTWORK",
			"All icons from FlatIcon (flaticon.com)",
			"Krampus Coal - FlatIcon",
			"Asteroid Present - Freepik",
			"Krampus - Smashicons",
			"Lightning (Santa and Elf) - meaicon",
			"Santa - IconsNova",
			"Santa's Sleigh - Aranagraphics",
			"Elf Space Ship - Freepik",
			"Elf - Freepik",
			"",
			"Additional Bad Artwork - TheVirtuoid",
			"",
			"TECHNOLOGY",
			"2D Library - Phaser JS",
			"IDE - JetBrains WebStorm",
			"AI Assistant - JetBrains AI",
			"Graphics - Gimp",
			"Hosting - AWS",
			"Repository - GitHub",
			"(github.com/TheVirtuoid/funwithjavascript-public)",
			"Website - virtuoid.com",
			"Bluesky - @thevirtuoid.bsky.social",
			"Patreon - patreon.com/TheVirtuoid",
			"YouTube - youtube.com/TheVirtuoid",
			"",
			"MUSIC",
			"None! Yet...",
			"",
			"SPECIAL THANKS",
			"You, the player!",
			"",
			"HAPPY HOLIDAYS!"
		];

		// 3. The Scrolling Text Object
		this.#scrollingContent = this.add.text(width / 2 + this.#offset, height, content, {
			fontFamily: '"Press Start 2P"',
			fontSize: '16px',
			fill: '#aabbcc',
			align: 'center',
			lineSpacing: 20
		}).setOrigin(0.5, 0); // Origin at top-center

		const shape = this.make.graphics();
		shape.fillStyle(0xffffff);
		shape.fillRect(0, 100, width, height - 100);
		const mask = shape.createGeometryMask();
		this.#scrollingContent.setMask(mask);

		// 5. Input to exit
		/*this.input.on('pointerdown', () => {
			this.scene.stop('credits'); // Change 'start' to your actual menu key
		});*/
	}

	update(time, delta) {
		// Move text up
		const movementAmount = this.#scrollSpeed * (delta / 1000);
		this.#scrollingContent.y -= movementAmount;

		// If the bottom of the text goes off the top of the screen...
		if (this.#scrollingContent.y < -this.#scrollingContent.height) {
			// ...reset it to the bottom of the screen
			this.#scrollingContent.y = this.scale.height;
		}
	}
}