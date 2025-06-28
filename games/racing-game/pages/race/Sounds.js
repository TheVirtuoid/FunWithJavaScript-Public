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
	#context = new Map();
	#gainNodes = new Map();

	constructor() {
		for (const [sound, url] of this.#sounds) {
			const audio = new Audio(url);
			audio.loop = sound === Sounds.CAR_RACING;
			this.#audio.set(sound, audio);
			const ctx = new AudioContext();
			const source = ctx.createMediaElementSource(audio);
			const gainNode = ctx.createGain();
			source.connect(gainNode).connect(ctx.destination);
			this.#context.set(sound, ctx);
			this.#gainNodes.set(sound, gainNode);
		}
	}

	getAudio(soundType) {
		return this.#audio.get(soundType);
	}

	play(soundType) {
		const sound = this.#audio.get(soundType);
		if (sound) {
			if (soundType !== Sounds.CAR_RACING) {
				sound.volume = .6;
			}
			sound.play();
		}
	}

	allStop() {
		for (const audio of this.#audio.values()) {
			audio.pause();
		}
	}

	fadeOut(soundType, duration = 2000) {
		const audio = this.#audio.get(soundType);
		const ctx = this.#context.get(soundType);
		const gainNode = this.#gainNodes.get(soundType);

		gainNode.gain.setValueAtTime(1, ctx.currentTime);
		gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration / 1000);
		setTimeout(() => {
			audio.pause();
			audio.currentTime = 0;
		}, duration * 1000);
	}
}