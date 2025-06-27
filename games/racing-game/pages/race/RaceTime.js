export default class RaceTime {
	#raceTimeElement;
	#startTime = null;

	constructor(raceTimeElement) {
		this.#raceTimeElement = document.getElementById(raceTimeElement);
		this.#raceTimeElement.textContent = '000.000';
	}

	start() {
		this.#startTime = Date.now();
	}

	stop() {
		this.#startTime = null;
	}

	show() {
		if (this.#startTime !== null) {
			const elapsedTime = Date.now() - this.#startTime;
			this.#raceTimeElement.textContent = this.format(elapsedTime);
		}
	}

	format(time) {
		const seconds = Math.floor(time / 1000);
		const milliseconds = time % 1000;
		return `${seconds.toString().padStart(3, '0')}.${milliseconds.toString().padStart(3, '0')}`;

	}

	getTime() {
		const time = Date.now() - this.#startTime;
		return { time, output: this.format(time) };
	}
}