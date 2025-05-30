import {
	ImportMeshAsync,
	MeshBuilder,
	Physics6DoFConstraint,
	PhysicsAggregate,
	PhysicsConstraintAxis,
	PhysicsShapeType,
	Vector3
} from "@babylonjs/core";

export default class Car {
	static CHASSIS_LENGTH = 5;

	static BACK_LEFT_WHEEL = { x: 1, z: -1, name: 'back-left' };
	static BACK_RIGHT_WHEEL = { x: 1, z: 1, name: 'back-right' };
	static FRONT_LEFT_WHEEL = { x: -1, z: -1, name: 'front-left' };
	static FRONT_RIGHT_WHEEL = { x: -1, z: 1, name: 'front-right' };
	static CHASSIS = Symbol('chassis');
	static WHEEL_RESTITUTION = 0.5;

	#position;
	#scene;
	#body;
	#chassis;
	#wheels = new Map();
	#aggregates = new Map();
	#url;
	#parent;
	#id;
	#wheelBase;
	#model;

	constructor(args = {}) {
		const { position, scene, url, id = crypto.randomUUID() } = args;
		this.#position = position.clone();
		this.#scene = scene;
		this.#url = url;
		this.#id = id;
		this.#buildWheelBase();
	}

	get position() {
		return this.#position;
	}

	get scene() {
		return this.#scene;
	}

	get body() {
		return this.#body;
	}

	get chassis() {
		return this.#chassis;
	}

	get wheels() {
		return this.#wheels;
	}

	get url() {
		return this.#url;
	}

	get id() {
		return this.#id;
	}

	get parent() {
		return this.#parent;
	}

	get wheelBase() {
		return this.#wheelBase;
	}

	build() {
		this.#buildParent()
			.then(this.#buildChassis.bind(this))
			.then(this.#buildWheels.bind(this))
			.then(() => this.#buildModel())
			.then(this.#buildPhysicsAggregates.bind(this))
			.then(this.#buildWheelConstraints.bind(this));
	}

	#buildParent() {
		this.#parent = new MeshBuilder.CreateBox(`${this.id}-parent`, { size: 0.1 }, this.#scene);
		this.#parent.visibility = 0;
		this.#parent.position = this.position.clone();
		this.#parent.rotate(new Vector3(0, 1, 0), Math.PI / 2);
		return Promise.resolve();
	}

	#buildChassis() {
		this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {width: Car.CHASSIS_LENGTH, height: 1, depth: 1}, this.#scene);
		this.#chassis.parent = this.parent;
		return Promise.resolve();
	}

	#buildWheelBase() {
		this.#wheelBase = MeshBuilder.CreateCylinder(`${this.id}-wheel-base`, {height: .25, diameter: 2, tessellation: 256}, this.#scene);
		this.#wheelBase.rotation.x = Math.PI / 2;
		this.#wheelBase.bakeCurrentTransformIntoVertices();
		this.#wheelBase.convertToFlatShadedMesh();
		this.#wheelBase.visibility = false;
	}

	#buildWheels() {
		this.#buildWheel(Car.BACK_LEFT_WHEEL);
		this.#buildWheel(Car.BACK_RIGHT_WHEEL);
		this.#buildWheel(Car.FRONT_LEFT_WHEEL);
		this.#buildWheel(Car.FRONT_RIGHT_WHEEL);
		return Promise.resolve();
	}

	#buildWheel(wheelType) {
		const wheel = this.#wheelBase.clone();
		wheel.name = `${this.id}-${wheelType.name}`;
		wheel.position.z = 2 * wheelType.z;
		wheel.position.x = Car.CHASSIS_LENGTH / 2 * wheelType.x;
		wheel.parent = this.#parent;
		wheel.visibility = true;
		this.#wheels.set(wheelType, wheel);
	}

	#buildPhysicsAggregates() {
		this.#aggregates.set(Car.CHASSIS,
			new PhysicsAggregate(this.#chassis, PhysicsShapeType.BOX, { mass: 1, restitution: 0, friction: 0}, this.#scene)
		);
		this.#aggregates.set(Car.BACK_LEFT_WHEEL,
			new PhysicsAggregate(this.#wheels.get(Car.BACK_LEFT_WHEEL), PhysicsShapeType.MESH, { mass: 1, restitution: Car.WHEEL_RESTITUTION, friction: 0}, this.#scene)
		);
		this.#aggregates.set(Car.BACK_RIGHT_WHEEL,
			new PhysicsAggregate(this.#wheels.get(Car.BACK_RIGHT_WHEEL), PhysicsShapeType.MESH, { mass: 1, restitution: Car.WHEEL_RESTITUTION, friction: 0}, this.#scene)
		);
		this.#aggregates.set(Car.FRONT_LEFT_WHEEL,
			new PhysicsAggregate(this.#wheels.get(Car.FRONT_LEFT_WHEEL), PhysicsShapeType.MESH, { mass: 1, restitution: Car.WHEEL_RESTITUTION, friction: 0}, this.#scene)
		);
		this.#aggregates.set(Car.FRONT_RIGHT_WHEEL,
			new PhysicsAggregate(this.#wheels.get(Car.FRONT_RIGHT_WHEEL), PhysicsShapeType.MESH, { mass: 1, restitution: Car.WHEEL_RESTITUTION, friction: 0}, this.#scene)
		);
		return Promise.resolve();
	}

	#buildWheelConstraints() {
		this.#setWheelConstraint(Car.BACK_LEFT_WHEEL);
		this.#setWheelConstraint(Car.BACK_RIGHT_WHEEL);
		this.#setWheelConstraint(Car.FRONT_LEFT_WHEEL);
		this.#setWheelConstraint(Car.FRONT_RIGHT_WHEEL);
		return Promise.resolve();
	}

	#setWheelConstraint(wheelType) {
		const wheelAggregate = this.#aggregates.get(wheelType);
		const wheelPosition = wheelAggregate.transformNode.position;
		const constraint = new Physics6DoFConstraint(
			{
				pivotA: new Vector3(wheelPosition.x, 0, wheelPosition.z / 2.0),
				pivotB: new Vector3(0, 0, -wheelPosition.z / 2.0),
				axisA: new Vector3(1, 0, 0),
				axisB: new Vector3(1, 0, 0),
				perpAxisA: new Vector3(0, 1, 0),
				perpAxisB: new Vector3(0, 1, 0),
			},
			[
				{
					axis: PhysicsConstraintAxis.LINEAR_X,
					minLimit: 0,
					maxLimit: 0,
				},
				{
					axis: PhysicsConstraintAxis.LINEAR_Y,
					minLimit: 0,
					maxLimit: 0,
				},
				{
					axis: PhysicsConstraintAxis.LINEAR_Z,
					minLimit: -0,
					maxLimit: 0,
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_X,
					minLimit: 0, maxLimit: 0
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_Y,
					minLimit: 0, maxLimit: 0
				}
			],
			this.#scene
		);
		this.#aggregates.get(Car.CHASSIS).body.addConstraint(wheelAggregate.body, constraint);
		return constraint;
	}

	async #buildModel() {
		const result = await ImportMeshAsync("/carbox/Ferarri.glb", this.#scene, {});
		result.meshes[0].scaling = new Vector3(3, 3, 3);
		// result.meshes[0].rotate(new Vector3(0, 0, 0, Math.PI));
		// result.meshes[0].rotation.y = Math.PI / 2;
		this.#model = result;
		this.#model.meshes[0].parent = this.chassis;
		result.meshes.forEach(mesh => {
			mesh.isPickable = false;
			// Optionally disable collision detection entirely
			mesh.checkCollisions = false;
		});
		// new PhysicsAggregate(this.#model.meshes[0], PhysicsShapeType.BOX, { mass: 1, restitution: .1, friction: 0}, this.#scene);
		// this.#model.meshes[0].parent = this.#parent;
		// result.meshes[0].parent = this.#carParent;
		// console.log(result.meshes[0]);
		// new PhysicsAggregate(this.#model.meshes[0], PhysicsShapeType.BOX, { mass: 1, restitution: .1, friction: 0}, this.#scene);
		// const collisionMesh = MeshBuilder.CreateBox("collisionMesh", { width: 1, height: 1, depth: 1 }, this.#scene);
		// new PhysicsAggregate(collisionMesh, PhysicsShapeType.BOX, { mass: 1, restitution: .1, friction: .25}, this.#scene);
		// this.#model.meshes[0].addChild(collisionMesh);
		return Promise.resolve();
	}
}