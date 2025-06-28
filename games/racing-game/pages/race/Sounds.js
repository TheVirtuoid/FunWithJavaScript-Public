export default class Sounds {
	static BEEP_COUNTDOWN = Symbol('beep-countdown');
	static BEEP_START = Symbol('beep-start');
	static CAR_RACING = Symbol('car-racing');

	#sounds = new Map([
		[Sounds.BEEP_COUNTDOWN, '/sounds/391650__jeckkech__beep.wav'],
		[Sounds.BEEP_START, '/sounds/680825__stomachache__countdown-start.wav'],
		[Sounds.CAR_RACING, '/sounds/350676__dominik_w__car-race-nordschleife-vln-several-cars-passing-by.wav']
	]);
	#audio = new Map();

	constructor() {
		for (const [sound, url] of this.#sounds) {
			console.log(sound, url);
			const audio = new Audio(url);
			audio.loop = sound === Sounds.CAR_RACING;
			this.#audio.set(sound, audio);
		}
	}

	getAudio(soundType) {
		return this.#audio.get(soundType);
	}

	play(soundType) {
		const sound = this.#audio.get(soundType);
		if (sound) {
			sound.play();
		}
	}

	allStop() {
		for (const audio of this.#audio.values()) {
			audio.pause();
		}
	}
}