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

const buildGround = (scene, physicsOptions) => {
	const { friction, restitution, rotationAmount, rotationAxis } = physicsOptions;
	const groundMaterial = new StandardMaterial("grass", scene);
	groundMaterial.diffuseColor = new Color3(0, .25, 0);

	const groundWallMaterial = new StandardMaterial('ground-wall', scene);
	groundWallMaterial.diffuseColor = new Color3(0, 0, 0);

	const groundBase = MeshBuilder.CreateGround('ground-base', {
		width: 50,
		height: 50,
		subdivisions: 4,
	}, scene);
	groundBase.visibility = false;
	groundBase.material = groundMaterial;
	groundBase.position = new Vector3(0, -10, 0);
	groundBase.rotation[rotationAxis] += rotationAmount;
	const groundAggregate = new PhysicsAggregate(groundBase, PhysicsShapeType.BOX, { mass: 0, friction: friction, restitution: restitution }, scene);
	groundAggregate.shape.filterMembershipMask = 1;
	groundAggregate.shape.filterCollideMask = 0xFFFFFFFF;

	const groundBaseWallNorth = MeshBuilder.CreateBox('ground-base-north', { depth: 55, width: 2, height: 2 }, scene);
	groundBaseWallNorth.material = groundWallMaterial;
	groundBaseWallNorth.position = new Vector3(-25, -10, 0);
	new PhysicsAggregate(groundBaseWallNorth, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);

	const groundBaseWallSouth = MeshBuilder.CreateBox('ground-base-south', { depth: 55, width: 2, height: 2 }, scene);
	groundBaseWallSouth.material = groundWallMaterial;
	groundBaseWallSouth.position = new Vector3(25, -10, 0);
	new PhysicsAggregate(groundBaseWallSouth, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);

	const groundBaseWallEast = MeshBuilder.CreateBox('ground-base-east', { depth: 2, width: 55, height: 2 }, scene);
	groundBaseWallEast.material = groundWallMaterial;
	groundBaseWallEast.position = new Vector3(0, -10, 25);
	new PhysicsAggregate(groundBaseWallEast, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);

	const groundBaseWallWest = MeshBuilder.CreateBox('ground-base-west', { depth: 2, width: 55, height: 2 }, scene);
	groundBaseWallWest.material = groundWallMaterial;
	groundBaseWallWest.position = new Vector3(0, -10, -25);
	new PhysicsAggregate(groundBaseWallWest, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);

	return { mesh: groundBase, aggregate: groundAggregate };
}

const applyGroundChanges = (ground, changes) => {
	const { mesh, aggregate } = ground;
	const { friction, restitution, rotationAmount, rotationAxis } = changes;

}

export { buildGround, applyGroundChanges };