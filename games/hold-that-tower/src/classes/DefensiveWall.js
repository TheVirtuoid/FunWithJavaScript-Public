import Ammo from "./Ammo.js";

export default class DefensiveWall {
	static ARMOR_DAMAGE_BULLET = 0.01;
	static ARMOR_DAMAGE_MISSILE = 0.01;
	static ARMOR_DAMAGE_ENEMY = 0.05;

	#armor = 0;

	get armor() {
		return this.#armor;
	}

	upgradeArmor(amount) {
		this.#armor = Math.min(1, this.#armor + amount);
	}

	takeDamage(ammo) {
		let damage = 0;
		switch (ammo.type) {
			case Ammo.AMMO_TYPE_BULLET:
				damage = Math.floor(ammo.damage * this.#armor);
				this.#armor -= DefensiveWall.ARMOR_DAMAGE_BULLET;
				break;
			case Ammo.AMMO_TYPE_MISSILE:
				damage = Math.floor(ammo.damage * this.#armor);
				this.#armor -= DefensiveWall.ARMOR_DAMAGE_MISSILE;
				break;
			case Ammo.AMMO_TYPE_ENEMY:
				damage = Math.floor(ammo.damage * this.#armor);
				this.#armor -= DefensiveWall.ARMOR_DAMAGE_ENEMY;
				break;
			default:
				throw new Error('Unknown ammo type');
		}
		this.#armor = Math.max(0, this.#armor);
		return damage;
	}
}