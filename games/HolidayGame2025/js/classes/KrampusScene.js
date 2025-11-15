// import Statistics from "../Statistics.js";

export default class KrampusScene extends Phaser.Scene {
	#krampus;
	#gamepad;
	#speed = 400;

	#leftTriggerDown = false;
	#rightTriggerDown = false;

	constructor() {
		super({
			key: 'krampus',
		});
		this.#krampus = null;
		this.#gamepad = null;
	}

	preload() {
		/*this.load.image('picture-frame', '/src/images/picture-frame.png');
		this.load.image('castle', '/src/images/castle.png');
		this.load.image('finger', '/src/images/one-finger.png');
		this.load.image('new-game-button', '/src/images/new-game-button.png');*/
		this.load.image('krampus', '/img/gunner.png');
	}

	create() {
		this.input.gamepad.enabled = true;
		const { width, height } = this.cameras.main;
		const middleX = Math.floor(width / 2);
		const middleY = Math.floor(height / 2);

		this.#krampus = this.add.sprite(middleX, middleY, 'krampus');
		this.#krampus.setOrigin(0.5);
		this.#krampus.setScale(0.10);

		this.add.text(10, 10, 'Krampus-oid', {
			fontFamily: '"Press Start 2P"',
			fontSize: '38px',
			fill: '#bb2222'
		});

		const text = this.add.text(10, 70, 'Help Krampus save Christmas from Santa and his elves!', {
			fontFamily: '"Press Start 2P"',
			fontSize: '14px',
			fixedWidth: 400,
			fill: '#aabbcc',
			wordWrap: { width: 400, useAdvancedWrap: true },
			align: 'center'
		});

		this.physics.add.existing(this.#krampus);
		this.#krampus.body.setCollideWorldBounds(true);
		// Enable damping so drag is applied smoothly
		this.#krampus.body.setDamping(false);
		// Drag acts like friction; tune these values
		this.#krampus.body.setDrag(100, 100);
		// Limit maximum speed
		this.#krampus.body.setMaxVelocity(400, 400);

		// Treat #speed as THRUST (acceleration magnitude), not direct velocity
		this.#speed = 600; // pixels/sec²; tweak to taste

		// Gamepad setup
		this.input.gamepad.once('connected', (pad) => {
			this.#gamepad = pad;
		});

		if (this.input.gamepad.total) {
			this.#gamepad = this.input.gamepad.gamepads[0];
		}
	}

	update(time, delta) {
		if (!this.#gamepad || !this.#krampus){
			return;
		}

		// Read gamepad axes (left stick)
		const axisH = this.#gamepad.axes.length > 0 ? this.#gamepad.axes[0].getValue() : 0; // X axis
		const axisV = this.#gamepad.axes.length > 1 ? this.#gamepad.axes[1].getValue() : 0; // Y axis

		// Deadzone to avoid drift
		const deadZone = 0.2;
		let thrustX = Math.abs(axisH) > deadZone ? axisH : 0;
		let thrustY = Math.abs(axisV) > deadZone ? axisV : 0;

		// D-pad fallback (some controllers use buttons instead of axes for dpad)
		const dPadLeft = this.#gamepad.left || this.#gamepad.buttons[14]?.pressed;
		const dPadRight = this.#gamepad.right || this.#gamepad.buttons[15]?.pressed;
		const dPadUp = this.#gamepad.up || this.#gamepad.buttons[12]?.pressed;
		const dPadDown = this.#gamepad.down || this.#gamepad.buttons[13]?.pressed;

		if (dPadLeft)  thrustX = -1;
		if (dPadRight) thrustX =  1;
		if (dPadUp)    thrustY = -1;
		if (dPadDown)  thrustY =  1;

		// If there is any thrust, normalize so diagonals aren't faster
		if (thrustX !== 0 || thrustY !== 0) {
			const len = Math.hypot(thrustX, thrustY);
			thrustX /= len;
			thrustY /= len;

			// Apply thrust as acceleration
			this.#krampus.body.setAcceleration(thrustX * this.#speed, thrustY * this.#speed);
		} else {
			// No thrust — coast with current velocity (drag will slow it down)
			this.#krampus.body.setAcceleration(0, 0);
		}

		// Buttons 6 & 7 are LT/RT on most Xbox-style controllers.
		const leftButton = this.#gamepad.buttons[6];
		const rightButton = this.#gamepad.buttons[7];

		const leftDown = leftButton && leftButton.pressed;
		const rightDown = rightButton && rightButton.pressed;

		// Fire once on press (rising edge)
		if (leftDown && !this.#leftTriggerDown) {
			this.#fireLeftMissile();
		}
		if (rightDown && !this.#rightTriggerDown) {
			this.#fireRightMissile();
		}

		// Remember state for next frame
		this.#leftTriggerDown = leftDown;
		this.#rightTriggerDown = rightDown;
	}

	#fireLeftMissile() {
		console.log('Fire left missile');
	}

	#fireRightMissile() {
		console.log('Fire right missile');
	}
}