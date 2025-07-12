import DefensiveWall from "./DefensiveWall.js";
import Runner from "./Runner.js";
import GunPosition from "../enums/GunPosition.js";
import Gun from "./Gun.js";
import TowerUi from "./Ui/Tower.js";

export default class Tower {
	static DEFAULT_HEALTH = 100;
	static DEFAULT_MAX_HEALTH = 100;
	static DEFAULT_TURRET_SPIN_SPEED = 1;

	#health;
	#maxHealth;
	#guns;
	#runners;
	#defensiveWall;
	#turretSpinSpeed;
	#ui;

	constructor(args = {}) {
		const { scene, position } = args;
		this.#health = Tower.DEFAULT_HEALTH;
		this.#maxHealth = Tower.DEFAULT_MAX_HEALTH;
		this.#guns = [new Gun({ position: GunPosition.TWELVE, ammo: { damage: 10 } })];
		this.#runners = [new Runner()];
		this.#defensiveWall = new DefensiveWall();
		this.#turretSpinSpeed = Tower.DEFAULT_TURRET_SPIN_SPEED;
		this.#ui = new TowerUi({ scene: scene, position });
		this.#ui.create();
	}

	get health() {
		return this.#health;
	}

	get maxHealth() {
		return this.#maxHealth;
	}

	get guns() {
		return this.#guns;
	}

	get runners() {
		return this.#runners;
	}

	get defensiveWall() {
		return this.#defensiveWall;
	}

	get turretSpinSpeed() {
		return this.#turretSpinSpeed;
	}

	get ui() {
		return this.#ui;
	}

	get x() {
		return this.#ui.x;
	}

	get y() {
		return this.#ui.y;
	}

	get radius() {
		return this.#ui.radius;
	}

	get image() {
		return this.#ui.image;
	}

	takeDamage(ammo) {
		const towerDamage = this.#defensiveWall.takeDamage(ammo);
		this.#health = Math.max(0, this.health - towerDamage);
		console.log(this.#health);
		/*if (this.health === 0) {
			this.emit('gameOver');
		}*/
	}

	upgradeMaximumHealth(amount) {
		this.#maxHealth += amount;
	}

	upgradeHealth(amount) {
		this.#health = Math.min(this.maxHealth, this.health + amount);
	}

	upgradeDefensiveWallArmor(amount) {
		this.defensiveWall.upgradeArmor(amount);
	}

	addRunner(runner) {
		if (runner instanceof Runner) {
			this.runners.push(runner);
		} else {
			throw new Error('Invalid runner');
		}
	}

	upgradeRunnersHitPoints(amount) {
		this.runners.forEach(runner => {
			runner.upgradeHitPoints(amount);
		});
	}

	upgradeRunnersSpeed(amount) {
		this.runners.forEach(runner => {
			runner.upgradeSpeed(amount);
		});
	}

	addGun(gun, position) {
		if (this.guns.length >= 12) {
			return;
		}
		if (this.guns.some((oldGun) => oldGun.position === position)) {
			return;
		}
		gun.setPosition(position);
		this.guns.push(gun);
	}
}