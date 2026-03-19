export default class EventHandler {
	#callbacks;

	constructor() {
		this.#callbacks = new Map();
	}

	setCallback(callbackId, callback) {
		this.#callbacks.set(callbackId, callback);
	}

	removeCallback(callbackId) {
		this.#callbacks.delete(callbackId);
	}

	clearCallbacks() {
		this.#callbacks.clear();
	}

	triggerCallback(callbackId, args) {
		const callback = this.#callbacks.get(callbackId);
		if (callback) {
			callback(args);
		}
	}

	triggerAllCallbacks(args) {
		this.#callbacks.forEach((callback) => callback(args));
	}


	// NOTE: we should use [Symbol.dispose] to clean up the callbacks, but Safari doesn't support it.

}