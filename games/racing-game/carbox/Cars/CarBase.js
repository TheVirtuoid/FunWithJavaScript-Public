import {
	Color3,
	MeshBuilder,
	Physics6DoFConstraint,
	PhysicsAggregate, PhysicsConstraintAxis,
	PhysicsShapeType,
	StandardMaterial, Texture, Vector3
} from "@babylonjs/core";

export default class CarBase {
	static CHASSIS = Symbol('chassis');
	static MODEL = Symbol('body');
	static BACK_LEFT_WHEEL = Symbol('back-left-wheel');
	static BACK_RIGHT_WHEEL = Symbol('back-right-wheel');
	static FRONT_LEFT_WHEEL = Symbol('front-left-wheel');
	static FRONT_RIGHT_WHEEL = Symbol('front-right-wheel');

	static DEBUG = true;
	static HIDE_CHASSIS = true;
	static HIDE_COLLISION_BOX = true;
	static HIDE_MODEL = false;

	static WHEEL_RADIUS = .375;
	static WHEEL_RESTITUTION = 0;
	static WHEEL_MASS = 1;
	static WHEEL_FRICTION = 1;

	static MODEL_MASS = 10;
	static MODEL_RESTITUTION = 0;
	static MODEL_FRICTION = 0.5;

	static CHASSIS_MASS = 5;
	static CHASSIS_RESTITUTION = 0;
	static CHASSIS_FRICTION = 0.5;

	#scene;
	#position;
	#id;

	#wheelMaterial;
	#wheels;
	#wheelPivotPoints = new Map();

	#chassis;
	#chassisPivotPoints = new Map();
	#chassisDimensions;

	#physicsGroup;
	#membershipMask;
	#collideMask;
	#aggregates = new Map();

	#modelRoot;
	#modelDimensions;
	#collisionBox;

	constructor(args = {}) {
		const { scene, position, id, physicsGroup } = args;
		this.#scene = scene;
		this.#position = position;
		this.#id = id;
		this.#physicsGroup = physicsGroup;
		this.#membershipMask = this.#physicsGroup;
		this.#collideMask = ~this.#membershipMask;
	}

	get scene() {
		return this.#scene;
	}

	get position() {
		return this.#position;
	}

	get id() {
		return this.#id;
	}

	get wheels() {
		return this.#wheels;
	}

	get chassis() {
		return this.#chassis;
	}

	get wheelMaterial() {
		return this.#wheelMaterial;
	}

	get physicsGroup() {
		return this.#physicsGroup;
	}

	get membershipMask() {
		return this.#membershipMask;
	}

	get collideMask() {
		return this.#collideMask;
	}

	async build() {
		await this.#buildModel();
		this.#buildWheelMaterial();
		this.#buildChassis();
		this.#buildWheels();
		this.#buildCollisionBox();
		this.#applyChassisPhysics();
		this.#applyPhysicsToWheels();
		this.#applyCollisionBoxPhysics();
		this.#setAllWheelConstraints();
		this.#setCollisionBoxConstraint();
	}

	#buildWheelMaterial() {
		this.#wheelMaterial = new StandardMaterial(`${this.id}-wheel-material`, this.scene);
		const texture = new Texture('/images/checkerboard-7800519_1280.jpg', this.scene);
		// const texture = new Texture('/images/vectorstock_33744900.jpg', this.scene);
		texture.uScale = .25; // Scale texture in U direction
		const wheelRadius = (this.#modelDimensions?.wheelHeight || CarBase.WHEEL_RADIUS);
		const wheelThickness = wheelRadius / 2; // Your diameterZ is radius/2
		const aspectRatio = wheelRadius / wheelThickness; // This should be 4:1
		/*texture.uOffset = .25;
		// texture.vScale = aspectRatio;
		texture.vScale = 1;
		texture.vOffset = 0;*/
		this.#wheelMaterial.diffuseTexture = texture;
	}

	#buildWheel(wheelData) {
		let { wheelHeight } = this.#modelDimensions;
		const diameterX = wheelHeight || CarBase.WHEEL_RADIUS;
		const diameterY = wheelHeight || CarBase.WHEEL_RADIUS;
		const diameterZ = (wheelHeight || CarBase.WHEEL_RADIUS) / 4;
		const { x, z, name, key } = wheelData;
		const wheel = MeshBuilder.CreateSphere(
			`${this.id}-wheel-${name}`, {
				diameterX,
				diameterY,
				diameterZ
			},
			this.scene
		);
		wheel.name = `${this.id}-${name}`;

		const pivotPoint = new Vector3(
			x,
			0,
			z
		);
		this.#chassisPivotPoints.set(key, pivotPoint);

		const wheelPivotPoint = new Vector3(
			0,
			0,
			0
		);
		this.#wheelPivotPoints.set(key, wheelPivotPoint);
		wheel.position.z = z;
		wheel.position.x = x;
		wheel.material = this.wheelMaterial;
		return wheel;
	}

	#buildWheels(wheelDatabase) {
		this.#wheels = new Map();
		this.#wheels.set(CarBase.BACK_LEFT_WHEEL, this.#buildWheel(wheelDatabase.get(CarBase.BACK_LEFT_WHEEL)));
		this.#wheels.set(CarBase.BACK_RIGHT_WHEEL, this.#buildWheel(wheelDatabase.get(CarBase.BACK_RIGHT_WHEEL)));
		this.#wheels.set(CarBase.FRONT_LEFT_WHEEL, this.#buildWheel(wheelDatabase.get(CarBase.FRONT_LEFT_WHEEL)));
		this.#wheels.set(CarBase.FRONT_RIGHT_WHEEL, this.#buildWheel(wheelDatabase.get(CarBase.FRONT_RIGHT_WHEEL)));
	}

	#buildChassis() {
		const width = this.#modelDimensions.width - 1;
		const height = this.#modelDimensions.height / 4;
		const depth = this.#modelDimensions.length / 4;
		this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {
			width,
			height,
			depth
		}, this.scene);
		this.#chassisDimensions = { width, height, depth };
		this.#chassis.postion = Vector3.Zero();
		this.#chassis.isVisible = !CarBase.HIDE_CHASSIS;
		this.#modelRoot.position.y -= height;
	}

	#applyChassisPhysics(args = {}) {
		const { mass, restitution, friction } = args;
		const chassisAggregate = new PhysicsAggregate(
			this.#chassis,
			PhysicsShapeType.BOX,
			{
				mass: mass || CarBase.CHASSIS_MASS,
				restitution: restitution || CarBase.CHASSIS_RESTITUTION,
				friction: friction || CarBase.CHASSIS_FRICTION
			},
			this.scene
		);
		chassisAggregate.shape.filterMembershipMask = this.#membershipMask;
		chassisAggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(CarBase.CHASSIS, chassisAggregate);
	}

	#applyWheelPhysics(args = {}) {
		const { wheel, mass, restitution, friction } = args;
		const aggregate = new PhysicsAggregate(
			wheel,
			PhysicsShapeType.CAPSULE,
			{
				mass: mass || CarBase.WHEEL_MASS,
				restitution: restitution || CarBase.WHEEL_RESTITUTION,
				friction: friction || CarBase.WHEEL_FRICTION
			},
			this.scene
		);
		aggregate.shape.filterMembershipMask = this.#membershipMask;
		aggregate.shape.filterCollideMask = this.#collideMask;
		return aggregate;
	}

	#applyPhysicsToWheels(args = {}) {
		const { mass, restitution, friction } = args;
		this.#wheels.forEach((wheel, key) => {
			this.#aggregates.set(key, this.#applyWheelPhysics({ wheel, mass, restitution, friction }));
		});
	}

	#setAllWheelConstraints() {
		this.#wheels.forEach((wheel, key) => {
			this.#setWheelConstraint(wheel, key);
		});
	}

	#setWheelConstraint(args) {
		const { wheel, wheelDatabase, key } = args;
		const wheelAggregate = this.#aggregates.get(key);
		const wheelData = wheelDatabase.get(key);
		const pivotA = this.#chassisPivotPoints.get(key);
		const pivotB = this.#wheelPivotPoints.get(key);
		if (CarBase.DEBUG) {
			console.log(`🔧 Wheel Constraint Debug: (${wheelData.name})`);
			console.log("Chassis position:", this.#chassis.position);
			console.log("Wheel position:", wheel.position);
			console.log(`Wheel data:`, wheelData);
			console.log("PivotA (chassis local):", pivotA);
			console.log("PivotB (wheel local):", pivotB);
			// Calculate world positions for verification
			const chassisMatrix = this.#chassis.getWorldMatrix();
			const wheelMatrix = wheel.getWorldMatrix();
			const worldPivotA = Vector3.TransformCoordinates(pivotA, chassisMatrix);
			const worldPivotB = Vector3.TransformCoordinates(pivotB, wheelMatrix);

			console.log("World PivotA:", worldPivotA);
			console.log("World PivotB:", worldPivotB);
			console.log("Pivot distance:", Vector3.Distance(worldPivotA, worldPivotB));

			// If distance is > 0.1, there might be an issue
			if (Vector3.Distance(worldPivotA, worldPivotB) > 0.1) {
				console.warn("⚠️ Large pivot distance - potential instability!");
			}
			console.log(`\n\n\n`);
		}
		const constraint = new Physics6DoFConstraint(
			{
				pivotA,
				pivotB,
				axisA: new Vector3(0, 0, 1),
				axisB: new Vector3(0, 0, 1),
				collision: false,
				perpAxisA: new Vector3(1, 0, 0),
				perpAxisB: new Vector3(1, 0, 0),
			},
			[
				{
					axis: PhysicsConstraintAxis.LINEAR_X,
					minLimit: 0,
					maxLimit: 0
				},
				{
					axis: PhysicsConstraintAxis.LINEAR_Y,
					minLimit: 0,
					maxLimit: 0
				},
				{
					axis: PhysicsConstraintAxis.LINEAR_Z,
					minLimit: 0,
					maxLimit: 0
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_Y,
					minLimit: 0,
					maxLimit: 0
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_Z,
					minLimit: 0,
					maxLimit: 0
				}
			],
			this.#scene
		);
		this.#aggregates.get(CarBase.CHASSIS)
			.body
			.addConstraint(wheelAggregate.body, constraint);
		return constraint;
	}

	async #buildModel() {
		throw new Error('You must implement the #buildModel method in your subclass.');
	}

	#buildCollisionBox() {
		let { length, width, height, wheelHeight } = this.#modelDimensions;
		this.#collisionBox = MeshBuilder.CreateBox(`${this.id}-collision-box`, {
			width,
			height,
			depth: length
		});
		const mat = new StandardMaterial(`${this.id}-collision-box-mat`, this.#scene);
		mat.diffuseColor = new Color3(0, 0, 1);
		this.#collisionBox.material = mat;
		// collision box needs to align with the bottom of the chassis
		this.#collisionBox.position = new Vector3(
			0,
			height / 2 - this.#chassisDimensions.height / 2,
			0
		);
		this.#modelRoot.position.y -= height / 2 - this.#chassisDimensions.height / 2;
		this.#collisionBox.showBoundingBox = true;
		this.#modelRoot.parent = this.#collisionBox;
		this.#collisionBox.visibilty = .05;
		this.#collisionBox.isVisible = !CarBase.HIDE_COLLISION_BOX;
	}

	#applyCollisionBoxPhysics(args = {}) {
		const { mass, restitution, friction } = args;
		const aggregate = new PhysicsAggregate(
			this.#collisionBox,
			PhysicsShapeType.BOX,
			{
				mass: mass || CarBase.MODEL_MASS,
				restitution: restitution || CarBase.MODEL_RESTITUTION,
				friction: friction || CarBase.MODEL_FRICTION
			},
			this.scene
		);
		aggregate.shape.filterMembershipMask = this.#membershipMask;
		aggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(CarBase.MODEL, aggregate);
	}

	#setCollisionBoxConstraint() {
		const aggregate = this.#aggregates.get(CarBase.MODEL);
		const model = this.#collisionBox;
		const { minimum: chMin, maximum: chMax } = this.#chassis.getBoundingInfo().boundingBox;
		const { minimum: cbMin, maximum: cbMax } = this.#collisionBox.getBoundingInfo().boundingBox;
		const chHeight = chMax.y - chMin.y;
		const cbHeight = cbMax.y - cbMin.y;
		/*const pivotA = new Vector3(0, 0, 0);
		const pivotB = new Vector3(0, model.position.y * -1, 0);*/
		const pivotA = new Vector3(0, -chHeight / 2, 0);
		const pivotB = new Vector3(0, -cbHeight / 2, 0);

		if (CarBase.DEBUG) {
			console.log("🔧 Model CollisionBox Constraint Debug:");
			console.log("Chassis position:", this.#chassis.position);
			console.log("Model position:", model.position);
			console.log("PivotA (chassis local):", pivotA);
			console.log("PivotB (model local):", pivotB);
			// Calculate world positions for verification
			const chassisMatrix = this.#chassis.getWorldMatrix();
			const wheelMatrix = model.getWorldMatrix();
			const worldPivotA = Vector3.TransformCoordinates(pivotA, chassisMatrix);
			const worldPivotB = Vector3.TransformCoordinates(pivotB, wheelMatrix);

			console.log("World PivotA:", worldPivotA);
			console.log("World PivotB:", worldPivotB);
			console.log("Pivot distance:", Vector3.Distance(worldPivotA, worldPivotB));

			// If distance is > 0.1, there might be an issue
			if (Vector3.Distance(worldPivotA, worldPivotB) > 0.1) {
				console.warn("⚠️ Large pivot distance - potential instability!");
			}
		}

		const constraint = new Physics6DoFConstraint(
			{
				pivotA,
				pivotB,
				axisA: new Vector3(0, 0, 1),
				axisB: new Vector3(0, 0, 1),
				collision: false,
				perpAxisA: new Vector3(1, 0, 0),
				perpAxisB: new Vector3(1, 0, 0),
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
					axis: PhysicsConstraintAxis.ANGULAR_Y,
					minLimit: 0,
					maxLimit: 0,
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_Z,
					minLimit: 0,
					maxLimit: 0,
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_X,
					minLimit: 0,
					maxLimit: 0,
				}
			],
			this.#scene
		);
		this.#aggregates.get(CarBase.CHASSIS)
			.body
			.addConstraint(aggregate.body, constraint);
		return constraint;
	}
}
