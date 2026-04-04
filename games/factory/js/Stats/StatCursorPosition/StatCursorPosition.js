import Vector2d from "../../Vector/Vector2d/Vector2d.js";

export default class StatCursorPosition {
	#cursorPosition;

	constructor(args = {}) {
		const { cursorPosition = null } = args;
		this.setCursorPosition(cursorPosition);
	}

	get cursorPosition() {
		return this.#cursorPosition?.clone() ?? null;
	}

	setCursorPosition(cursorPosition = null) {
		if (!cursorPosition instanceof Vector2d && cursorPosition !== null) {
			throw new Error('StatCursorPosition.setCursorPosition() requires a Vector2d');
		}
		this.#cursorPosition = cursorPosition;
	}
}