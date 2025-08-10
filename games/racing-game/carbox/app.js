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
// import Car from "./Car2.js";
import Car from "./OldCarDesigns/Ferrari.js";
// import Car from "./Car5.js";
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

	#car1;
	#car2;
	#car3;
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

	get car1() {
		return this.#car1;
	}

	get car2() {
		return this.#car1;
	}

	get car3() {
		return this.#car1;
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
		this.#camera = new UniversalCamera("UniversalCamera", new Vector3(App.SX, App.SY + 3, App.SZ - 15 ), this.#scene);
		this.#camera.inputs.addMouseWheel();
		this.#camera.setTarget(new Vector3(App.SX, App.SY, App.SZ));
		this.#camera.attachControl(this.#canvas, true);

		this.#light1 = new HemisphericLight("light1", new Vector3(1, 1, 1), this.#scene);
		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		const groundPhysics = {
			friction: 1,
			restitution: 0,
			rotationAxis: 'z',
			rotationAmount: -.05,
			yAdjust: -2
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


		const position1 = new Vector3(0, 0, 5);
		const position2 = new Vector3(0, 0, 0);
		const position3 = new Vector3(0, 0, -5);

		const scale = 2;

		const id = 'test';

		const rotation = new Vector3(0, Math.PI / 2, 0);

		/*this.#car1 = new Car({ position: position1.clone(), scene: this.#scene, physicsGroup: 2, scale: .5, chassisPhysics, wheelPhysics, id: 'HALF' });
		await this.#car1.build();*/

		this.#car2 = new Car({ position: position2.clone(), scene: this.#scene, physicsGroup: 4, scale: 1, chassisPhysics, wheelPhysics, id: 'ONE', rotation });
		await this.#car2.build();

		/*this.#car3 = new Car({ position: position3.clone(), scene: this.#scene, physicsGroup: 8, scale: 2, chassisPhysics, wheelPhysics, id: 'DOUBLE' });
		await this.#car3.build();*/
	}

}
