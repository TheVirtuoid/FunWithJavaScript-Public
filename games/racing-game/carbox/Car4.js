import {
	Axis,
	Color3, ImportMeshAsync, Material,
	MeshBuilder,
	Physics6DoFConstraint,
	PhysicsAggregate, PhysicsConstraintAxis,
	PhysicsShapeType, Space,
	StandardMaterial, Texture, Vector3, VertexBuffer
} from "@babylonjs/core";

export default class Car4 {
	static CHASSIS = Symbol('chassis');
	static MODEL = Symbol('body');
	static BACK_LEFT_WHEEL = Symbol('back-left-wheel');
	static BACK_RIGHT_WHEEL = Symbol('back-right-wheel');
	static FRONT_LEFT_WHEEL = Symbol('front-left-wheel');
	static FRONT_RIGHT_WHEEL = Symbol('front-right-wheel');
	static BACK_LEFT_WHEEL_DATA = { x: 1, z: -1, name: 'back-left', key: Car4.BACK_LEFT_WHEEL };
	static BACK_RIGHT_WHEEL_DATA = { x: 1, z: 1, name: 'back-right', key: Car4.BACK_RIGHT_WHEEL };
	static FRONT_LEFT_WHEEL_DATA = { x: -1, z: -1, name: 'front-left', key: Car4.FRONT_LEFT_WHEEL };
	static FRONT_RIGHT_WHEEL_DATA = { x: -1, z: 1, name: 'front-right', key: Car4.FRONT_RIGHT_WHEEL };
	static CHASSIS_LENGTH = 5;
	static CHASSIS_WIDTH = 2;
	static CHASSIS_HEIGHT = 1;

	static WHEEL_DATA = new Map([
		[Car4.BACK_LEFT_WHEEL, Car4.BACK_LEFT_WHEEL_DATA],
		[Car4.BACK_RIGHT_WHEEL, Car4.BACK_RIGHT_WHEEL_DATA],
		[Car4.FRONT_LEFT_WHEEL, Car4.FRONT_LEFT_WHEEL_DATA],
		[Car4.FRONT_RIGHT_WHEEL, Car4.FRONT_RIGHT_WHEEL_DATA]
	]);

	static WHEEL_HEIGHT = .75;
	static WHEEL_RADIUS = .75;

	static WHEEL_RESTITUTION = 0;
	static WHEEL_MASS = 1;
	static WHEEL_FRICTION = 1;
	static CHASSIS_MASS = 5;
	static MODEL_MASS = 10;

	#scene;
	#position;
	#id;

	#wheelMaterial;
	#wheels;
	#wheelPivotPoints = new Map();

	#chassis;
	#chassisPivotPoints = new Map();

	#physicsGroup;
	#membershipMask;
	#collideMask;
	#aggregates = new Map();

	#loadedModel;
	#modelHeight;
	#modelRoot;
	#modelTest;
	#modelDimensions;
	#test;

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
		const wheelPointer = Car4.FRONT_RIGHT_WHEEL;
		this.#buildWheelMaterial();
		this.#buildChassis();
		this.#buildWheels();
		await this.#buildModel();
		this.#buildTest();
		this.#applyChassisPhysics();
		this.#applyPhysicsToWheels();
		this.#applyTestPhysics();
		// this.#applyModelPhysics();
		this.#setAllWheelConstraints();
		this.#setTestConstraint();
		// this.#setModelConstraint();

	}

	#buildWheelMaterial() {
		this.#wheelMaterial = new StandardMaterial(`${this.id}-wheel-material`, this.scene);
		const texture = new Texture('/images/checkerboard-7800519_1280.jpg', this.scene);
		texture.uScale = .25; // Scale texture in U direction
		this.#wheelMaterial.diffuseTexture = texture;
	}

	#buildWheel(wheelData) {
		const { x, z, name, key } = wheelData;
		const wheel = MeshBuilder.CreateSphere(
			`${this.id}-wheel-${name}`, {
				diameterX: Car4.WHEEL_RADIUS * 2,
				diameterY: Car4.WHEEL_RADIUS * 2,
				diameterZ: Car4.WHEEL_RADIUS / 2,
			},
			this.scene
		);
		wheel.name = `${this.id}-${name}`;

		const pivotPoint = new Vector3(
			Car4.CHASSIS_LENGTH / 2  * x,
			0,
			z
		);
		this.#chassisPivotPoints.set(key, pivotPoint);

		const wheelPivotPoint = new Vector3(
			.5,
			0,
			Car4.WHEEL_HEIGHT / 2
		);
		this.#wheelPivotPoints.set(key, wheelPivotPoint);
		wheel.position.z = pivotPoint.z + wheelPivotPoint.z * z;
		wheel.position.x = pivotPoint.x - .5 * x;
		wheel.material = this.wheelMaterial;
		return wheel;
	}

	#buildWheels() {
		this.#wheels = new Map();
		this.#wheels.set(Car4.BACK_LEFT_WHEEL, this.#buildWheel(Car4.BACK_LEFT_WHEEL_DATA));
		this.#wheels.set(Car4.BACK_RIGHT_WHEEL, this.#buildWheel(Car4.BACK_RIGHT_WHEEL_DATA));
		this.#wheels.set(Car4.FRONT_LEFT_WHEEL, this.#buildWheel(Car4.FRONT_LEFT_WHEEL_DATA));
		this.#wheels.set(Car4.FRONT_RIGHT_WHEEL, this.#buildWheel(Car4.FRONT_RIGHT_WHEEL_DATA));
	}

	#buildChassis() {
		this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {
			width: Car4.CHASSIS_LENGTH,
			height: Car4.CHASSIS_HEIGHT,
			depth: Car4.CHASSIS_WIDTH
		}, this.scene);
	}

	#applyChassisPhysics() {
		const chassisAggregate = new PhysicsAggregate(
			this.#chassis,
			PhysicsShapeType.BOX,
			{
				mass: Car4.CHASSIS_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		chassisAggregate.shape.filterMembershipMask = this.#membershipMask;
		chassisAggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car4.CHASSIS, chassisAggregate);
	}

	#applyWheelPhysics(wheel) {
		const aggregate = new PhysicsAggregate(
			wheel,
			PhysicsShapeType.CAPSULE,
			{
				mass: Car4.WHEEL_MASS,
				restitution: Car4.WHEEL_RESTITUTION,
				friction: Car4.WHEEL_FRICTION
			},
			this.scene
		);
		aggregate.shape.filterMembershipMask = this.#membershipMask;
		aggregate.shape.filterCollideMask = this.#collideMask;
		return aggregate;
	}

	#applyPhysicsToWheels() {
		this.#wheels.forEach((wheel, key) => {
			this.#aggregates.set(key, this.#applyWheelPhysics(wheel));
		});
	}

	#setAllWheelConstraints() {
		this.#wheels.forEach((wheel, key) => {
			this.#setWheelConstraint(wheel, key);
		});
	}

	#setWheelConstraint(wheel, wheelPointer) {
		const wheelAggregate = this.#aggregates.get(wheelPointer);
		const wheelData = Car4.WHEEL_DATA.get(wheelPointer);
		const pivotA = this.#chassisPivotPoints.get(wheelPointer);
		const pivotB = this.#wheelPivotPoints.get(wheelPointer);
		pivotA.x += pivotB.x * wheelData.x * -1;
		pivotB.x = 0;
		pivotB.z = pivotB.z * wheelData.z * -1;
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
		this.#aggregates.get(Car4.CHASSIS)
			.body
			.addConstraint(wheelAggregate.body, constraint);
		return constraint;
	}

	async #buildModel() {
		this.#loadedModel = await ImportMeshAsync("/public/databases/car/Ferrari.glb", this.#scene, {});
		this.#loadedModel.meshes[0].scaling = new Vector3(2, 2, 2);
		this.#modelRoot = this.#loadedModel.meshes[0];
		this.#modelTest = this.#loadedModel.meshes[9];
		const low = { x: Infinity, y: Infinity, z: Infinity };
		const high = { x: -Infinity, y: -Infinity, z: -Infinity };
		this.#modelRoot.getChildMeshes().forEach((mesh, index) => {
			const { minimum, maximum, minimumWorld, maximumWorld } = mesh.getBoundingInfo().boundingBox;
			const subs = maximumWorld.subtract(minimumWorld);
			const test = {
				x: (maximum.x - minimum.x) / 2,
				y: (maximum.y - minimum.y) / 2,
				z: (maximum.z - minimum.z) / 2
			};
			const worldPosition = mesh.getAbsolutePosition();
			low.x = Math.min(low.x, subs.x);
			low.y = Math.min(low.y, subs.y);
			low.z = Math.min(low.z, subs.z);
			high.x = Math.max(high.x, subs.x);
			high.y = Math.max(high.y, subs.y);
			high.z = Math.max(high.z, subs.z);
		});
		this.#modelDimensions = {
			length: high.x - low.x,
			width: high.z - low.z,
			height: high.y - low.y
		};
		return Promise.resolve();
	}

	#buildTest() {
		// const { length, width, height } = this.#getDimensions(this.#modelTest);
		let { length, width, height } = this.#modelDimensions;
		length *= this.#modelRoot.scaling.x;
		width *= this.#modelRoot.scaling.z;
		height *= this.#modelRoot.scaling.y;

		this.#modelTest.showBoundingBox = true;
		this.#test = MeshBuilder.CreateBox(`${this.id}-test`, {
			width,
			length,
			depth: height
		});
		const mat = new StandardMaterial(`${this.id}-test-mat`, this.#scene);
		mat.diffuseColor = new Color3(0, 0, 1);
		this.#test.material = mat;
		const chassisDimension = this.#getDimensions(this.#chassis);
		const testDimension = this.#getDimensions(this.#test);
		this.#test.position = new Vector3(
			0,
			-.1,
			0
		);
		this.#modelRoot.rotation = new Vector3(0, Math.PI / 2, 0);
		this.#modelRoot.parent = this.#test;
		this.#test.isVisible = false;
		this.#chassis.isVisible = false;
	}

	#applyTestPhysics() {
		const aggregate = new PhysicsAggregate(
			this.#test,
			PhysicsShapeType.BOX,
			{
				mass: Car4.MODEL_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		aggregate.shape.filterMembershipMask = this.#membershipMask;
		aggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car4.MODEL, aggregate);
	}

	#setTestConstraint() {
		const aggregate = this.#aggregates.get(Car4.MODEL);
		const model = this.#test;
		const height = model.getBoundingInfo().boundingBox.maximum.y -
			model.getBoundingInfo().boundingBox.minimum.y;
		const pivotA = new Vector3(0, 0, 0);
		const pivotB = new Vector3(0, model.position.y * -1, 0);

		console.log("🔧 Model Test Constraint Debug:");
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
		/*const boxA = MeshBuilder.CreateBox('boxA', {
			size: .1
		}, this.#scene);
		const boxAmaterial = new StandardMaterial('boxA-material', this.#scene);
		boxAmaterial.diffuseColor = new Color3(1, 0, 0);
		boxA.material = boxAmaterial;
		boxA.position = pivotA;
		const boxB = MeshBuilder.CreateBox('boxB', {
			size: .1
		}, this.#scene);
		const boxBMaterial = new StandardMaterial('boxB-material', this.#scene);
		boxBMaterial.diffuseColor = new Color3(0, 1, 0);
		boxB.material = boxBMaterial;
		boxB.position = pivotB;*/
		// BodyA = chassis
		// BodyB = Model
		const opaque = 1;
		this.#chassis.visibility = opaque;
		this.#test.visibility = opaque;
		const constraint = new Physics6DoFConstraint(
			{
				pivotA,
				pivotB,
				axisA: new Vector3(0, 1, 0),
				axisB: new Vector3(0, 1, 0),
				collision: false,
				perpAxisA: new Vector3(1, 0, 0),
				perpAxisB: new Vector3(1, 0, 0),
			},
			[
				{
					axis: PhysicsConstraintAxis.LINEAR_X,
					minLimit: 0,
					maxLimit: 0,
					// maxForce: 1000
				},
				{
					axis: PhysicsConstraintAxis.LINEAR_Y,
					minLimit: 0,
					maxLimit: 0,
					// maxForce: 1000
				},
				{
					axis: PhysicsConstraintAxis.LINEAR_Z,
					minLimit: 0,
					maxLimit: 0,
					// maxForce: 1000
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_Y,
					minLimit: 0,
					maxLimit: 0,
					// maxForce: 500
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_Z,
					minLimit: 0,
					maxLimit: 0,
					// maxForce: 500
				},
				{
					axis: PhysicsConstraintAxis.ANGULAR_X,
					minLimit: 0,
					maxLimit: 0,
					// maxForce: 500
				}
			],
			this.#scene
		);
		this.#aggregates.get(Car4.CHASSIS)
			.body
			.addConstraint(aggregate.body, constraint);
		return constraint;
	}

	#getDimensions(mesh) {
		const { minimum, maximum } = mesh.getBoundingInfo().boundingBox;
		const dimensions = maximum.subtract(minimum);
		return { length: dimensions.x, width: dimensions.z, height: dimensions.y };
	}

}
