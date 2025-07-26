import DefensiveWall from "./DefensiveWall.js";
import Runner from "./Runner.js";
import GunPosition from "../enums/GunPosition.js";
import Gun from "./Gun.js";
import TowerUi from "./Ui/Tower.js";
import GameEvent from "../enums/GameEvent.js";

export default class Tower {
	static DEFAULT_HEALTH = 100;
	static DEFAULT_MAX_HEALTH = 100;
	static DEFAULT_TURRET_ROTATION_SPEED = .04;

	#health;
	#maxHealth;
	#guns;
	#runners;
	#defensiveWall;
	#turretRotationSpeed;
	#ui;
	#scene;

	static preload(scene) {
		TowerUi.preload(scene);
		Runner.preload(scene);
		Gun.preload(scene);
	}

	constructor(args = {}) {
		const { scene, position } = args;
		this.#health = Tower.DEFAULT_HEALTH;
		this.#maxHealth = Tower.DEFAULT_MAX_HEALTH;
		this.#scene = scene;
		this.#runners = [new Runner({ scene })];
		this.#defensiveWall = new DefensiveWall();
		this.#turretRotationSpeed = Tower.DEFAULT_TURRET_ROTATION_SPEED;
		this.#ui = new TowerUi({ scene: scene, position });
		this.#ui.create();
		this.#guns = [
			new Gun({
				centerX: this.x,
				centerY: this.y,
				radius: this.radius,
				scene: this.#scene,
				placement: GunPosition.PLACEMENT_ORDER[0],
				ammo: { damage: 10 } }),
		];
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

	get turretRotationSpeed() {
		return this.#turretRotationSpeed;
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
		if (this.health === 0) {
			GameEvent.Emit(GameEvent.GAME_OVER);
		}
		return this.#health;
	}

	setMaxHealth(health) {
		this.#maxHealth = health;
		this.#health = Math.min(this.#maxHealth, this.#health);
	}

	setHealth(health) {
		this.#health = Math.min(this.#maxHealth, health);
	}

	setTurretRotationSpeed(speed) {
		this.#turretRotationSpeed = speed;
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

	addRunner() {
		const runner = new Runner({ scene: this.#scene });
		this.runners.push(runner);
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

	addGun() {
		this.guns.forEach((gun) => gun.resetPosition());
		const gun = new Gun({
			centerX: this.x,
			centerY: this.y,
			radius: this.radius,
			scene: this.#scene,
			placement: GunPosition.PLACEMENT_ORDER[this.#guns.length],
			ammo: {} });
		this.guns.push(gun);
	}
}