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

	#car;

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

	get car() {
		return this.#car;
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
		let count = 0;
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
			count++;
			if (count % 60 === 0) {
				// console.log(this.#car.chassis.position);
			}
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
		this.#car = new Car({ position: new Vector3(0, -7, 0), scene: this.#scene, physicsGroup: 1 });
		this.#car.build();
		// this.#insertMarble();
	}

	/*#addStaticPhysics(mesh) {
		const shape = new PhysicsShapeConvexHull(mesh, this.#scene);
		const body = new PhysicsBody(mesh, PhysicsMotionType.STATIC, false, this.#scene);
		body.shape = shape;
	}*/

	/*#addDynamicPhysics(mesh) {
		const shape = new PhysicsShapeConvexHull(mesh, this.#scene);
		const body = new PhysicsBody(mesh, PhysicsMotionType.DYNAMIC, false, this.#scene);
		body.setMassProperties({ mass: 1 });
		body.shape = shape;
	}*/

	/*#insertMarble() {
		const marble = MeshBuilder.CreateSphere("marble", { diameter: 2 }, this.#scene);
		marble.position = new Vector3(7, -4, 0);
		marble.material = new StandardMaterial("marbleMat", this.#scene);
		marble.material.diffuseColor = new Color3(1, 0, 0);
		marble.material.specularColor = new Color3(1, 1, 1);
		marble.material.emissiveColor = new Color3(0, 0, 0);
		marble.material.ambientColor = new Color3(0, 0, 0);
		marble.material.ambientTexture = null;
		this.#addDynamicPhysics(marble);
	}*/
}
