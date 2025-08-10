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

	/*static WHEEL_RESTITUTION = 0;
	static WHEEL_MASS = 0.1;
	static WHEEL_FRICTION = .5;
	static CHASSIS_MASS = 10;*/

	static WHEEL_RESTITUTION = 0;
	static WHEEL_MASS = 80;
	static WHEEL_FRICTION = 1;
	static CHASSIS_MASS = 20;
	static COLLISION_BODY_MASS = 10;

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
		const texture = new Texture('/images/checkerboard-7800519_1280.jpg', this.scene);
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

	build() {
		return new Promise((resolve, reject) => {
			this.#buildParent()
				.then(this.#buildChassis.bind(this))
				.then(this.#buildWheels.bind(this))
				.then(this.#buildModel.bind(this))
				// .then(this.#buildCollisionBody.bind(this))
				.then(this.#assignParents.bind(this))
				.then(this.#buildChassisPhysicsAggregate.bind(this))
				.then(this.#buildWheelPhysicsAggregates.bind(this))
				// .then(this.#buildParentPhysicsAggregate.bind(this))
				// .then(this.#buildCollisionBodyPhysicsAggregate.bind(this))

				// .then(() => new Promise(resolve => setTimeout(resolve, 100)))

				// .then(this.#setCollisionBodyConstraint.bind(this))
				.then(this.#buildWheelConstraints.bind(this))
				.then(resolve);
		});
	}

	#assignParents() {
		this.#chassis.parent = this.#collisionBody;  // Chassis follows collision body
		this.#collisionBody.parent = this.#parent;   // Collision body is the main physics body
	}

	/*#assignParents() {
		if(this.#collisionBody) {
			this.#collisionBody.parent = this.#chassis;
		}
		this.#chassis.parent = this.#parent;
	}*/

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

		// Create collision body as a separate mesh (NOT parented to chassis)
		this.#collisionBody = MeshBuilder.CreateBox(`${this.id}-body-collision`, {
			width: Car.CHASSIS_LENGTH * 2 * this.#scale,
			height: .5 * this.#scale,
			depth: 2.2 * this.#scale
		}, this.#scene);

		// Position the collision body at the same location as chassis but offset in Y
		this.#collisionBody.position.y = 0;

		const chassisMaterial = new StandardMaterial(`${this.id}-chassis-material`, this.#scene);
		chassisMaterial.diffuseColor = this.color;
		this.#chassis.material = chassisMaterial;

		return Promise.resolve();
	}

	#buildChassisPhysicsAggregate() {
		// Create physics aggregate on the collision body
		const chassisAggregate = new PhysicsAggregate(
			this.#collisionBody,
			PhysicsShapeType.BOX,
			{
				mass: Car.CHASSIS_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.#scene
		);

		chassisAggregate.shape.filterMembershipMask = this.#membershipMask;
		chassisAggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car.CHASSIS, chassisAggregate);

		return Promise.resolve();
	}

	/*#buildChassisPhysicsAggregate() {
		// Create the main chassis physics body with a compound shape
		const chassisAggregate = new PhysicsAggregate(
			this.#chassis,
			PhysicsShapeType.BOX,
			{
				mass: Car.CHASSIS_MASS,
				restitution: 0,
				friction: 0.5,
				// Add compound shapes to include both chassis and collision body
				shapes: [
					{
						// Main chassis shape
						type: PhysicsShapeType.BOX,
						position: new Vector3(0, 0, 0),
						boxSize: new Vector3(
							Car.CHASSIS_LENGTH * this.#scale,
							1 * this.#scale,
							1 * this.#scale
						)
					},
					{
						// Collision body shape
						type: PhysicsShapeType.BOX,
						position: new Vector3(0, 2, 0),  // Same Y offset as visual mesh
						boxSize: new Vector3(
							Car.CHASSIS_LENGTH * 2 * this.#scale,
							0.5 * this.#scale,
							2.2 * this.#scale
						)
					}
				]
			},
			this.#scene
		);

		chassisAggregate.shape.filterMembershipMask = this.#membershipMask;
		chassisAggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car.CHASSIS, chassisAggregate);

		return Promise.resolve();
	}*/

	/*#buildChassis() {
		this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {
			width: Car.CHASSIS_LENGTH * this.#scale,
			height: 1 * this.#scale,
			depth: 1 * this.#scale
		}, this.#scene);
		// this.#chassis.position = this.position.clone();
		// this.#chassis.parent = this.parent;
		this.#chassis.visibility = true;
		const chassisMaterial = new StandardMaterial(`${this.id}-chassis-material`, this.#scene);
		chassisMaterial.diffuseColor = this.color;
		this.#chassis.material = chassisMaterial;
		return Promise.resolve();
	}*/

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
		// wheel.parent = this.#parent;
		wheel.parent = this.#chassis;
		wheel.visibility = true;
		wheel.material = this.#wheelMaterial;
		this.#wheels.set(wheelType, wheel);
	}

	#buildCollisionBody() {
		const bodySize = {
			width: Car.CHASSIS_LENGTH * 2 * this.#scale,  // Slightly larger than the chassis
			height: .5 * this.#scale,                     // Height of car body
			depth: 2.2 * this.#scale                       // Width of car body
		};
		const collisionBody = MeshBuilder.CreateBox(`${this.id}-body-collision`, bodySize, this.#scene);
		collisionBody.position = this.#chassis.position.clone().add(new Vector3(0, 2, 0));
		collisionBody.visibility = true; // Make invisible
		this.#collisionBody = collisionBody;
		return Promise.resolve();
	}

	#buildWheelPhysicsAggregates() {
		const backLeftWheel = new PhysicsAggregate(
			this.#wheels.get(Car.BACK_LEFT_WHEEL),
			PhysicsShapeType.CAPSULE,
			{ mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: Car.WHEEL_FRICTION},
			this.#scene
		);
		const backRightWheel = new PhysicsAggregate(this.#wheels.get(Car.BACK_RIGHT_WHEEL), PhysicsShapeType.CAPSULE, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: Car.WHEEL_FRICTION}, this.#scene);
		const frontLeftWheel = new PhysicsAggregate(this.#wheels.get(Car.FRONT_LEFT_WHEEL), PhysicsShapeType.CAPSULE, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: Car.WHEEL_FRICTION}, this.#scene);
		const frontRightWheel = new PhysicsAggregate(this.#wheels.get(Car.FRONT_RIGHT_WHEEL), PhysicsShapeType.CAPSULE, { mass: Car.WHEEL_MASS, restitution: Car.WHEEL_RESTITUTION, friction: Car.WHEEL_FRICTION}, this.#scene);
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

	/*#buildChassisPhysicsAggregate() {
		const chassis = new PhysicsAggregate(
			this.#chassis,
			PhysicsShapeType.BOX,
			{
				mass: Car.CHASSIS_MASS,
				restitution: 0,
				friction: 0,
				linearDamping: 0.3,
				angularDamping: 0.3
			},
			this.#scene
		);
		chassis.shape.filterMembershipMask = this.#membershipMask;
		chassis.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car.CHASSIS, chassis);
		return Promise.resolve();
	}*/

	#buildCollisionBodyPhysicsAggregate() {
		const collisionBody = new PhysicsAggregate(
			this.#collisionBody,
			PhysicsShapeType.BOX,
			{
				mass: Car.COLLISION_BODY_MASS,
				restitution: 0,
				friction: 0.5,  // Add some friction
				linearDamping: 0.1,  // Light damping
				angularDamping: 0.1  // Light damping
			},
			this.#scene
		);
		collisionBody.shape.filterMembershipMask = this.#membershipMask;
		collisionBody.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car.COLLISION_BODY, collisionBody);
		return Promise.resolve();
	}

	/*#buildCollisionBodyPhysicsAggregate() {
		// const collisionBody = new PhysicsAggregate(this.#collisionBody, PhysicsShapeType.BOX, { mass: Car.CHASSIS_MASS, restitution: 0, friction: 0 }, this.#scene);
		const collisionBody = new PhysicsAggregate(
			this.#collisionBody,
			PhysicsShapeType.BOX,
			{ mass: Car.COLLISION_BODY_MASS, restitution: 0, friction: 0 },
			this.#scene
		);
		collisionBody.shape.filterMembershipMask = this.#membershipMask;
		collisionBody.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car.COLLISION_BODY, collisionBody);
		return Promise.resolve();
	}
*/
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
		const collisionAggregate = this.#aggregates.get(Car.COLLISION_BODY);
		const chassisAggregate = this.#aggregates.get(Car.CHASSIS);

		const constraint = new Physics6DoFConstraint(
			{
				pivotA: new Vector3(0, 0, 0),  // Pivot at chassis center
				pivotB: new Vector3(0, 0, 0),  // Pivot at collision body center
				axisA: new Vector3(0, 1, 0),
				axisB: new Vector3(0, 1, 0),
				collision: false
			},
			[
				{ axis: PhysicsConstraintAxis.LINEAR_X, minLimit: 0, maxLimit: 0 },
				{ axis: PhysicsConstraintAxis.LINEAR_Y, minLimit: 0, maxLimit: 0 },
				{ axis: PhysicsConstraintAxis.LINEAR_Z, minLimit: 0, maxLimit: 0 },
				{ axis: PhysicsConstraintAxis.ANGULAR_X, minLimit: 0, maxLimit: 0 },
				{ axis: PhysicsConstraintAxis.ANGULAR_Y, minLimit: 0, maxLimit: 0 },
				{ axis: PhysicsConstraintAxis.ANGULAR_Z, minLimit: 0, maxLimit: 0 }
			],
			this.scene
		);

		chassisAggregate.body.addConstraint(collisionAggregate.body, constraint);
		return Promise.resolve();
	}

	/*#setCollisionBodyConstraint() {
		const collisionAggregate = this.#aggregates.get(Car.COLLISION_BODY);
		const chassisAggregate = this.#aggregates.get(Car.CHASSIS);

		const chassisHalfHeight = this.#chassis.getBoundingInfo().boundingBox.extendSize.y;
		const collisionBodyHalfHeight = this.#collisionBody.getBoundingInfo().boundingBox.extendSize.y;
		const constraint = new LockConstraint(
			new Vector3(0, chassisHalfHeight, 0),
			new Vector3(0, -collisionBodyHalfHeight, 0),
			new Vector3(0, 1, 0),
			new Vector3(0, 1, 0),
			this.scene
		);
		const sConstraint = new Physics6DoFConstraint(
			{
				pivotA: new Vector3(0, chassisHalfHeight, 0),
				pivotB: new Vector3(0, -collisionBodyHalfHeight, 0),
				axisA: new Vector3(0, 1, 0),
				axisB: new Vector3(0, 1, 0),
				collision: false,
			},
			[
				{
					axis: PhysicsConstraintAxis.LINEAR_X,
					minLimit: 0,
					naxLimit: 0
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_X,
					minLimit: 0,
					maxLimit: 0
				},
			],
			this.scene
		);
		chassisAggregate.body.addConstraint(collisionAggregate.body, constraint, this.#scene);
		// collisionAggregate.body.addConstraint(chassisAggregate.body, constraint, this.#scene);
		return Promise.resolve();
	}*/

	#collisionBodyConstraint() {

	}

	/*#setWheelConstraint(wheelType) {
		const wheelAggregate = this.#aggregates.get(wheelType);
		const wheelPosition = wheelAggregate.transformNode.position;

		const constraint = new Physics6DoFConstraint(
			{
				pivotA: new Vector3(wheelPosition.x, 0, wheelPosition.z),  // Chassis connection point
				pivotB: new Vector3(0, 0, 0),                             // Wheel center
				axisA: new Vector3(1, 0, 0),                             // Rotation axis for chassis
				axisB: new Vector3(1, 0, 0),                             // Rotation axis for wheel
				collision: false,
			},
			[
				// Keep position fixed
				{ axis: PhysicsConstraintAxis.LINEAR_X, minLimit: 0, maxLimit: 0 },
				{ axis: PhysicsConstraintAxis.LINEAR_Y, minLimit: 0, maxLimit: 0 },
				{ axis: PhysicsConstraintAxis.LINEAR_Z, minLimit: 0, maxLimit: 0 },

				// Allow free rotation around the wheel's axis (X-axis)
				{ axis: PhysicsConstraintAxis.ANGULAR_X, minLimit: -Math.PI * 2, maxLimit: Math.PI * 2 },

				// Lock sideways tilt
				{ axis: PhysicsConstraintAxis.ANGULAR_Y, minLimit: 0, maxLimit: 0 },
				{ axis: PhysicsConstraintAxis.ANGULAR_Z, minLimit: 0, maxLimit: 0 }
			],
			this.#scene
		);

		this.#aggregates.get(Car.CHASSIS).body.addConstraint(wheelAggregate.body, constraint);
		return constraint;
	}*/

	#setWheelConstraint(wheelType) {
		const wheelAggregate = this.#aggregates.get(wheelType);
		const wheelPosition = wheelAggregate.transformNode.position;
		const constraint = new Physics6DoFConstraint(
			{
				pivotA: new Vector3(wheelPosition.x, 0, wheelPosition.z / 2.0),
				pivotB: new Vector3(0, 0, -wheelPosition.z / 2.0),
				axisA: new Vector3(1, 0, 0),
				collision: false,
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
					minLimit: 0,
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
		this.#loadedModel = await ImportMeshAsync("/public/databases/car/Ferrari.glb", this.#scene, {});
		this.model.scaling = new Vector3(3 * this.#scale, 3 * this.#scale, 3 * this.#scale);
		// this.model.parent = this.#parent;
		this.model.parent = this.chassis;
		this.model.rotationQuaternion = null;
		this.model.rotation = new Vector3(0, Math.PI / 2, 0);
		// this.model.rotation = new Vector3(-Math.PI / 2, 0, -Math.PI / 2);
		/*this.#loadedModel.meshes.forEach(mesh => {
			mesh.isPickable = false;
			// Optionally disable collision detection entirely
			mesh.checkCollisions = false;
		});*/
		return Promise.resolve();
	}
}