import AmmoType from "../enums/AmmoType.js";

export default class DefensiveWall {
	static ARMOR_DAMAGE_DEFAULT = 0.01;
	static DEFAULT_ARMOR = 0;

	#armor = 0;
	#armorDamage = new Map([
		[AmmoType.BULLET, .01],
		[AmmoType.MISSILE, .01],
		[AmmoType.ENEMY, .05]
	]);

	get armor() {
		return this.#armor;
	}

	getArmorDamage(ammoType) {
		if (!AmmoType.AMMO_TYPES.includes(ammoType)) {
			throw new Error('Invalid ammo type');
		}
		return this.#armorDamage.get(ammoType) || DefensiveWall.ARMOR_DAMAGE_DEFAULT;
	}

	upgradeArmor(amount) {
		this.#armor = Math.min(1, this.#armor + amount);
	}

	takeDamage(ammo) {
		const armorDamageReducer = this.getArmorDamage(ammo.type);
		const damage = Math.floor(ammo.damage * (1 - this.#armor));
		this.#armor -= armorDamageReducer;
		this.#armor = Math.max(0, this.#armor);
		return damage;
	}
}