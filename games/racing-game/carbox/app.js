import {
	ArcRotateCamera,
	Color3,
	Engine,
	HavokPlugin,
	HemisphericLight,
	PhysicsAggregate,
	PhysicsShapeType,
	Scene,
	UniversalCamera,
	Vector3,
	ImportMeshAsync,
	MeshBuilder,
	PhysicsConstraintAxis,
	PhysicsShapeConvexHull,
	PhysicsBody,
	PhysicsMotionType,
	Physics6DoFConstraint, StandardMaterial
} from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
import HavokPhysics from "@babylonjs/havok";
import { buildGround } from "./ground.js";
import SelectMesh from "./SelectMesh.js";
import Car from "./Car.js";

export default class App {

	static GRAVITY = 1;
	static SX = 0;
	static SY = 0;
	static SZ = 0;

	#engine;
	#scene;
	#canvas;

	#camera;
	#light1;

	#physicsPlugin;

	#gravityVector = new Vector3(0, -9.81, 0);

	#renderLoopHandle;
	#loadBuildingHandle;
	#sceneElement;

	#controls;
	#selectMesh;

	constructor() {
		this.#canvas = document.getElementById('world');
		this.#sceneElement = document.querySelector('section.scene');
		this.#controls = document.querySelector('#controls');

		this.#engine = new Engine(this.#canvas, true);
		this.#scene = new Scene(this.#engine);

		this.#renderLoopHandle = this.renderLoop.bind(this);
		this.#loadBuildingHandle = this.loadBuilding.bind(this);

		this.#selectMesh = new SelectMesh(this.#controls);

		this.#addToScene()
			// .then(this.#loadBuildingHandle)
			.then(this.#renderLoopHandle)
			.catch((event) => {
				console.log('CAUGHT ERROR', event);
			});

		// hide/show the Inspector
		window.addEventListener("keydown", this.#inspector.bind(this));

	}

	#inspector(event) {
		if (event.shiftKey && event.ctrlKey && event.altKey && (event.key === "I" || event.key === "i")) {
			if (this.#scene.debugLayer.isVisible()) {
				this.#scene.debugLayer.hide();
			} else {
				this.#scene.debugLayer.show();
			}
		}

	}

	renderLoop() {
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
		});
	}

	loadBuilding() {
		/*ImportMeshAsync("https://assets.babylonjs.com/meshes/both_houses_scene.babylon", this.#scene, {
			meshNames: "semi_house"
		});*/
		/*ImportMeshAsync("/sandbox/building.obj", this.#scene, {
			meshNames: "semi_house"
		});*/
		if (App.MODELS) {
/*
			ImportMeshAsync("/sandbox/test.glb", this.#scene, {
				meshNames: ["building_3_Cube.016", "Cube.010_Cube.014", "Cube.011_Cube.015", "pegangan.003_Plane.008"]
*/
			ImportMeshAsync("/sandbox/bleachers.glb", this.#scene, {
				meshNames: ["bleachers"]
			}).then((result) => {
				result.meshes[0].position = new Vector3(0, 1, 10);
				result.meshes[0].scaling = new Vector3(.005, .005, .005);
				result.meshes[0].rotation = new Vector3(0,1.55,0);
			});
		}
	}

	async #addToScene() {
		this.#camera = new UniversalCamera("UniversalCamera", new Vector3(App.SX + 35, App.SY + 15, App.SZ), this.#scene);
		this.#camera.inputs.addMouseWheel();
		this.#camera.setTarget(new Vector3(App.SX, App.SY, App.SZ));
		this.#camera.attachControl(this.#canvas, true);

		this.#light1 = new HemisphericLight("light1", new Vector3(1, 1, 1), this.#scene);
		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		buildGround(this.#scene, this.#controls);
		// this.#createJoint('front-left', new Vector3(0, -4, 0));
		// this.#createCar(new Vector3(0, 0, 0));
		this.#testCreate();
	}

	#addStaticPhysics(mesh) {
		const shape = new PhysicsShapeConvexHull(mesh, this.#scene);
		const body = new PhysicsBody(mesh, PhysicsMotionType.STATIC, false, this.#scene);
		body.shape = shape;
	}

	#addDynamicPhysics(mesh) {
		const shape = new PhysicsShapeConvexHull(mesh, this.#scene);
		const body = new PhysicsBody(mesh, PhysicsMotionType.DYNAMIC, false, this.#scene);
		body.setMassProperties({ mass: 1 });
		body.shape = shape;
	}



	#testCreate() {
		const car = new Car({ position: new Vector3(0, -7, 0), scene: this.#scene });
		car.build();
		const chassisLength = 5;
		const wheelRestitution = .25;

		/*
		const carParent = new MeshBuilder.CreateBox("carParent", {size: 0.1}, this.#scene);
		carParent.visibility = 0; // Make it invisible

		// Our built-in 'sphere' shape.
		const chassis = MeshBuilder.CreateBox("chassis", {width: chassisLength, height: 1, depth: 1}, this.#scene);
		chassis.parent = carParent;

		const backLeftWheel = MeshBuilder.CreateCylinder("backLeftWheel", {height: .25, diameter: 2, tessellation: 256}, this.#scene);
		backLeftWheel.rotation.x = Math.PI / 2;
		backLeftWheel.bakeCurrentTransformIntoVertices();
		backLeftWheel.convertToFlatShadedMesh();

		backLeftWheel.position.z = -2;
		backLeftWheel.position.x = chassisLength / 2;
		backLeftWheel.parent = carParent;

		const backRightWheel = backLeftWheel.clone();
		backRightWheel.position.z = 2;
		backRightWheel.position.x = chassisLength / 2;
		backRightWheel.parent = carParent;

		const frontLeftWheel = backLeftWheel.clone();
		frontLeftWheel.position.z = -2;
		frontLeftWheel.position.x = -chassisLength / 2;
		frontLeftWheel.parent = carParent;

		const frontRightWheel = backLeftWheel.clone();
		frontRightWheel.position.z = 2;
		frontRightWheel.position.x = -chassisLength / 2;
		frontRightWheel.parent = carParent;

		carParent.position = new Vector3(0, -7, 0);
		carParent.rotate(new Vector3(0, 1, 0), Math.PI / 2);
		*/

		/*const { chassis, wheels } = car;
		const backLeftWheel = wheels.get(Car.BACK_LEFT_WHEEL);
		const backRightWheel = wheels.get(Car.BACK_RIGHT_WHEEL);
		const frontLeftWheel = wheels.get(Car.FRONT_LEFT_WHEEL);
		const frontRightWheel = wheels.get(Car.FRONT_RIGHT_WHEEL);*/

		/*const chassisAggregate = new PhysicsAggregate(chassis, PhysicsShapeType.BOX, { mass: 1, restitution: 0, friction: 0}, this.#scene);
		const backLeftWheelAggregate = new PhysicsAggregate(backLeftWheel, PhysicsShapeType.MESH, { mass: 1, restitution: wheelRestitution, friction: 0}, this.#scene);
		const backRightWheelAggregate = new PhysicsAggregate(backRightWheel, PhysicsShapeType.MESH, { mass: 1, restitution: wheelRestitution, friction: 0}, this.#scene);
		const frontLeftWheelAggregate = new PhysicsAggregate(frontLeftWheel, PhysicsShapeType.MESH, { mass: 1, restitution: wheelRestitution, friction: 0}, this.#scene);
		const frontRightWheelAggregate = new PhysicsAggregate(frontRightWheel, PhysicsShapeType.MESH, { mass: 1, restitution: wheelRestitution, friction: 0}, this.#scene);
		const scene = this.#scene;*/
		/*function addMotorizedWheelToChassis(wheelAggregate) {
			const wheelPosition = wheelAggregate.transformNode.position;
			const motor = new Physics6DoFConstraint(
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
				scene
			);

			chassisAggregate.body.addConstraint(wheelAggregate.body, motor);

			// motor.setAxisMotorType(BABYLON.PhysicsConstraintAxis.ANGULAR_Z, BABYLON.PhysicsConstraintMotorType.VELOCITY);
			// motor.setAxisMotorMaxForce(BABYLON.PhysicsConstraintAxis.ANGULAR_Z, 1000);

			return motor;
		}*/

		/*const backLeftMotor = addMotorizedWheelToChassis(backLeftWheelAggregate);
		const backRightMotor = addMotorizedWheelToChassis(backRightWheelAggregate);
		const frontLeftMotor = addMotorizedWheelToChassis(frontLeftWheelAggregate);
		const frontRightMotor = addMotorizedWheelToChassis(frontRightWheelAggregate);*/

	}

	#insertMarble() {
		const marble = MeshBuilder.CreateSphere("marble", { diameter: 1 }, this.#scene);
		marble.position = new Vector3(0, 0, 0);
		marble.material = new StandardMaterial("marbleMat", this.#scene);
		marble.material.diffuseColor = new Color3(1, 0, 0);
		marble.material.specularColor = new Color3(1, 1, 1);
		marble.material.emissiveColor = new Color3(0, 0, 0);
		marble.material.ambientColor = new Color3(0, 0, 0);
		marble.material.ambientTexture = null;
		this.#addDynamicPhysics(marble);
	}
}
