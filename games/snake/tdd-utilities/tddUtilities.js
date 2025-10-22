import Vector2d from "../snake-base/Vector/Vector2d/Vector2d.js";
import Game from "../snake-base/Game/Game.js";
import Input from "../snake-input/Input/Input.js";

/*class MockGame {
	emit () {}
}*/
const MockVector = Vector2d;
const MockGame = new Game({ vectorFactory: MockVector });

class MockInput {
	constructor(args) {}

	onInput(event) {}
}
/*
class MockVector {
	x;
	y;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	equals(vector) {
		return vector.x === this.x && vector.y === this.y;
	}

	multiply(vector) {
		return new MockVector(this.x * vector.x, this.y * vector.y);
	}

	clone() {
		return new MockVector(this.x, this.y);
	}

	static Zero () { return new MockVector(0, 0) }
	static Up () { return new MockVector(0, 1) }
	static Down () { return new MockVector(0, -1) }
}
*/

export { MockGame, MockVector, MockInput}