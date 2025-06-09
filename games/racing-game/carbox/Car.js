import {
	ImportMeshAsync, LockConstraint,
	MeshBuilder,
	Physics6DoFConstraint,
	PhysicsAggregate,
	PhysicsConstraintAxis,
	PhysicsShapeType, Quaternion as Quanternion, StandardMaterial, Texture,
	Vector3
} from "@babylonjs/core";

export default class Car {
	static CHASSIS_LENGTH = 5;

	static BACK_LEFT_WHEEL = { x: 1, z: -1, name: 'back-left' };
	static BACK_RIGHT_WHEEL = { x: 1, z: 1, name: 'back-right' };
	static FRONT_LEFT_WHEEL = { x: -1, z: -1, name: 'front-left' };
	static FRONT_RIGHT_WHEEL = { x: -1, z: 1, name: 'front-right' };
	static CHASSIS = Symbol('chassis');
	static COLLISION_BODY = Symbol('collision-body');
	static PARENT = Symbol('parent');
	static WHEEL_RESTITUTION = 0;
	static WHEEL_MASS = 1;
	static WHEEL_FRICTION = 0.25;

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
	#loadedModel;
	#wheelMaterial;
	#physicsGroup;
	#membershipMask;
	#collideMask;
	#collisionBody;
	#scale;

	constructor(args = {}) {
		const { position, scene, url, id = crypto.randomUUID(), physicsGroup, scale = 1 } = args;
		this.#position = position.clone();
		this.#scene = scene;
		this.#url = url;
		this.#id = id;
		this.#physicsGroup = physicsGroup;
		this.#membershipMask = this.#physicsGroup;
		this.#collideMask = ~this.#membershipMask;
		this.#scale = scale;
		// console.log(this.#membershipMask, this.#collideMask);
		this.#buildWheelBase();
		this.#wheelMaterial = new StandardMaterial(`${this.id}-wheel-material`, this.scene);
		const texture = new Texture('./checkerboard-7800519_1280.jpg', this.scene);
		texture.uScale = .25; // Scale texture in U direction
		this.#wheelMaterial.diffuseTexture = texture;
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

	get model() {
		return this.#loadedModel?.meshes[0];
	}

	get collisionBody() {
		return this.#collisionBody;
	}

	build() {
		this.#buildParent()
			.then(this.#buildChassis.bind(this))
			.then(this.#buildWheels.bind(this))
			// .then(this.#buildModel.bind(this))
			// .then(this.#buildCollisionBody.bind(this))
			.then(this.#buildPhysicsAggregates.bind(this))
			.then(this.#buildWheelConstraints.bind(this))
			// .then(this.#setCollisionBodyConstraint.bind(this));
	}

	#buildParent() {
		this.#parent = new MeshBuilder.CreateBox(`${this.id}-parent`, { size: 0.1 }, this.#scene);
		this.#parent.visibility = false;
		this.#parent.position = this.position.clone();
		this.#parent.rotate(new Vector3(0, 1, 0), Math.PI / 2);
		return Promise.resolve();
	}

	#buildChassis() {
		this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {
			width: Car.CHASSIS_LENGTH * this.#scale,
			height: 1 * this.#scale,
			depth: 1 * this.#scale
		}, this.#scene);
		this.#chassis.parent = this.parent;
		return Promise.resolve();
	}

	#buildWheelBase() {
		this.#wheelBase = MeshBuilder.CreateCylinder(`${this.id}-wheel-base`, {
			height: .1 * this.#scale,
			diameter: 2 * this.#scale,
			tessellation: 256
		}, this.#scene);
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
		wheel.position.z = 2 * wheelType.z * this.#scale;
		wheel.position.x = Car.CHASSIS_LENGTH * this.#scale / 2  * wheelType.x;
		wheel.parent = this.#parent;
		wheel.visibility = true;
		wheel.material = this.#wheelMaterial;
		this.#wheels.set(wheelType, wheel);
	}

	#buildPhysicsAggregates() {
		const chassis = new PhysicsAggregate(this.#chassis, PhysicsShapeType.BOX, { mass: 10, restitution: 0, friction: 0}, this.#scene);
		const backLeftWheel = new PhysicsAggregate(this.#wheels.get(Car.BACK_LEFT_WHEEL), PhysicsShapeType.CYLINDER, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: Car.WHEEL_FRICTION}, this.#scene);
		const backRightWheel = new PhysicsAggregate(this.#wheels.get(Car.BACK_RIGHT_WHEEL), PhysicsShapeType.CYLINDER, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: Car.WHEEL_FRICTION}, this.#scene);
		const frontLeftWheel = new PhysicsAggregate(this.#wheels.get(Car.FRONT_LEFT_WHEEL), PhysicsShapeType.CYLINDER, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: Car.WHEEL_FRICTION}, this.#scene);
		const frontRightWheel = new PhysicsAggregate(this.#wheels.get(Car.FRONT_RIGHT_WHEEL), PhysicsShapeType.CYLINDER, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: Car.WHEEL_FRICTION}, this.#scene);
		// const collisionBody = new PhysicsAggregate(this.collisionBody, PhysicsShapeType.BOX, { mass: 1, restitution: 0, friction: 0}, this.#scene);
		const parent = new PhysicsAggregate(this.#parent, PhysicsShapeType.BOX, { mass: 0, restitution: 1}, this.#scene);

		this.#aggregates.set(Car.CHASSIS, chassis);
		this.#aggregates.set(Car.BACK_LEFT_WHEEL, backLeftWheel);
		this.#aggregates.set(Car.BACK_RIGHT_WHEEL, backRightWheel);
		this.#aggregates.set(Car.FRONT_LEFT_WHEEL, frontLeftWheel);
		this.#aggregates.set(Car.FRONT_RIGHT_WHEEL, frontRightWheel);
		// this.#aggregates.set(Car.COLLISION_BODY, collisionBody);
		this.#aggregates.set(Car.PARENT, parent);

		backLeftWheel.shape.filterMembershipMask = this.#membershipMask;
		backLeftWheel.shape.filterCollideMask = this.#collideMask;
		backRightWheel.shape.filterMembershipMask = this.#membershipMask;
		backRightWheel.shape.filterCollideMask = this.#collideMask;
		frontLeftWheel.shape.filterMembershipMask = this.#membershipMask;
		frontLeftWheel.shape.filterCollideMask = this.#collideMask;
		frontRightWheel.shape.filterMembershipMask = this.#membershipMask;
		frontRightWheel.shape.filterCollideMask = this.#collideMask;
		chassis.shape.filterMembershipMask = this.#membershipMask;
		chassis.shape.filterCollideMask = this.#collideMask;

		/*collisionBody.shape.filterMembershipMask = this.#membershipMask;
		collisionBody.shape.filterCollideMask = this.#collideMask;*/

		return Promise.resolve();
	}

	#buildWheelConstraints() {
		this.#setWheelConstraint(Car.BACK_LEFT_WHEEL);
		this.#setWheelConstraint(Car.BACK_RIGHT_WHEEL);
		this.#setWheelConstraint(Car.FRONT_LEFT_WHEEL);
		this.#setWheelConstraint(Car.FRONT_RIGHT_WHEEL);
		return Promise.resolve();
	}

	#setCollisionBodyConstraint() {
		const collisionAggregate = this.#aggregates.get(Car.COLLISION_BODY);
		const collisionPosition = collisionAggregate.transformNode.position;
		console.log(collisionPosition);
		const constraint = new LockConstraint(
			new Vector3(0, -collisionPosition.y, 0),
			new Vector3(0, collisionPosition.y, 0),
			new Vector3(0, 1, 0),
			new Vector3(0, 1, 0),
			this.scene
		);
		// this.#aggregates.get(Car.CHASSIS).body.addConstraint(this.#aggregates.get(Car.COLLISION_BODY).body, constraint, this.#scene);
		// this.#aggregates.get(Car.COLLISION_BODY).body.addConstraint(this.#aggregates.get(Car.CHASSIS).body, constraint, this.#scene);
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

	#buildCollisionBody() {
		const bodySize = {
			width: Car.CHASSIS_LENGTH * 2 * this.#scale,  // Slightly larger than the chassis
			height: .5 * this.#scale,                     // Height of car body
			depth: 2.2 * this.#scale                       // Width of car body
		};

		const collisionBody = MeshBuilder.CreateBox(`${this.id}-body-collision`, bodySize, this.#scene);
		const position = this.#chassis.position.add(this.#chassis.getBoundingInfo().boundingBox.maximum).add(new Vector3(0, 10, 0));
		// console.log(position);
		collisionBody.position = position;
		// collisionBody.position.y = this.#chassis.position.y + this.#chassis.getBoundingInfo().boundingBox.maximum + .5; // Position above chassis
		collisionBody.visibility = true; // Make invisible
		// collisionBody.parent = this.#parent;
		collisionBody.parent = this.#chassis; // Attach to chassis
		collisionBody.showBoundingBox = true;
		this.#collisionBody = collisionBody;
		return Promise.resolve();
	}

	async #buildModel() {
		this.#loadedModel = await ImportMeshAsync("/carbox/Ferarri.glb", this.#scene, {});
		// console.log(this.#loadedModel);
		this.model.scaling = new Vector3(3 * this.#scale, 3 * this.#scale, 3 * this.#scale);
		// this.model.parent = this.#parent;
		this.model.parent = this.chassis;
		// this.model.position.y += 4;
		this.model.rotationQuaternion = null;
		this.model.rotation = new Vector3(0, Math.PI / 2, 0);
		this.#loadedModel.meshes.forEach(mesh => {
			mesh.isPickable = false;
			// Optionally disable collision detection entirely
			mesh.checkCollisions = true;
		});
		/*const modelPhysics = new PhysicsAggregate(this.model, PhysicsShapeType.BOX, { mass: 1, restitution: .1, friction: 0}, this.#scene);
		modelPhysics.shape.filterMembershipMask = this.#membershipMask;
		modelPhysics.shape.filterCollideMask = 0x00000010;*/
		// modelPhysics.shape.filterCollideMask = this.#collideMask;
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