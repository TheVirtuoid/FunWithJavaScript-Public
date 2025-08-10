import {
	Axis,
	Color3, ImportMeshAsync, Material,
	MeshBuilder,
	Physics6DoFConstraint,
	PhysicsAggregate, PhysicsConstraintAxis,
	PhysicsShapeType, Space,
	StandardMaterial, Texture, Vector3, VertexBuffer
} from "@babylonjs/core";

export default class Car3 {
	static CHASSIS = Symbol('chassis');
	static MODEL = Symbol('body');
	static BACK_LEFT_WHEEL = Symbol('back-left-wheel');
	static BACK_RIGHT_WHEEL = Symbol('back-right-wheel');
	static FRONT_LEFT_WHEEL = Symbol('front-left-wheel');
	static FRONT_RIGHT_WHEEL = Symbol('front-right-wheel');
	static BACK_LEFT_WHEEL_DATA = { x: 1, z: -1, name: 'back-left', key: Car3.BACK_LEFT_WHEEL };
	static BACK_RIGHT_WHEEL_DATA = { x: 1, z: 1, name: 'back-right', key: Car3.BACK_RIGHT_WHEEL };
	static FRONT_LEFT_WHEEL_DATA = { x: -1, z: -1, name: 'front-left', key: Car3.FRONT_LEFT_WHEEL };
	static FRONT_RIGHT_WHEEL_DATA = { x: -1, z: 1, name: 'front-right', key: Car3.FRONT_RIGHT_WHEEL };
	static CHASSIS_LENGTH = 5;
	static CHASSIS_WIDTH = 2;
	static CHASSIS_HEIGHT = 1;

	static WHEEL_DATA = new Map([
		[Car3.BACK_LEFT_WHEEL, Car3.BACK_LEFT_WHEEL_DATA],
		[Car3.BACK_RIGHT_WHEEL, Car3.BACK_RIGHT_WHEEL_DATA],
		[Car3.FRONT_LEFT_WHEEL, Car3.FRONT_LEFT_WHEEL_DATA],
		[Car3.FRONT_RIGHT_WHEEL, Car3.FRONT_RIGHT_WHEEL_DATA]
	]);

	static WHEEL_HEIGHT = .75;
	static WHEEL_RADIUS = .75;

	static WHEEL_RESTITUTION = 0;
	static WHEEL_MASS = 1;
	static WHEEL_FRICTION = 1;
	static CHASSIS_MASS = 5;
	static MODEL_MASS = 5;

	#scene;
	#position;
	#id;

	#wheelMaterial;
	#wheels;
	#wheel;
	#wheelPivotPoints = new Map();

	#chassis;
	#chassisPivotPoints = new Map();

	#physicsGroup;
	#membershipMask;
	#collideMask;
	#aggregates = new Map();

	#loadedModel;
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
		const wheelPointer = Car3.FRONT_RIGHT_WHEEL;
		this.#buildWheelMaterial();
		// this.#wheel = this.#buildWheel(Car3.WHEEL_DATA.get(wheelPointer));
		this.#buildChassis();
		this.#buildWheels();
		// await this.#buildModel();
		this.#buildTest();
		this.#applyChassisPhysics();
		this.#applyPhysicsToWheels();
		this.#applyTestPhysics();
		// this.#applyModelPhysics();
		/*this.#aggregates.set(
			wheelPointer,
			this.#applyWheelPhysics(this.#wheel)
		);
		this.#setWheelConstraint(
			this.#wheel,
			wheelPointer
		);*/
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
		/*const wheel = MeshBuilder.CreateCapsule(`${this.id}-wheel-${name}`, {
			height: Car3.WHEEL_HEIGHT,
			radius: Car3.WHEEL_RADIUS,
			tessellation: 256
		}, this.scene);*/
		/*const wheel = MeshBuilder.CreateCylinder(
			`${this.id}-wheel-${name}`, {
				height: Car3.WHEEL_HEIGHT / 2,
				diameter: Car3.WHEEL_RADIUS * 2,
				updatable: true
			},
			this.scene
		);*/
		const wheel = MeshBuilder.CreateSphere(
			`${this.id}-wheel-${name}`, {
				diameterX: Car3.WHEEL_RADIUS * 2,
				diameterY: Car3.WHEEL_RADIUS * 2,
				diameterZ: Car3.WHEEL_RADIUS / 2,
			},
			this.scene
		);
		wheel.name = `${this.id}-${name}`;

		const pivotPoint = new Vector3(
			Car3.CHASSIS_LENGTH / 2  * x,
			0,
			z
		);
		this.#chassisPivotPoints.set(key, pivotPoint);

		const wheelPivotPoint = new Vector3(
			.5,
			0,
			Car3.WHEEL_HEIGHT / 2
		);
		this.#wheelPivotPoints.set(key, wheelPivotPoint);

		wheel.position.z = pivotPoint.z + wheelPivotPoint.z * z;
		wheel.position.x = pivotPoint.x - .5 * x;
		wheel.material = this.wheelMaterial;
		return wheel;
	}

	#buildWheels() {
		this.#wheels = new Map();
		this.#wheels.set(Car3.BACK_LEFT_WHEEL, this.#buildWheel(Car3.BACK_LEFT_WHEEL_DATA));
		this.#wheels.set(Car3.BACK_RIGHT_WHEEL, this.#buildWheel(Car3.BACK_RIGHT_WHEEL_DATA));
		this.#wheels.set(Car3.FRONT_LEFT_WHEEL, this.#buildWheel(Car3.FRONT_LEFT_WHEEL_DATA));
		this.#wheels.set(Car3.FRONT_RIGHT_WHEEL, this.#buildWheel(Car3.FRONT_RIGHT_WHEEL_DATA));
	}

	#buildChassis() {
		this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {
			width: Car3.CHASSIS_LENGTH,
			height: Car3.CHASSIS_HEIGHT,
			depth: Car3.CHASSIS_WIDTH
		}, this.scene);
	}

	#applyChassisPhysics() {
		const chassisAggregate = new PhysicsAggregate(
			this.#chassis,
			PhysicsShapeType.BOX,
			{
				mass: Car3.CHASSIS_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		chassisAggregate.shape.filterMembershipMask = this.#membershipMask;
		chassisAggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car3.CHASSIS, chassisAggregate);
	}

	#applyWheelPhysics(wheel) {
		const aggregate = new PhysicsAggregate(
			wheel,
			PhysicsShapeType.CAPSULE,
			{
				mass: Car3.WHEEL_MASS,
				restitution: Car3.WHEEL_RESTITUTION,
				friction: Car3.WHEEL_FRICTION
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
		const wheelData = Car3.WHEEL_DATA.get(wheelPointer);
		const pivotA = this.#chassisPivotPoints.get(wheelPointer);
		const pivotB = this.#wheelPivotPoints.get(wheelPointer);
		pivotA.x += pivotB.x * wheelData.x * -1;
		pivotB.x = 0;
		pivotB.z = pivotB.z * wheelData.z * -1;
		/*console.log("🔧 Constraint Debug:");
		console.log("Chassis position:", this.#chassis.position);
		console.log("Wheel position:", wheel.position);
		console.log("PivotA (chassis local):", pivotA);
		console.log("PivotB (wheel local):", pivotB);*/

		/*// Calculate world positions for verification
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
		}*/
		// BodyA = chassis
		// BodyB = wheel
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
				}
			],
			this.#scene
		);
		this.#aggregates.get(Car3.CHASSIS)
			.body
			.addConstraint(wheelAggregate.body, constraint);
		return constraint;
	}

	#setModelConstraint() {
		const aggregate = this.#aggregates.get(Car3.MODEL);
		const model = this.#loadedModel.meshes[9];
		const height = model.getBoundingInfo().boundingBox.maximum.y -
			model.getBoundingInfo().boundingBox.minimum.y;
		model.showBoundingBox = true;
		console.log(this.#loadedModel);
		const pivotA = new Vector3(0, Car3.CHASSIS_HEIGHT / 2, 0);
		const pivotB = new Vector3(0, -height / 2, 0);

		console.log("🔧 Model Constraint Debug:");
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
		const boxA = MeshBuilder.CreateBox('boxA', {
			size: .1
		}, this.#scene);
		const boxAmaterial = new StandardMaterial('boxA-material', this.#scene);
		boxAmaterial.diffuseColor = new Color3(1, 0, 0);
		boxA.material = boxAmaterial;
		boxA.position = pivotA;
		const boxB = MeshBuilder.CreateBox('boxB', {
			size: .1
		}, this.#scene);
		const boxBmaterial = new StandardMaterial('boxB-material', this.#scene);
		boxBmaterial.diffuseColor = new Color3(0, 1, 0);
		boxB.material = boxBmaterial;
		boxB.position = pivotB;
		// BodyA = chassis
		// BodyB = Model
		const opaque = .25;
		this.#chassis.visibility = opaque;
		/*this.#loadedModel.meshes.forEach((mesh) => {
			mesh.visibility = opaque;
			// Force alpha blending mode
			if (mesh.material) {
				mesh.material.alpha = opaque;
				mesh.material.transparencyMode = Material.MATERIAL_ALPHABLEND;
			}
		});*/
		const constraint = new Physics6DoFConstraint(
			{
				pivotA,
				pivotB,
				axisA: new Vector3(0, 1, 1),
				axisB: new Vector3(0, 1, 1),
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
		this.#aggregates.get(Car3.CHASSIS)
			.body
			.addConstraint(aggregate.body, constraint);
		return constraint;
	}

	async #buildModel() {
		this.#loadedModel = await ImportMeshAsync("/public/databases/car/Ferrari.glb", this.#scene, {});
		this.#loadedModel.meshes[0].scaling = new Vector3(2, 2, 2);
		// this.model.scaling = new Vector3(3 * this.#scale, 3 * this.#scale, 3 * this.#scale);
		// this.model.parent = this.#parent;
		/*this.model.rotationQuaternion = null;
		this.model.rotation = new Vector3(0, Math.PI / 2, 0);*/
		// this.model.rotation = new Vector3(-Math.PI / 2, 0, -Math.PI / 2);
		/*this.#loadedModel.meshes.forEach(mesh => {
			mesh.isPickable = false;
			// Optionally disable collision detection entirely
			mesh.checkCollisions = false;
		});*/
		this.#loadedModel.position = new Vector3(0, 10, 0);
		return Promise.resolve();
	}

	#applyModelPhysics() {
		const aggregate = new PhysicsAggregate(
			this.#loadedModel.meshes[9],
			PhysicsShapeType.MESH,
			{
				mass: Car3.MODEL_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		aggregate.shape.filterMembershipMask = this.#membershipMask;
		aggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car3.MODEL, aggregate);
	}

	#buildTest() {
		this.#test = MeshBuilder.CreateBox(`${this.id}-test`, {
			width: 2,
			height: 2,
			depth: 2
		});
		const mat = new StandardMaterial(`${this.id}-test-mat`, this.#scene);
		mat.diffuseColor = new Color3(0, 0, 1);
		this.#test.material = mat;
		this.#test.position = new Vector3(0, 1.5, 0);
	}

	#applyTestPhysics() {
		const aggregate = new PhysicsAggregate(
			this.#test,
			PhysicsShapeType.BOX,
			{
				mass: Car3.MODEL_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		aggregate.shape.filterMembershipMask = this.#membershipMask;
		aggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(Car3.MODEL, aggregate);
	}

	#setTestConstraint() {
		const aggregate = this.#aggregates.get(Car3.MODEL);
		const model = this.#test;
		const height = model.getBoundingInfo().boundingBox.maximum.y -
			model.getBoundingInfo().boundingBox.minimum.y;
		console.log(height, model.position);
		const pivotA = new Vector3(0, 0, 0);
		const pivotB = new Vector3(0, model.position.y * -1, 0);

		console.log("🔧 Model Constraint Debug:");
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
		this.#aggregates.get(Car3.CHASSIS)
			.body
			.addConstraint(aggregate.body, constraint);
		return constraint;
	}

}
