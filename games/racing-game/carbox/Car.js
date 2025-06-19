import {
	Color3,
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
	static WHEEL_FRICTION = 0;

	static CHASSIS_MASS = 10;

	static ADD_COLLISION_BODY = false;

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
	#color;

	#chassisPhysics;
	#wheelPhysics;

	constructor(args = {}) {
		const { color = new Color3(1, 1, 1), position, scene, url, id = crypto.randomUUID(), physicsGroup, scale = 1, chassisPhysics = {}, wheelPhysics = {} } = args;
		this.#position = position.clone();
		this.#scene = scene;
		this.#url = url;
		this.#id = id;
		this.#physicsGroup = physicsGroup;
		this.#membershipMask = this.#physicsGroup;
		this.#collideMask = ~this.#membershipMask;
		this.#scale = scale;
		this.#color = color;
		this.#chassisPhysics = {
			friction: chassisPhysics.friction ?? 0,
			restitution: chassisPhysics.restitution ?? 0,
			mass: chassisPhysics.mass ?? 1
		};
		this.#wheelPhysics = {
			friction: wheelPhysics.friction ?? Car.WHEEL_FRICTION,
			restitution: wheelPhysics.restitution ?? Car.WHEEL_RESTITUTION,
			mass: wheelPhysics.mass ?? Car.WHEEL_MASS
		}
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

	get color() {
		return this.#color;
	}

	get loadedModel() {
		return this.#loadedModel;
	}

	tbuild() {
		return new Promise((resolve, reject) => {
			this.#buildParent()
				.then(this.#test.bind(this))
				.then(resolve);
		});
	}

	build() {
		return new Promise((resolve, reject) => {
			this.#buildParent()
				.then(this.#buildChassis.bind(this))
				.then(this.#buildWheels.bind(this))
				// .then(this.#buildModel.bind(this))
				.then(this.#buildCollisionBody.bind(this))
				.then(this.#buildChassisPhysicsAggregate.bind(this))
				.then(this.#buildWheelPhysicsAggregates.bind(this))
				// .then(this.#buildParentPhysicsAggregate.bind(this))
				.then(this.#buildCollisionBodyPhysicsAggregate.bind(this))
				.then(this.#buildWheelConstraints.bind(this))
				.then(this.#setCollisionBodyConstraint.bind(this))
				.then(resolve);
		});
	}

	#test() {
		const box1 = MeshBuilder.CreateBox("box", { size: 2 }, this.#scene);
		const box2 = MeshBuilder.CreateBox("box2", { size: 2 }, this.#scene);
		const boxMaterial = new StandardMaterial("ball-material", this.#scene);
		boxMaterial.diffuseColor = new Color3(1, 0, 0);
		box1.position = new Vector3(0, 0, 0);
		box2.material = boxMaterial;
		box2.position = new Vector3(0, 2, 0);

		box2.parent = box1;

		box1.parent = this.#parent;


		const box1Aggregate = new PhysicsAggregate(box1, PhysicsShapeType.BOX, { mass: 100, restitution: .1, friction: 0.5 }, this.#scene);
		const box2Aggregate = new PhysicsAggregate(box2, PhysicsShapeType.BOX, { mass: 100, restitution: .1, friction: 0.5 }, this.#scene);

		const joint = new LockConstraint(
			new Vector3(0, 2, 0),		//box1 pivot
			new Vector3(0, -2, 0),		// box2 pivot
			new Vector3(0, 1, 0),
			new Vector3(0, 1, 0),
			this.#scene
		);


		box1Aggregate.body.addConstraint(box2Aggregate.body, joint);
	}

	changePhysics(chassis = {}, wheel = {}) {

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
		const chassisMaterial = new StandardMaterial(`${this.id}-chassis-material`, this.#scene);
		chassisMaterial.diffuseColor = this.color;
		this.#chassis.material = chassisMaterial;
		return Promise.resolve();
	}

	#buildWheelBase() {
		this.#wheelBase = MeshBuilder.CreateCapsule(`${this.id}-wheel-base`, {
			height: .5 * this.#scale,
			radius: .75 * this.#scale,
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

	#buildWheelPhysicsAggregates() {
		const backLeftWheel = new PhysicsAggregate(this.#wheels.get(Car.BACK_LEFT_WHEEL), PhysicsShapeType.CAPSULE, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: .5}, this.#scene);
		const backRightWheel = new PhysicsAggregate(this.#wheels.get(Car.BACK_RIGHT_WHEEL), PhysicsShapeType.CAPSULE, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: .5}, this.#scene);
		const frontLeftWheel = new PhysicsAggregate(this.#wheels.get(Car.FRONT_LEFT_WHEEL), PhysicsShapeType.CAPSULE, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: .5}, this.#scene);
		const frontRightWheel = new PhysicsAggregate(this.#wheels.get(Car.FRONT_RIGHT_WHEEL), PhysicsShapeType.CAPSULE, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: .5}, this.#scene);
		backLeftWheel.shape.filterMembershipMask = this.#membershipMask;
		backLeftWheel.shape.filterCollideMask = this.#collideMask;
		backRightWheel.shape.filterMembershipMask = this.#membershipMask;
		backRightWheel.shape.filterCollideMask = this.#collideMask;
		frontLeftWheel.shape.filterMembershipMask = this.#membershipMask;
		frontLeftWheel.shape.filterCollideMask = this.#collideMask;
		frontRightWheel.shape.filterMembershipMask = this.#membershipMask;
		frontRightWheel.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car.BACK_LEFT_WHEEL, backLeftWheel);
		this.#aggregates.set(Car.BACK_RIGHT_WHEEL, backRightWheel);
		this.#aggregates.set(Car.FRONT_LEFT_WHEEL, frontLeftWheel);
		this.#aggregates.set(Car.FRONT_RIGHT_WHEEL, frontRightWheel);
		return Promise.resolve();
	}

	#buildChassisPhysicsAggregate() {
		const chassis = new PhysicsAggregate(this.#chassis, PhysicsShapeType.BOX, { mass: Car.CHASSIS_MASS, restitution: 0, friction: 0}, this.#scene);
		chassis.shape.filterMembershipMask = this.#membershipMask;
		chassis.shape.filterCollideMask = this.#collideMask;
		// console.log(chassis);
		/*chassis.body.shape.density =1 ;
		chassis.body.shape = chassis.body.shape;*/
		this.#aggregates.set(Car.CHASSIS, chassis);
		return Promise.resolve();
	}

	#buildCollisionBodyPhysicsAggregate() {
		if (Car.ADD_COLLISION_BODY) {
			const collisionBody = new PhysicsAggregate(this.#collisionBody, PhysicsShapeType.BOX, { mass: Car.CHASSIS_MASS, restitution: 0, friction: 0 }, this.#scene);
			collisionBody.shape.filterMembershipMask = this.#membershipMask;
			collisionBody.shape.filterCollideMask = this.#collideMask;
			this.#aggregates.set(Car.COLLISION_BODY, collisionBody);
		}
		return Promise.resolve();
	}

	#buildParentPhysicsAggregate() {
		const parent = new PhysicsAggregate(this.#parent, PhysicsShapeType.BOX, { mass: 1, restitution: 0}, this.#scene);
		this.#aggregates.set(Car.PARENT, parent);
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
		if (Car.ADD_COLLISION_BODY) {
			const collisionAggregate = this.#aggregates.get(Car.COLLISION_BODY);
			const chassisAggregate = this.#aggregates.get(Car.CHASSIS);
			const chassisPosition = chassisAggregate.transformNode.position;
			const collisionPosition = collisionAggregate.transformNode.position;
			const relativePos = collisionPosition.subtract(chassisPosition);

			/*console.log(this.#chassis.getBoundingInfo().boundingBox.maximum.y);
			console.log(chassisPosition);
			console.log(this.#collisionBody.getBoundingInfo().boundingBox.minimum.y);
			console.log(collisionPosition);*/

			const chassisMax = this.#chassis.getBoundingInfo().boundingBox.maximum.y;
			const collisionBodyMin = this.#collisionBody.getBoundingInfo().boundingBox.minimum.y;

			const constraint = new LockConstraint(
				new Vector3(0, chassisMax + .1, 0),
				new Vector3(0, collisionBodyMin - .1, 0),
				new Vector3(0, 1, 0),
				new Vector3(0, 1, 0),
				this.scene
			);
			chassisAggregate.body.addConstraint(collisionAggregate.body, constraint, this.#scene);
			// this.#aggregates.get(Car.COLLISION_BODY).body.addConstraint(this.#aggregates.get(Car.CHASSIS).body, constraint, this.#scene);
		}
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
		if (Car.ADD_COLLISION_BODY) {
			const bodySize = {
				width: Car.CHASSIS_LENGTH * 2 * this.#scale,  // Slightly larger than the chassis
				height: .5 * this.#scale,                     // Height of car body
				depth: 2.2 * this.#scale                       // Width of car body
			};

			const collisionBody = MeshBuilder.CreateBox(`${this.id}-body-collision`, bodySize, this.#scene);
			const position = this.#chassis.position.clone();
			position.y += 2;
			collisionBody.position = position;
			collisionBody.visibility = true; // Make invisible
			collisionBody.parent = this.#chassis; // Attach to chassis
			this.#collisionBody = collisionBody;
		}
		return Promise.resolve();
	}

	async #buildModel() {
		this.#loadedModel = await ImportMeshAsync("/carbox/Ferarri.glb", this.#scene, {});
		this.model.scaling = new Vector3(3 * this.#scale, 3 * this.#scale, 3 * this.#scale);
		// this.model.parent = this.#parent;
		this.model.parent = this.chassis;
		this.model.rotationQuaternion = null;
		this.model.rotation = new Vector3(0, Math.PI / 2, 0);
		/*this.#loadedModel.meshes.forEach(mesh => {
			mesh.isPickable = false;
			// Optionally disable collision detection entirely
			mesh.checkCollisions = false;
		});*/
		return Promise.resolve();
	}
}