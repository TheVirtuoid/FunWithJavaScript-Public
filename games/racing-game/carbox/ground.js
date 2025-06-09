import {
	Color3,
	MeshBuilder,
	PhysicsAggregate,
	PhysicsShapeType,
	StandardMaterial,
	Vector3
} from "@babylonjs/core";

const colorRandom = () => {
	return new Vector3(Math.random(), Math.random(), Math.random());
}

const buildGround = (scene, controls) => {
	const groundMaterial = new StandardMaterial("grass", scene);
	groundMaterial.diffuseColor = new Color3(0, .25, 0);

	const groundWallMaterial = new StandardMaterial('ground-wall', scene);
	groundWallMaterial.diffuseColor = new Color3(0, 0, 0);

	/*const groundBase = MeshBuilder.CreateBox('ground-base', { depth: 50, width: 50, height: 1 }, scene);
	groundBase.material = groundMaterial;
	groundBase.position = new Vector3(0, -10, 0);
	groundBase.rotation.x += -.10;
	const groundAggregate = new PhysicsAggregate(groundBase, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	groundAggregate.shape.filterMembershipMask = 0xFFFFFFFF;
	groundAggregate.shape.filterCollideMask = 0xFFFFFFFF;*/



	const groundBase = MeshBuilder.CreateGround('ground-base', {
		width: 50,
		height: 50,
		subdivisions: 4,
	}, scene);
	groundBase.material = groundMaterial;
	groundBase.position = new Vector3(0, -10, 0);
	groundBase.rotation.x += -.10;
	const groundAggregate = new PhysicsAggregate(groundBase, PhysicsShapeType.BOX, { mass: 0, friction: .25, restitution: 0 }, scene);
	groundAggregate.shape.filterMembershipMask = 0xFFFFFFFF;
	groundAggregate.shape.filterCollideMask = 0xFFFFFFFF;
	// console.log('ground', groundAggregate.shape);
	// addMesh('groundBase', groundBase);

	const groundBaseWallNorth = MeshBuilder.CreateBox('ground-base-north', { depth: 55, width: 2, height: 2 }, scene);
	groundBaseWallNorth.material = groundWallMaterial;
	groundBaseWallNorth.position = new Vector3(-25, -10, 0);
	new PhysicsAggregate(groundBaseWallNorth, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallNorth', groundBaseWallNorth);

	const groundBaseWallSouth = MeshBuilder.CreateBox('ground-base-south', { depth: 55, width: 2, height: 2 }, scene);
	groundBaseWallSouth.material = groundWallMaterial;
	groundBaseWallSouth.position = new Vector3(25, -10, 0);
	new PhysicsAggregate(groundBaseWallSouth, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallSouth', groundBaseWallSouth);

	const groundBaseWallEast = MeshBuilder.CreateBox('ground-base-east', { depth: 2, width: 55, height: 2 }, scene);
	groundBaseWallEast.material = groundWallMaterial;
	groundBaseWallEast.position = new Vector3(0, -10, 25);
	new PhysicsAggregate(groundBaseWallEast, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallEast', groundBaseWallEast);

	const groundBaseWallWest = MeshBuilder.CreateBox('ground-base-west', { depth: 2, width: 55, height: 2 }, scene);
	groundBaseWallWest.material = groundWallMaterial;
	groundBaseWallWest.position = new Vector3(0, -10, -25);
	new PhysicsAggregate(groundBaseWallWest, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallWest', groundBaseWallWest);

}
export { buildGround };