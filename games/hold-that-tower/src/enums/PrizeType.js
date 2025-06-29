export default class PrizeType {
	static GUN = Symbol('gun');
	static TOWER = Symbol('tower');
	static RUNNER = Symbol('runner');
	static NONE = Symbol('none');

	static TYPES = [
		PrizeType.GUN,
		PrizeType.TOWER,
		PrizeType.RUNNER,
		PrizeType.NONE
	];
}