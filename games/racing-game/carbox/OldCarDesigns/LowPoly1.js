import {
	Color3, ImportMeshAsync,
	MeshBuilder,
	Physics6DoFConstraint,
	PhysicsAggregate, PhysicsConstraintAxis,
	PhysicsShapeType, Quaternion,
	StandardMaterial, Texture, Vector3
} from "@babylonjs/core";

export default class LowPoly1 {
	static CHASSIS = Symbol('chassis');
	static MODEL = Symbol('body');
	static BACK_LEFT_WHEEL = Symbol('back-left-wheel');
	static BACK_RIGHT_WHEEL = Symbol('back-right-wheel');
	static FRONT_LEFT_WHEEL = Symbol('front-left-wheel');
	static FRONT_RIGHT_WHEEL = Symbol('front-right-wheel');
	static FRONT_LEFT_WHEEL_DATA = { xMultiplier: 1, zMultiplier: -1, name: 'front-left', key: LowPoly1.FRONT_LEFT_WHEEL };
	static FRONT_RIGHT_WHEEL_DATA = { xMultiplier: 1, zMultiplier: 1, name: 'front-right', key: LowPoly1.FRONT_RIGHT_WHEEL };
	static BACK_LEFT_WHEEL_DATA = { xMultiplier: -1, zMultiplier: -1, name: 'back-left', key: LowPoly1.BACK_LEFT_WHEEL };
	static BACK_RIGHT_WHEEL_DATA = { xMultiplier: -1, zMultiplier: 1, name: 'back-right', key: LowPoly1.BACK_RIGHT_WHEEL };
	static CHASSIS_LENGTH = 6.5;
	static SCALE = 2;

	static DEBUG = false;
	static HIDE_CHASSIS = true;
	static HIDE_COLLISION_BOX = true;
	static HIDE_MODEL = false;

	static WHEEL_DATA = new Map([
		[LowPoly1.BACK_LEFT_WHEEL, LowPoly1.BACK_LEFT_WHEEL_DATA],
		[LowPoly1.BACK_RIGHT_WHEEL, LowPoly1.BACK_RIGHT_WHEEL_DATA],
		[LowPoly1.FRONT_LEFT_WHEEL, LowPoly1.FRONT_LEFT_WHEEL_DATA],
		[LowPoly1.FRONT_RIGHT_WHEEL, LowPoly1.FRONT_RIGHT_WHEEL_DATA]
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
	#scale;
	#rotation;
	#quaternion;

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

	#loadedModel;
	#modelRoot;
	#modelDimensions;
	#collisionBox;

	#parent;

	constructor(args = {}) {
		const { scene, position, id, physicsGroup, scale, rotation } = args;
		this.#scene = scene;
		this.#scale = scale || LowPoly1.SCALE;
		this.#position = position;
		this.#id = id;
		this.#rotation = rotation;
		this.#physicsGroup = physicsGroup;
		this.#membershipMask = this.#physicsGroup;
		this.#collideMask = ~this.#membershipMask;
		if (rotation) {
			this.#quaternion = Quaternion.FromEulerAngles(
				this.#rotation.x,
				this.#rotation.y,
				this.#rotation.z
			);
		}
	}

	get scene() {
		return this.#scene;
	}

	get scale() {
		return this.#scale;
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

	get collisionBox() {
		return this.#collisionBox;
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

	get rotation() {
		return this.#rotation;
	}

	get parent() {
		return this.#parent;
	}

	#lowPoly1WheelOffsets = new Map([
		[LowPoly1.BACK_LEFT_WHEEL, { x: -.3, y: 0, z: -.6 }],
		[LowPoly1.BACK_RIGHT_WHEEL, { x: -.3, y: 0, z: .6 }],
		[LowPoly1.FRONT_LEFT_WHEEL, { x: .025, y: 0, z: -.5 }],
		[LowPoly1.FRONT_RIGHT_WHEEL, { x: .025, y: 0, z: .5 }]
	]);

	async build() {
		await this.#buildModel();
		this.#buildWheelMaterial();
		this.#buildChassis();
		this.#buildWheels();
		this.#buildCollisionBox();
		/*this.#applyChassisPhysics();
		this.#applyPhysicsToWheels();
		this.#applyCollisionBoxPhysics();
		this.#setAllWheelConstraints();
		this.#setCollisionBoxConstraint();*/
	}

	#applyCarRotation() {
		if (this.#rotation) {
			/*this.#chassis.rotation = this.#rotation;
			this.#collisionBox.rotation = this.#rotation;
			this.#wheels.forEach((wheel) => wheel.rotation = this.#rotation);*/
			// this.#parent.rotation = this.#rotation.clone();
			//this.#rotateCarWithPhysics(this.#rotation);
			const rotationQuaternion = Quaternion.FromEulerAngles(
				this.#rotation.x,
				this.#rotation.y,
				this.#rotation.z
			);

			this.#chassis.rotationQuaternion = rotationQuaternion.clone();
			this.#collisionBox.rotationQuaternion = rotationQuaternion.clone();
			this.#wheels.forEach((wheel) => {
				wheel.rotationQuaternion = rotationQuaternion.clone();
			});

		}
	}

	#buildWheelMaterial() {
		this.#wheelMaterial = new StandardMaterial(`${this.id}-wheel-material`, this.scene);
		const texture = new Texture('/images/checkerboard-7800519_1280.jpg', this.scene);
		// const texture = new Texture('/images/vectorstock_33744900.jpg', this.scene);
		texture.uScale = .25; // Scale texture in U direction
		const wheelRadius = (this.#modelDimensions?.wheelHeight || LowPoly1.WHEEL_RADIUS);
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
		wheelHeight = wheelHeight || LowPoly1.WHEEL_HEIGHT;

		const diameterX = wheelHeight;
		const diameterY = wheelHeight;
		const diameterZ = wheelHeight / 4;

		let { xMultiplier, zMultiplier, name, key } = wheelData;
		/*const multipliers = new Vector3(xMultiplier, 0, zMultiplier);
		const rotatedVector = multipliers.rotateByQuaternionAroundPointToRef(
			this.#quaternion.clone(),
			Vector3.Zero(), // rotation point
			new Vector3()   // result vector
		);
		console.log(multipliers, rotatedVector);*/
		const { width: chassisWidth, depth: chassisDepth } = this.#chassisDimensions;
		const wheel = MeshBuilder.CreateSphere(
			`${this.id}-wheel-${name}`, {
				diameterX,
				diameterY,
				diameterZ,
			},
			this.scene
		);
		wheel.name = `${this.id}-${name}`;

		const wheelOffset = this.#lowPoly1WheelOffsets.get(key);
		wheel.position = this.#chassis.position.clone();
		wheel.position.z += (chassisDepth / 2 * zMultiplier) + (wheelOffset.z * this.scale);
		wheel.position.x += (chassisWidth / 2 * xMultiplier) + (wheelOffset.x * this.scale);

		// const chassisPivotPoint = wheel.position.clone();
		const chassisPivotPoint = wheel.position.clone().subtract(this.#chassis.position);
		this.#chassisPivotPoints.set(key, chassisPivotPoint);

		const wheelPivotPoint = new Vector3(
			0,
			0,
			0
		);
		this.#wheelPivotPoints.set(key, wheelPivotPoint);

		wheel.material = this.wheelMaterial;
		return wheel;
	}

	#buildWheels() {
		this.#wheels = new Map();
		this.#wheels.set(LowPoly1.BACK_LEFT_WHEEL, this.#buildWheel(LowPoly1.BACK_LEFT_WHEEL_DATA));
		this.#wheels.set(LowPoly1.BACK_RIGHT_WHEEL, this.#buildWheel(LowPoly1.BACK_RIGHT_WHEEL_DATA));
		this.#wheels.set(LowPoly1.FRONT_LEFT_WHEEL, this.#buildWheel(LowPoly1.FRONT_LEFT_WHEEL_DATA));
		this.#wheels.set(LowPoly1.FRONT_RIGHT_WHEEL, this.#buildWheel(LowPoly1.FRONT_RIGHT_WHEEL_DATA));
	}

	#buildChassis() {
		const width = (this.#modelDimensions.width / 2);
		const height = (this.#modelDimensions.height / 4);
		const depth = (this.#modelDimensions.length / 4);
		this.#chassis = MeshBuilder.CreateBox(`${this.id}-chassis`, {
			width,
			height,
			depth
		}, this.scene);
		this.#chassisDimensions = { width, height, depth };
		this.#chassis.position = this.position.clone();
		this.#chassis.isVisible = !LowPoly1.HIDE_CHASSIS;
	}

	#applyChassisPhysics() {
		const chassisAggregate = new PhysicsAggregate(
			this.#chassis,
			PhysicsShapeType.BOX,
			{
				mass: LowPoly1.CHASSIS_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		chassisAggregate.shape.filterMembershipMask = this.#membershipMask;
		chassisAggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(LowPoly1.CHASSIS, chassisAggregate);
	}

	#applyWheelPhysics(wheel) {
		const aggregate = new PhysicsAggregate(
			wheel,
			PhysicsShapeType.CAPSULE,
			{
				mass: LowPoly1.WHEEL_MASS,
				restitution: LowPoly1.WHEEL_RESTITUTION,
				friction: LowPoly1.WHEEL_FRICTION
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
		const wheelData = LowPoly1.WHEEL_DATA.get(wheelPointer);
		const pivotA = this.#chassisPivotPoints.get(wheelPointer);
		const pivotB = this.#wheelPivotPoints.get(wheelPointer);
		if (LowPoly1.DEBUG) {
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
		this.#aggregates.get(LowPoly1.CHASSIS)
			.body
			.addConstraint(wheelAggregate.body, constraint);
		return constraint;
	}

	async #buildModel() {
		this.#loadedModel = await ImportMeshAsync("/databases/car/LowPoly1.glb", this.#scene, {});
		this.#loadedModel.meshes[0].scaling = new Vector3(
			this.scale,
			this.scale,
			this.scale);
		this.#modelRoot = this.#loadedModel.meshes[0];
		this.#scene.render();
		this.#loadedModel.meshes[4].showBoundingBox = true;
		/*for (let i = 1; i <= 8; i++) {
			this.#loadedModel.meshes[i].isVisible = false;
		}*/
		const low = { x: Infinity, y: Infinity, z: Infinity };
		const high = { x: -Infinity, y: -Infinity, z: -Infinity };
		this.#modelRoot.getChildMeshes().forEach((mesh, index) => {
				const { minimumWorld, maximumWorld } = mesh.getBoundingInfo().boundingBox;
				low.x = Math.min(low.x, minimumWorld.x);
				low.y = Math.min(low.y, minimumWorld.y);
				low.z = Math.min(low.z, minimumWorld.z);
				high.x = Math.max(high.x, maximumWorld.x);
				high.y = Math.max(high.y, maximumWorld.y);
				high.z = Math.max(high.z, maximumWorld.z);
		});
		const modelWheelData = this.#loadedModel.meshes[1].getBoundingInfo().boundingBox;
		const wheelHeight = (modelWheelData.maximum.y - modelWheelData.minimum.y) * this.scale;
		this.#modelDimensions = {
			length: high.x - low.x,
			width: high.z - low.z,
			height: high.y - low.y,
			wheelHeight
		};
		this.#modelRoot.position = new Vector3(0,0,0);
		this.#modelRoot.position.y -= this.#modelDimensions.height / 2;
		this.#modelRoot.getChildMeshes().forEach((mesh, index) => {
			if (mesh.isVisible) mesh.isVisible = !LowPoly1.HIDE_MODEL;
		});
		return Promise.resolve();
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
		this.#collisionBox.position = this.position.clone()
			.add(new Vector3(0, height / 2, 0))
			.subtract(new Vector3(0, this.#chassisDimensions.height / 2, 0));
		this.#modelRoot.parent = this.#collisionBox;
		this.#modelRoot.rotation = new Vector3(0, Math.PI / 2, 0);
		this.#modelRoot.position.y -= this.#chassisDimensions.height / 2;
		this.#collisionBox.material.alpha = .2;
		this.#collisionBox.isVisible = !LowPoly1.HIDE_COLLISION_BOX;
	}

	#applyCollisionBoxPhysics() {
		const aggregate = new PhysicsAggregate(
			this.#collisionBox,
			PhysicsShapeType.BOX,
			{
				mass: LowPoly1.MODEL_MASS,
				restitution: 0,
				friction: 0.5
			},
			this.scene
		);

		aggregate.shape.filterMembershipMask = this.#membershipMask;
		aggregate.shape.filterCollideMask = this.#collideMask;
		this.#aggregates.set(LowPoly1.MODEL, aggregate);
	}

	#setCollisionBoxConstraint() {
		const aggregate = this.#aggregates.get(LowPoly1.MODEL);
		const model = this.#collisionBox;
		const chassisBoundingBox = this.#chassis.getBoundingInfo().boundingBox;
		const collisionBoxBoundingBox = this.#collisionBox.getBoundingInfo().boundingBox;
		const pivotA = new Vector3(0, chassisBoundingBox.minimum.y, 0);
		const pivotB = new Vector3(0, collisionBoxBoundingBox.minimum.y, 0);

		if (LowPoly1.DEBUG) {
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
		this.#aggregates.get(LowPoly1.CHASSIS)
			.body
			.addConstraint(aggregate.body, constraint);
		return constraint;
	}

}
