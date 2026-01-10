export default class DistributionCenter {
	#id;

	constructor(args = {}) {
		this.#id = window.crypto.randomUUID();
	}
}