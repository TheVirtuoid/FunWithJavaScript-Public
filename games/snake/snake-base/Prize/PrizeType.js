export default class PrizeType {
	static APPLE = Symbol('apple');

	static TYPES = [
		PrizeType.APPLE
	];

	static DEFAULT_TYPE = PrizeType.APPLE;
	static DEFAULT_VALUE = 1;
}