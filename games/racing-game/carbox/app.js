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
// import Car from "./Car.js";
import Car from "./Car2.js";
import Controls from "./Controls.js";
import Physics from "../src/classes/Physics/Physics.js";

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

	#gravityVector = Physics.GRAVITY

	#renderLoopHandle;
	#sceneElement;

	#controls;

	#car;
	#ground;

	constructor() {
		this.#canvas = document.getElementById('world');
		this.#sceneElement = document.querySelector('section.scene');

		this.#engine = new Engine(this.#canvas, true);
		this.#scene = new Scene(this.#engine);

		this.#renderLoopHandle = this.renderLoop.bind(this);

		this.#addToScene()
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
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
		});
	}

	async #addToScene() {
		this.#camera = new UniversalCamera("UniversalCamera", new Vector3(App.SX + 35, App.SY + 5, App.SZ ), this.#scene);
		this.#camera.inputs.addMouseWheel();
		this.#camera.setTarget(new Vector3(App.SX, App.SY, App.SZ));
		this.#camera.attachControl(this.#canvas, true);

		this.#light1 = new HemisphericLight("light1", new Vector3(1, 1, 1), this.#scene);
		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		const groundPhysics = {
			friction: 1,
			restitution: 0,
			rotationAxis: 'x',
			rotationAmount: -.05
		};

		this.#ground = buildGround(this.#scene, groundPhysics);

		const chassisPhysics = {
			mass: 10,
			friction: 0,
			restitution: 0
		};

		const wheelPhysics = {
			mass: 1,
			friction: 0.25,
			restitution: 0
		};


		const position = new Vector3(0, -9, 0);

		const scale = .6;

		this.#car = new Car({ position: position.clone(), scene: this.#scene, physicsGroup: 2, scale, chassisPhysics, wheelPhysics });
		await this.#car.build();

		// this.#car.loadedModel.meshes[9].showBoundingBox = true;
		// console.log(this.#car.loadedModel.meshes[9]);

		/*const car = {
			mesh: this.#car.model,
			scale: 1,
			chassis: chassisPhysics,
			wheel: wheelPhysics
		};

		const ground = {
			mesh: this.#ground,
			friction: 0.5,
			restitution: 0.5,
			rotationAmount: 0,
			rotationAxis: 'x'
		};

		this.#controls = new Controls(car, ground, position);*/
	}

}
