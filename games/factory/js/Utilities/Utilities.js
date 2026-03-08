import Game from "../Game/Game.js";

export default class Utilities {

	static 	GridToPosition = (position) =>{
		return {
			x: position.x * Game.UNIT_SIZE + Game.HALF_SIZE,
			y: position.y * Game.UNIT_SIZE + Game.HALF_SIZE
		};
	}

	static PositionToGrid = (position) => {
		return {
			x: Math.floor(position.x / Game.UNIT_SIZE),
			y: Math.floor(position.y / Game.UNIT_SIZE)
		};
	}

	static FormatShortNumber(value) {
		const abs = Math.abs(value);

		const formatWithSuffix = (num, suffix) => {
			if (num >= 100_000) return `${Math.floor(num / 1_000)} ${suffix}`; // xxx k
			if (num >= 10_000) return `${(Math.floor(num / 100) / 10).toFixed(1)} ${suffix}`; // xx.y k
			return `${(Math.floor(num / 10) / 100).toFixed(2)} ${suffix}`; // x.yy k
		};
		if (abs >= 1_000_000_000) {
			return formatWithSuffix(abs / 1_000_000, "b");
		}
		if (abs >= 1_000_000) {
			return formatWithSuffix(abs / 1_000, "m");
		}
		if (abs >= 1_000) {
			return formatWithSuffix(abs, "k");
		}
		return String(value);
	}

	constructor() {
		throw new Error('Cannot instantiate. Static class');
	}
}