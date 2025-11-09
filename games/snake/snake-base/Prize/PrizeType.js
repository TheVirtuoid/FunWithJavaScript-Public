export default class PrizeType {
	static APPLE = Symbol('apple');
	static BANANA = Symbol('banana');
	static BOMB = Symbol('bomb');

	static TYPES = [
		PrizeType.APPLE,
		PrizeType.BANANA,
		PrizeType.BOMB
	];

	static VALUES = new Map([
		[PrizeType.APPLE, { value: 1, color: 'red', grow: true }],
		[PrizeType.BANANA, { value: 5, color: 'yellow', grow: false }],
		[PrizeType.BOMB, { value: 0, color: 'black', grow: false }],
	]);

	static DEFAULT_TYPE = PrizeType.APPLE;
	static DEFAULT_VALUE = 1;
}