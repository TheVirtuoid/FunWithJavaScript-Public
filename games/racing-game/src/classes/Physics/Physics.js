import {Vector3} from "@babylonjs/core";

let nextPhysicsGroup = 2;

export default class Physics {
	static GRAVITY = new Vector3(0, -9.81, 0);

	static PHYSICS_GROUP_GROUND = 1;

	static getNextPhysicsGroup() {
		const group = nextPhysicsGroup;
		nextPhysicsGroup <<= 1; // Shift left to get the next group
		return group;
	}
}