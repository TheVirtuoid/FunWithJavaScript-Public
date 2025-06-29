export default class AmmoType {
	static BULLET = Symbol('bullet');
	static MISSILE = Symbol('missile');
	static ROCKET = Symbol('rocket');
	static LASER = Symbol('laser');
	static PLASMA = Symbol('plasma');
	static FLAME = Symbol('flame');
	static ENEMY = Symbol('enemy');

	static AMMO_TYPES = [
		AmmoType.BULLET,
		AmmoType.ROCKET,
		AmmoType.LASER,
		AmmoType.PLASMA,
		AmmoType.FLAME,
		AmmoType.ENEMY,
		AmmoType.MISSILE
	];
}