export default class RacingLights {
	#lightList
	#lights;
	#currentLight;
	#countdownInterval;

	constructor(elementId) {
		this.#lightList = document.getElementById(elementId);
	}

	start() {
		return new Promise((resolve, reject) => {
			this.#lights = this.#lightList.querySelectorAll('li');
			this.#currentLight = -3;
			this.#lightList.addEventListener('go', () => {
				resolve();
			});
			this.#countdownInterval = setInterval(this.#countDown.bind(this), 1000);
		});
	}

	#countDown() {
		if (this.#currentLight >= 0) {
			this.#lights[this.#currentLight].classList.remove('off');
		}
		this.#currentLight++;
		if (this.#currentLight === 5) {
			clearInterval(this.#countdownInterval);
			this.#lightList.dispatchEvent(new CustomEvent('go'));
		}
	}
}