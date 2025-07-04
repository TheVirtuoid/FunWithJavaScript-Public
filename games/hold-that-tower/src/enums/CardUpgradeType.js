export default class CardUpgradeType {
	static DAMAGE = Symbol('damage');
	static SPEED = Symbol('speed');
	static RANGE = Symbol('range');
	static HEALTH = Symbol('health');
	static MAX_HEALTH = Symbol('max_health');

	static TYPES = [
		CardUpgradeType.DAMAGE,
		CardUpgradeType.SPEED,
		CardUpgradeType.RANGE,
		CardUpgradeType.HEALTH,
		CardUpgradeType.MAX_HEALTH
	];
}