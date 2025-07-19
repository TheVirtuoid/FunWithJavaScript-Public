export default class GunPosition {
	static ONE = Symbol('one');
	static TWO = Symbol('two');
	static THREE = Symbol('three');
	static FOUR = Symbol('four');
	static FIVE = Symbol('five');
	static SIX = Symbol('six');
	static SEVEN = Symbol('seven');
	static EIGHT = Symbol('eight');
	static NINE = Symbol('nine');
	static TEN = Symbol('ten');
	static ELEVEN = Symbol('eleven');
	static TWELVE = Symbol('twelve');
	static NONE = Symbol('none');

	static POSITIONS = [
		GunPosition.ONE,
		GunPosition.TWO,
		GunPosition.THREE,
		GunPosition.FOUR,
		GunPosition.FIVE,
		GunPosition.SIX,
		GunPosition.SEVEN,
		GunPosition.EIGHT,
		GunPosition.NINE,
		GunPosition.TEN,
		GunPosition.ELEVEN,
		GunPosition.TWELVE,
		GunPosition.NONE
	];

	static ANGLES = new Map([
		[GunPosition.ONE, (-Math.PI / 2) + ((1 * 2 * Math.PI) / 12)],
		[GunPosition.TWO, (-Math.PI / 2) + ((2 * 2 * Math.PI) / 12)],
		[GunPosition.THREE, (-Math.PI / 2) + ((3 * 2 * Math.PI) / 12)],
		[GunPosition.FOUR, (-Math.PI / 2) + ((4 * 2 * Math.PI) / 12)],
		[GunPosition.FIVE, (-Math.PI / 2) + ((5 * 2 * Math.PI) / 12)],
		[GunPosition.SIX, (-Math.PI / 2) + ((6 * 2 * Math.PI) / 12)],
		[GunPosition.SEVEN, (-Math.PI / 2) + ((7 * 2 * Math.PI) / 12)],
		[GunPosition.EIGHT, (-Math.PI / 2) + ((8 * 2 * Math.PI) / 12)],
		[GunPosition.NINE, (-Math.PI / 2) + ((9 * 2 * Math.PI) / 12)],
		[GunPosition.TEN, (-Math.PI / 2) + ((10 * 2 * Math.PI) / 12)],
		[GunPosition.ELEVEN, (-Math.PI / 2) + ((11 * 2 * Math.PI) / 12)],
		[GunPosition.TWELVE, (-Math.PI / 2) + ((12 * 2 * Math.PI) / 12)],
		[GunPosition.NONE, null]
	]);

	static PLACEMENT_ORDER = [
		GunPosition.TWELVE,
		GunPosition.SIX,
		GunPosition.THREE,
		GunPosition.NINE,
		GunPosition.ONE,
		GunPosition.SEVEN,
		GunPosition.TEN,
		GunPosition.FOUR,
		GunPosition.ELEVEN,
		GunPosition.FIVE,
		GunPosition.EIGHT,
		GunPosition.TWO
	]
}