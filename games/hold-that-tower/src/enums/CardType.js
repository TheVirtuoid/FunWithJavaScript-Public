export default class CardType {
	static GUN = Symbol('gun');
	static TOWER = Symbol('tower');
	static RUNNER = Symbol('runner');

	static TYPES = [
		CardType.GUN,
		CardType.TOWER,
		CardType.RUNNER
	];
}