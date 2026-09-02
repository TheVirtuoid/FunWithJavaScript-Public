export default class Welcome {
	#dom;

	constructor() {
		this.#dom = document.getElementById('welcome');
	}

	hide() {
		this.#dom.classList.add('hidden');
	}

	show() {
		this.#dom.classList.remove('hidden');
	}
}