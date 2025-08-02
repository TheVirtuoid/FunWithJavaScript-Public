import {
	Axis,
	Color3, ImportMeshAsync,
	MeshBuilder,
	Physics6DoFConstraint,
	PhysicsAggregate, PhysicsConstraintAxis,
	PhysicsShapeType, Space,
	StandardMaterial, Texture, Vector3, VertexBuffer
} from "@babylonjs/core";

export default class Car3 {
	static CHASSIS = Symbol('chassis');
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
		this.#applyChassisPhysics();
		this.#applyPhysicsToWheels();
		/*this.#aggregates.set(
			wheelPointer,
			this.#applyWheelPhysics(this.#wheel)
		);
		this.#setWheelConstraint(
			this.#wheel,
			wheelPointer
		);*/
		this.#setAllWheelConstraints();

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
		console.log("🔧 Constraint Debug:");
		console.log("Chassis position:", this.#chassis.position);
		console.log("Wheel position:", wheel.position);
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

		/*this.#chassis.visibility = .25;
		wheel.visibility = .25;

		const boxA = MeshBuilder.CreateBox('pivotA', {
			size: 0.1,
			faceColors: [
				Color3.Red(),
				Color3.Red(),
				Color3.Red(),
				Color3.Red(),
				Color3.Red(),
				Color3.Red()
			]
		}, this.#scene);
		boxA.position = worldPivotA;

		const boxB = MeshBuilder.CreateBox('pivotB', {
			size: 0.1,
			faceColors: [
				Color3.Green(),
				Color3.Green(),
				Color3.Green(),
				Color3.Green(),
				Color3.Green(),
				Color3.Green()
			]
		}, this.#scene);
		boxB.position = worldPivotB;*/


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

	#getLocalCenter(mesh) {
		const boundingInfo = mesh.getBoundingInfo();
		const min = boundingInfo.boundingBox.minimum;
		const max = boundingInfo.boundingBox.maximum;
		return min.add(max).scale(0.5);
	}

}
