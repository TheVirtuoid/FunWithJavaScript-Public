export default class Weed {

	static WEEDS = [
		{type: Symbol('thistlebite'), name: 'Thistlebite', toughness: 4, points: 1, minLevel: 1},
		{type: Symbol('gravelbane'), name: 'Gravelbane', toughness: 6, points: 2, minLevel: 3},
		{type: Symbol('vileclover'), name: 'Vileclover', toughness: 8, points: 3, minLevel: 5},
		{type: Symbol('brambleroot'), name: 'Brambleroot', toughness: 11, points: 4, minLevel: 8},
		{type: Symbol('stingnettle'), name: 'Stingnettle', toughness: 14, points: 5, minLevel: 11},
		{type: Symbol('prickleweed'), name: 'Prickleweed', toughness: 17, points: 6, minLevel: 14},
		{type: Symbol('mosschoke'), name: 'Mosschoke', toughness: 21, points: 8, minLevel: 17},
		{type: Symbol('crabvine'), name: 'Crabvine', toughness: 25, points: 10, minLevel: 21},
		{type: Symbol('flameleaf'), name: 'Flameleaf', toughness: 29, points: 13, minLevel: 25},
		{type: Symbol('dreadstalk'), name: 'Dreadstalk', toughness: 34, points: 18, minLevel: 30}
	];

	static WEED_MAP = new Map(Weed.WEEDS.map(weed => [weed.type, weed]));

	static getWeedSpawnChances(level) {
		// Clamp level between 1 and 50 to prevent array out-of-bounds errors
		level = Math.max(1, Math.min(50, level));

		let weights = new Map();
		let totalWeight = 0;
		const lastWeed = Weed.WEEDS[Weed.WEEDS.length - 1];

		// 1. Calculate raw progressive weights for each weed based on the current level
		Weed.WEEDS.forEach((weed) => {
			if (level < weed.minLevel) {
				weights.set(weed.type, 0); // Not unlocked yet
			} else if (level === weed.minLevel) {
				weights.set(weed.type, 5);
			} else {
				if (weed === lastWeed) {
					// Enforce the specific target constraint: Scale linearly to a heavy bias by Level 50
					weights.set(weed.type, Math.max(1, (level - weed.minLevel) * 70));
				} else {
					// Normal progression: Growth phase right after unlocking
					let levelsPastUnlock = level - weed.minLevel;
					let growth = levelsPastUnlock * 8;
					// Decay phase: Older weeds start losing dominance as much higher levels are reached
					let decay = Math.max(0, (level - (weed.minLevel + 12)) * 6);
					weights.set(weed.type, Math.max(1, 5 + growth - decay));
				}
			}
			totalWeight += weights.get(weed.type);
		});

		// 2. Convert raw weights into clean percentages that total up to 100%
		let percentages = new Map();
		let runningTotal = 0;

		weights.forEach((count, type) => {
			if (type === lastWeed.type) {
				// Force mathematical precision on the final item so everything sums exactly to 100%
				percentages.set(type, 100 - runningTotal);
			} else {
				let pct = ((count / totalWeight) * 100);
				percentages.set(type, pct);
				runningTotal += pct;
			}
		});

		// 3. Level 50 Override Protection to exactly hit your 75% constraint
		if (level === 50) {
			percentages.set(lastWeed.type, 75.0);
			let remaining = 25.0;
			let activeWeedsCount = Weed.WEEDS.filter(weed => weed.type !== lastWeed.type).length;

			// Distribute the remaining 25% across the other 9 unlocked weeds (~2.7% each)
			weights.forEach((count, type) => {
				if (type !== lastWeed.type) {
					percentages.set(type, remaining / activeWeedsCount);
				}
			});
		}

		return percentages;
	}


	#toughness;
	#points;
	#type;

	constructor(type) {
		const weed = Weed.WEED_MAP.get(type);
		if (!weed) {
			throw new Error('Invalid weed type');
		}
		this.#type = weed.type;
		this.#toughness = weed.toughness;
		this.#points = weed.points;
	}

	get type() {
		return this.#type;
	}

	get toughness() {
		return this.#toughness;
	}

	get points() {
		return this.#points;
	}

	adjustToughness(amount) {
		this.#toughness += amount;
	}

	isCut() {
		return this.#toughness <= 0;
	}

}
	
