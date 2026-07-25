/*
export default class Stats {

	static FIELDS = [
		{ tag: "time", name: 'Time' },
		{ tag: "score", name: 'Score' },
		{ tag: "power", name: 'Power' },
		{ tag: "speed", name: 'Speed' },
		{ tag: "range", name: 'Range' },
		{ tag: "durability", name: 'Durability' },
		{ tag: "spawn-rate", name: 'Spawn Rate' }
	];

	#data = {};
	#dom = {};

	constructor() {
		this.reset();
	}

	getStat(field) {
		return this.#data[field];
	}

	adjustStat(field, value) {
		this.#data[field] += value;
		this.#update(field);
	}

	setStat(field, value) {
		this.#data[field] = value;
		this.#update(field);
	}

	reset() {
		for(const field of Stats.FIELDS ) {
			this.#data[field.tag] = 0;
			this.#dom[field.tag] = document.querySelector(`[data-stat="${field.tag}"]`);
			this.#update(field.tag);
		}
	}

	#update(field) {
		if (field === 'time') {
			this.#dom[field].textContent = Math.ceil(this.#data[field] / 1000);
		} else {
			this.#dom[field].textContent = Math.ceil(this.#data[field]);
		}
	}
}*/
