export default class GameController {
	#scene;
	#pad;
	#online = false;
	#leftTriggerDown = false;
	#rightTriggerDown = false;


	constructor(scene) {
		this.#scene = scene;
		this.#scene.input.gamepad.enabled = true;
		this.#scene.input.gamepad.once('connected', (pad) => {
			this.#pad = pad;
			console.log(this.#pad);
			this.#online = true;
		});
		if (this.#scene.input.gamepad.total) {
			this.#pad = this.#scene.input.gamepad.gamepads[0];
			this.#online = true;
		}
	}

	get leftStick() {
		return this.#pad?.leftStick;
	}

	get rightStick() {
		return this.#pad?.rightStick;
	}

	get buttons() {
		return this.#pad?.buttons;
	}

	get left() {
		return this.#pad?.left;
	}

	get right() {
		return this.#pad?.right;
	}

	get up() {
		return this.#pad?.up;
	}

	get down() {
		return this.#pad?.down;
	}

	get online() {
		return this.#online;
	}

	get gameStart() {
		return this.#pad?.Y;
	}

	get leftFireMissile() {
		const triggered = !!this.#pad.L2;
		if (triggered && !this.#leftTriggerDown) {
			this.#leftTriggerDown = true;
			return true;
		} else if (!triggered && this.#leftTriggerDown) {
			this.#leftTriggerDown = false;
			return false;
		}
	}

	get rightFireMissile() {
		const triggered = !!this.#pad.R2;
		if (triggered && !this.#rightTriggerDown) {
			this.#rightTriggerDown = true;
			return true;
		} else if (!triggered && this.#rightTriggerDown) {
			this.#rightTriggerDown = false;
			return false;
		}
	}

	getThrust() {
		const { x: axisH = 0, y: axisV = 0 } = this.leftStick
		// Deadzone to avoid drift
		const deadZone = 0.2;
		let thrustX = Math.abs(axisH) > deadZone ? axisH : 0;
		let thrustY = Math.abs(axisV) > deadZone ? axisV : 0;

		const dPadLeft = this.left || this.buttons[14]?.pressed;
		const dPadRight = this.right || this.buttons[15]?.pressed;
		const dPadUp = this.up || this.buttons[12]?.pressed;
		const dPadDown = this.down || this.buttons[13]?.pressed;

		if (dPadLeft)  thrustX = -1;
		if (dPadRight) thrustX =  1;
		if (dPadUp)    thrustY = -1;
		if (dPadDown)  thrustY =  1;

		// If there is any thrust, normalize so diagonals aren't faster
		if (thrustX !== 0 || thrustY !== 0) {
			const len = Math.hypot(thrustX, thrustY);
			thrustX /= len;
			thrustY /= len;
		}
		return { thrustX, thrustY };
	}

}