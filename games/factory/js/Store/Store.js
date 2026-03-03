import Extractor from "../Extractor/Extractor.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Purifier from "../Purifier/Purifier.js";
import Combinator from "../Combinator/Combinator.js";

export default class Store {
	#conveyors;
	#purifiers;
	#extractors;
	#combinators;
	#level;
	#id;

	constructor() {
		this.#id = window.crypto.randomUUID();
		this.#level = 0;
		this.#conveyors = new Map();
		this.#purifiers = new Map();
		this.#extractors = new Map();
		this.#combinators = new Map();
	}

	get id() {
		return this.#id;
	}
	get level() {
		return this.#level;
	}
	get conveyors() {
		return new Map([...this.#conveyors]);
	}
	get purifiers() {
		return new Map([...this.#purifiers]);
	}
	get extractors() {
		return new Map([...this.#extractors]);
	}
	get combinators() {
		return new Map([...this.#combinators]);
	}

	incrementLevel() {
		this.#level++;
		this.#adjustStoreLevel();
	}

	reset() {
		this.#conveyors.clear();
		this.#purifiers.clear();
		this.#extractors.clear();
		this.#combinators.clear();
		this.#level = 0;
	}

	start() {
		this.reset();
		this.incrementLevel();
	}

	getExtractor(extractor) {
		if (Extractor.Has(extractor)) {
			const price = this.#extractors.get(extractor);
			return { price };
		}
	}

	getPurifier(purifier) {
		if (Purifier.Has(purifier)) {
			const price = this.#purifiers.get(purifier);
			return { price };
		}
	}

	getCombinator(combinator) {
		if (Combinator.Has(combinator)) {
			const price = this.#combinators.get(combinator);
			return { price };
		}
	}


	#adjustStoreLevel() {
		if (this.level > 7 ) this.#setLevel8();
		if (this.level > 6 ) this.#setLevel7();
		if (this.level > 5 ) this.#setLevel6();
		if (this.level > 4 ) this.#setLevel5();
		if (this.level > 3 ) this.#setLevel4();
		if (this.level > 2 ) this.#setLevel3();
		if (this.level > 1 ) this.#setLevel2();
		this.#setLevel1();
	}

	#setLevel1() {
		this.#conveyors.set(Conveyor.STRAIGHT, { price: 10 });
		this.#conveyors.set(Conveyor.CURVE_LEFT, { price: 10 });
		this.#conveyors.set(Conveyor.CURVE_RIGHT, { price: 10 });
		this.#conveyors.set(Conveyor.T_INTERSECTION_RIGHT, { price: 10 });
		this.#conveyors.set(Conveyor.T_INTERSECTION_LEFT, { price: 10 });
		this.#conveyors.set(Conveyor.X_INTERSECTION, { price: 10 });
		this.#extractors.set(Extractor.AETHERITE, { price: Extractor.Price(Extractor.AETHERITE) });
	}

	#setLevel2() {
		this.#extractors.set(Extractor.PYROTITE, { price: Extractor.Price(Extractor.PYROTITE) });
		this.#purifiers.set(Purifier.AETHERITE, { price: 100 });
	}

	#setLevel3() {
		this.#extractors.set(Extractor.LUMINITE, { price: Extractor.Price(Extractor.LUMINITE) });
		this.#purifiers.set(Purifier.PYROTITE, { price: 100 });
		this.#combinators.set(Combinator.IGNISIUM, { price: 100 });
	}

	#setLevel4() {
		this.#extractors.set(Extractor.OBSIDIANITE, { price: Extractor.Price(Extractor.OBSIDIANITE) });
		this.#purifiers.set(Purifier.LUMINITE, { price: 100 });
		this.#combinators.set(Combinator.PHOTONIUM, { price: 100 });
	}

	#setLevel5() {
		this.#extractors.set(Extractor.ZENITHITE, { price: Extractor.Price(Extractor.ZENITHITE) });
		this.#purifiers.set(Purifier.OBSIDIANITE, { price: 100 });
		this.#combinators.set(Combinator.VOIDTISSIUM, { price: 100 });
	}

	#setLevel6() {
		this.#purifiers.set(Purifier.ZENITHITE, { price: 100 });
		this.#combinators.set(Combinator.SOLTARIUM, { price: 100 });
		this.#combinators.set(Combinator.MAGNANIUM, { price: 100 });
	}

	#setLevel7() {
		this.#combinators.set(Combinator.ETHERIUM, { price: 100 });
	}

	#setLevel8() {
		this.#combinators.set(Combinator.STARFORGE, { price: 100 });
	}

}