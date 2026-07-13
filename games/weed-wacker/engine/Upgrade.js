let instance;

export default class Upgrade {
	constructor() {
		if (instance) {
			return instance;
		}
		instance = this;
	}
}