import {
	Axis,
	Color3, ImportMeshAsync, Material,
	MeshBuilder,
	Physics6DoFConstraint,
	PhysicsAggregate, PhysicsConstraintAxis,
	PhysicsShapeType, Space,
	StandardMaterial, Texture, Vector3, VertexBuffer
} from "@babylonjs/core";

export default class Ferrari {
	static CHASSIS = Symbol('chassis');
	static MODEL = Symbol('body');
	static BACK_LEFT_WHEEL = Symbol('back-left-wheel');
	static BACK_RIGHT_WHEEL = Symbol('back-right-wheel');
	static FRONT_LEFT_WHEEL = Symbol('front-left-wheel');
	static FRONT_RIGHT_WHEEL = Symbol('front-right-wheel');
	/*static BACK_LEFT_WHEEL_DATA = { x: 1, z: -1, name: 'back-left', key: Ferrari.BACK_LEFT_WHEEL };
	static BACK_RIGHT_WHEEL_DATA = { x: 1, z: 1, name: 'back-right', key: Ferrari.BACK_RIGHT_WHEEL };
	static FRONT_LEFT_WHEEL_DATA = { x: -1, z: -1, name: 'front-left', key: Ferrari.FRONT_LEFT_WHEEL };
	static FRONT_RIGHT_WHEEL_DATA = { x: -1, z: 1, name: 'front-right', key: Ferrari.FRONT_RIGHT_WHEEL };*/
	static BACK_LEFT_WHEEL_DATA = { x: 1, z: -1, name: 'back-left', key: Ferrari.BACK_LEFT_WHEEL };
	static BACK_RIGHT_WHEEL_DATA = { x: 1, z: 1, name: 'back-right', key: Ferrari.BACK_RIGHT_WHEEL };
	static FRONT_LEFT_WHEEL_DATA = { x: -1.25, z: -1.25, name: 'front-left', key: Ferrari.FRONT_LEFT_WHEEL };
	static FRONT_RIGHT_WHEEL_DATA = { x: -1.25, z: 1.25, name: 'front-right', key: Ferrari.FRONT_RIGHT_WHEEL };
	static CHASSIS_LENGTH = 6.5;
	static CHASSIS_WIDTH = 2;
	static CHASSIS_HEIGHT = 1;
	static SCALE = 2;

	static WHEEL_DATA = new Map([
		[Ferrari.BACK_LEFT_WHEEL, Ferrari.BACK_LEFT_WHEEL_DATA],
		[Ferrari.BACK_RIGHT_WHEEL, Ferrari.BACK_RIGHT_WHEEL_DATA],
		[Ferrari.FRONT_LEFT_WHEEL, Ferrari.FRONT_LEFT_WHEEL_DATA],
		[Ferrari.FRONT_RIGHT_WHEEL, Ferrari.FRONT_RIGHT_WHEEL_DATA]
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
		const wheelPointer = Ferrari.FRONT_RIGHT_WHEEL;
		await this.#buildModel();
		this.#buildWheelMaterial();
		this.#buildChassis();
		this.#buildWheels();
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
		// const texture = new Texture('/images/vectorstock_33744900.jpg', this.scene);
		texture.uScale = .25; // Scale texture in U direction
		const wheelRadius = (this.#modelDimensions?.wheelHeight || Ferrari.WHEEL_RADIUS);
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

		const { x, z, name, key } = wheelData;
		const wheel = MeshBuilder.CreateSphere(
			`${this.id}-wheel-${name}`, {
				diameterX: (wheelHeight || Ferrari.WHEEL_RADIUS) * 2,
				diameterY: (wheelHeight || Ferrari.WHEEL_RADIUS) * 2,
				diameterZ: (wheelHeight || Ferrari.WHEEL_RADIUS) / 2,
			},
			this.scene
		);
		wheel.name = `${this.id}-${name}`;

		const pivotPoint = new Vector3(
			Ferrari.CHASSIS_LENGTH / 2  * x,
			0,
			z
		);
		this.#chassisPivotPoints.set(key, pivotPoint);

		const wheelPivotPoint = new Vector3(
			1,
			0,
			Ferrari.WHEEL_HEIGHT / 2
		);
		this.#wheelPivotPoints.set(key, wheelPivotPoint);
		wheel.position.z = pivotPoint.z + wheelPivotPoint.z * z;
		wheel.position.x = pivotPoint.x - 1 * x;
		wheel.material = this.wheelMaterial;
		return wheel;
	}

	#buildWheels() {
		this.#wheels = new Map();
		this.#wheels.set(Ferrari.BACK_LEFT_WHEEL, this.#buildWheel(Ferrari.BACK_LEFT_WHEEL_DATA));
		this.#wheels.set(Ferrari.BACK_RIGHT_WHEEL, this.#buildWheel(Ferrari.BACK_RIGHT_WHEEL_DATA));
		this.#wheels.set(Ferrari.FRONT_LEFT_WHEEL, this.#buildWheel(Ferrari.FRONT_LEFT_WHEEL_DATA));
		this.#wheels.set(Ferrari.FRONT_RIGHT_WHEEL, this.#buildWheel(Ferrari.FRONT_RIGHT_WHEEL_DATA));
	}

	#buildChassis() {
		console.log(this.#modelDimensions);
		/*this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {
			width: Ferrari.CHASSIS_LENGTH,
			height: Ferrari.CHASSIS_HEIGHT,
			depth: Ferrari.CHASSIS_WIDTH
		}, this.scene);*/
		this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {
			width: this.#modelDimensions.width - 1,
			height: this.#modelDimensions.height / 4,
			depth: this.#modelDimensions.length / 4
		}, this.scene);
	}

	#applyChassisPhysics() {
		const chassisAggregate = new PhysicsAggregate(
			this.#chassis,
			PhysicsShapeType.BOX,
			{
				mass: Ferrari.CHASSIS_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		chassisAggregate.shape.filterMembershipMask = this.#membershipMask;
		chassisAggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Ferrari.CHASSIS, chassisAggregate);
	}

	#applyWheelPhysics(wheel) {
		const aggregate = new PhysicsAggregate(
			wheel,
			PhysicsShapeType.CAPSULE,
			{
				mass: Ferrari.WHEEL_MASS,
				restitution: Ferrari.WHEEL_RESTITUTION,
				friction: Ferrari.WHEEL_FRICTION
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
		const wheelData = Ferrari.WHEEL_DATA.get(wheelPointer);
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
		this.#aggregates.get(Ferrari.CHASSIS)
			.body
			.addConstraint(wheelAggregate.body, constraint);
		return constraint;
	}

	async #buildModel() {
		this.#loadedModel = await ImportMeshAsync("/public/databases/car/Ferrari.glb", this.#scene, {});
		this.#loadedModel.meshes[0].scaling = new Vector3(Ferrari.SCALE, Ferrari.SCALE, Ferrari.SCALE);
		this.#modelRoot = this.#loadedModel.meshes[0];
		// this.#modelRoot.computeWorldMatrix(true);
		this.#scene.render();
		for (let i = 1; i <= 8; i++) {
			this.#loadedModel.meshes[i].isVisible = false;
		}
		this.#loadedModel.meshes[8].showBoundingBox = true;
		const low = { x: Infinity, y: Infinity, z: Infinity };
		const high = { x: -Infinity, y: -Infinity, z: -Infinity };
		this.#modelRoot.getChildMeshes().forEach((mesh, index) => {
			if (mesh.name === 'Ferrari Testarossa_primitive5') {
				const { minimumWorld, maximumWorld } = mesh.getBoundingInfo().boundingBox;
				low.x = Math.min(low.x, minimumWorld.x);
				low.y = Math.min(low.y, minimumWorld.y);
				low.z = Math.min(low.z, minimumWorld.z);
				high.x = Math.max(high.x, maximumWorld.x);
				high.y = Math.max(high.y, maximumWorld.y);
				high.z = Math.max(high.z, maximumWorld.z);
			}
		});
		const modelWheelData = this.#loadedModel.meshes[1].getBoundingInfo().boundingBox;
		const wheelHeight = modelWheelData.maximum.y - modelWheelData.minimum.y;
		this.#modelDimensions = {
			length: high.x - low.x,
			width: high.z - low.z,
			height: high.y - low.y,
			wheelHeight
		};
		this.#modelRoot.position = new Vector3(0, -this.#modelDimensions.height / 2, 0);
		return Promise.resolve();
	}

	#buildTest() {
		let { length, width, height, wheelHeight } = this.#modelDimensions;

		this.#test = MeshBuilder.CreateBox(`${this.id}-test`, {
			width,
			height,
			depth: length
		});
		// console.log(this.#modelDimensions);

		const mat = new StandardMaterial(`${this.id}-test-mat`, this.#scene);
		mat.diffuseColor = new Color3(0, 0, 1);
		this.#test.material = mat;
		const halfWheelHeight	= wheelHeight / 2;
		this.#test.position = new Vector3(
			0,
			halfWheelHeight,
			0
		);
		this.#test.showBoundingBox = true;
		this.#modelRoot.rotation = new Vector3(0, Math.PI / 2, 0);
		this.#modelRoot.parent = this.#test;
		this.#test.visibilty = .1;
		this.#test.isVisible = false;
		this.#chassis.isVisible = true;
	}

	#applyTestPhysics() {
		const aggregate = new PhysicsAggregate(
			this.#test,
			PhysicsShapeType.BOX,
			{
				mass: Ferrari.MODEL_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		aggregate.shape.filterMembershipMask = this.#membershipMask;
		aggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Ferrari.MODEL, aggregate);
	}

	#setTestConstraint() {
		const aggregate = this.#aggregates.get(Ferrari.MODEL);
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
		// const opaque = .5;
		// this.#chassis.visibility = opaque;
		// this.#test.visibility = opaque;
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
		this.#aggregates.get(Ferrari.CHASSIS)
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
