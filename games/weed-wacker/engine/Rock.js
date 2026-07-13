export default class Rock {

	static ROCKS = [
		{type: Symbol('basaltusk'), name: 'Basaltusk', toughness: 2, minLevel: 10},
		{type: Symbol('cragmantle'), name: 'Cragmantle', toughness: 4, minLevel: 20},
		{type: Symbol('shalecore'), name: 'Shalecore', toughness: 6, minLevel: 30},
		{type: Symbol('flintspire'), name: 'Flintspire', toughness: 9, minLevel: 40},
		{type: Symbol('ironvein'), name: 'Ironvein', toughness: 13, minLevel: 50},
	];

	static ROCK_MAP = new Map(Rock.ROCKS.map(rock => [rock.type, rock]));

	static getRockSpawnChances(level) {
		// Clamp level between 1 and 50 to prevent array out-of-bounds errors
		level = Math.max(1, Math.min(50, level));

		let weights = new Map();
		let totalWeight = 0;
		const lastRock = Rock.ROCKS[Rock.ROCKS.length - 1];

		// 1. Calculate raw progressive weights for each rock based on the current level
		Rock.ROCKS.forEach((rock) => {
			if (level < rock.minLevel) {
				weights.set(rock.type, 0); // Not unlocked yet
			} else if (level === rock.minLevel) {
				weights.set(rock.type, 5);
			} else {
				if (rock === lastRock) {
					// Enforce the specific target constraint: Scale linearly to a heavy bias by Level 50
					weights.set(rock.type, Math.max(1, (level - rock.minLevel) * 70));
				} else {
					// Normal progression: Growth phase right after unlocking
					let levelsPastUnlock = level - rock.minLevel;
					let growth = levelsPastUnlock * 8;
					// Decay phase: Older rocks start losing dominance as much higher levels are reached
					let decay = Math.max(0, (level - (rock.minLevel + 12)) * 6);
					weights.set(rock.type, Math.max(1, 5 + growth - decay));
				}
			}
			totalWeight += weights.get(rock.type);
		});
		console.log(weights);

		// 2. Convert raw weights into clean percentages that total up to 100%
		let percentages = new Map();
		let runningTotal = 0;

		weights.forEach((count, type) => {
			if (totalWeight === 0) {
				percentages.set(type, 0);
			} else if (type === lastRock.type) {
				// Force mathematical precision on the final item so everything sums exactly to 100%
				percentages.set(type, 100 - runningTotal);
			} else {
				let pct = ((count / totalWeight) * 100);
				percentages.set(type, pct);
				runningTotal += pct;
			}
		});
		console.log(percentages);

		// 3. Level 50 Override Protection to exactly hit your 75% constraint
		if (level === 50) {
			percentages.set(lastRock.type, 75.0);
			let remaining = 25.0;
			let activeRocksCount = Rock.ROCKS.filter(rock => rock.type !== lastRock.type).length;

			// Distribute the remaining 25% across the other 9 unlocked rocks (~2.7% each)
			weights.forEach((count, type) => {
				if (type !== lastRock.type) {
					percentages.set(type, remaining / activeRocksCount);
				}
			});
		}

		return percentages;
	}


	#toughness;
	#type;

	constructor(type) {
		const rock = Rock.ROCK_MAP.get(type);
		if (!rock) {
			throw new Error('Invalid rock type');
		}
		this.#type = rock.type;
		this.#toughness = rock.toughness;
	}

	get type() {
		return this.#type;
	}

	get toughness() {
		return this.#toughness;
	}

	adjustToughness(amount) {
		this.#toughness += amount;
	}

}
	
