import Sounds from "./Sounds.js";

export default class RacingLights {
	#lightList
	#lights;
	#currentLight;
	#countdownInterval;
	#soundsDb;

	constructor(elementId, soundsDb) {
		this.#lightList = document.getElementById(elementId);
		this.#soundsDb = soundsDb;
	}

	start() {
		return new Promise((resolve, reject) => {
			this.#lights = this.#lightList.querySelectorAll('li');
			this.#currentLight = -3;
			this.#lightList.addEventListener('go', () => {
				const startSounds = this.#soundsDb.getAudio(Sounds.BEEP_START);
				startSounds.addEventListener('ended', () => {
					this.#soundsDb.play(Sounds.CAR_RACING);
				}, { once: true });
				startSounds.play(Sounds.BEEP_START);
				resolve();
			});
			this.#countdownInterval = setInterval(this.#countDown.bind(this), 1000);
		});
	}

	#countDown() {
		if (this.#currentLight >= 0) {
			this.#lights[this.#currentLight].classList.remove('off');
			this.#soundsDb.play(Sounds.BEEP_COUNTDOWN);
		}
		this.#currentLight++;
		if (this.#currentLight === 5) {
			clearInterval(this.#countdownInterval);
			this.#lightList.dispatchEvent(new CustomEvent('go'));
		}
	}
}