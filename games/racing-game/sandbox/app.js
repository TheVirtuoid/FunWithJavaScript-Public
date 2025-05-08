import {
	ArcRotateCamera, Color3,
	Engine,
	HavokPlugin,
	HemisphericLight,
	MeshBuilder, RenderTargetTexture,
	PhysicsAggregate, PhysicsShapeType,
	Scene, StandardMaterial, UniversalCamera,
	Vector3, ImportMeshAsync
} from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
import HavokPhysics from "@babylonjs/havok";
import {renderCurve, renderStraight} from "./utilities.js";
import Marble from "./Marble.js";

export default class App {

	static GRAVITY = 1;
	static CAMERA_VIEW = true;
	static SX = 0;
	static SY = 39;
	static SZ = -55;
	static TRACKWIDTH = 4;

	#emptyCanvas;
	#engine;
	#scene;
	#canvas;
	#canvas2;

	#camera;
	#camera2;
	#light1;
	#sphere;
	#ground;

	#sphere1;
	#sphere2;

	#physicsPlugin;

	#gravityVector = new Vector3(0, -9.81, 0);

	#sx;
	#sy;
	#sz;

	#renderLoopHandle;
	#loadBuildingHandle;
	#sceneElement;

	#layout = [];

	#marbles = [];

	constructor(layout) {
		this.#emptyCanvas = document.createElement("canvas");
		this.#canvas = document.getElementById('world');
		this.#canvas2 = document.getElementById('world2');
		this.#sceneElement = document.querySelector('section.scene');

		if (App.CAMERA_VIEW) {
			this.#sceneElement.classList.add('camera-view');
		}

		this.#engine = new Engine(App.CAMERA_VIEW ? this.#emptyCanvas : this.#canvas, true);
		this.#scene = new Scene(this.#engine);

		this.#renderLoopHandle = this.renderLoop.bind(this);
		this.#loadBuildingHandle = this.loadBuilding.bind(this);

		const colors = [
			new Color3(0, 0, 0),
			new Color3(0, 0, 1),
			new Color3(0, 1, 0),
			new Color3(0, 1, 1),
			new Color3(1, 0, 0),
			new Color3(1, 0, 1),
			new Color3(1, 1, .0),
			new Color3(1, 1, 1),
			new Color3(0, 0, .75),
			new Color3(0, .75, 0),
			new Color3(0, .75, .75),
			new Color3(.75, 0, 0),
			new Color3(.75, 0, .75),
			new Color3(.75, .75, .0),
			new Color3(.75, .75, .75),
			new Color3(0, 0, .5),
			new Color3(0, .5, 0),
			new Color3(0, .5, .5),
			new Color3(.5, 0, 0),
			new Color3(.5, 0, .5),
			new Color3(.5, .5, .0),
			new Color3(.5, .5, .5),
			new Color3(0, 0, .25),
			new Color3(0, .25, 0),
			new Color3(0, .25, .25),
			new Color3(.25, 0, 0),
			new Color3(.25, 0, .25),
			new Color3(.25, .25, .0),
			new Color3(.25, .25, .25),
			new Color3(.1, .1, .1),
			new Color3(.1, .1, 0),
			new Color3(.1, 0, .1)
		]

		colors.forEach((color, index) => {
			let position;
			if (index < 8) {
				position = { x: App.SX - 1.75 + (index * .5), y: App.SY + .25, z: App.SZ + .25 }
			} else if (index < 16) {
				position = { x: App.SX - 1.75 + ((index - 8) * .5), y: App.SY - .35, z: App.SZ + 1.25 }
			} else if (index < 24) {
				position = { x: App.SX - 1.75 + ((index - 16) * .5), y: App.SY - 1.05, z: App.SZ + 2.25 }
			} else {
				position = { x: App.SX - 1.75 + ((index - 24) * .5), y: App.SY - 1.75, z: App.SZ + 3.25 }
			}
			const marble = new Marble({
				name: `marble-${index}`,
				color: color,
				scene: this.#scene,
				position:  position
			});
			this.#marbles.push(marble.getMarble());
		});

		this.#addToScene(layout)
			.then(this.#loadBuildingHandle)
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
		})
	}

	loadBuilding() {
		/*ImportMeshAsync("https://assets.babylonjs.com/meshes/both_houses_scene.babylon", this.#scene, {
			meshNames: "semi_house"
		});*/
		/*ImportMeshAsync("/sandbox/building.obj", this.#scene, {
			meshNames: "semi_house"
		});*/
		ImportMeshAsync("/sandbox/test.glb", this.#scene, {
			meshNames: ["building_3_Cube.016", "Cube.010_Cube.014", "Cube.011_Cube.015", "pegangan.003_Plane.008"]
		}).then((result) => {
			result.meshes[0].position = new Vector3(-25,0,35);
			result.meshes[0].scaling = new Vector3(4,4,4);
			// result.meshes[0].rotation = new Vector3(0,0,0);
			console.log(result);
		});
	}

	async #addToScene(layout) {
		this.#sx = App.SX;
		this.#sy = App.SY;
		this.#sz = App.SZ;

		this.#camera = new UniversalCamera("UniversalCamera", new Vector3(App.SX, App.SY + 10, App.SZ + -10), this.#scene);
		this.#camera.inputs.addMouseWheel();
		this.#camera.setTarget(Vector3.Zero());

		if (App.CAMERA_VIEW) {
			this.#camera2 = new UniversalCamera("UniversalCamera2", new Vector3(App.SX - 30, App.SY -40, App.SZ + 10), this.#scene);
			this.#engine.registerView(this.#canvas, this.#camera);
			this.#engine.registerView(this.#canvas2, this.#camera2);
			this.#scene.activeCameras = [this.#camera2, this.#camera];
		}

		this.#camera.attachControl(this.#canvas, true);

		this.#light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), this.#scene);

		this.#ground = MeshBuilder.CreateBox("ground", { width: 60, height: .1, depth: 60}, this.#scene);
		const groundMaterial = new StandardMaterial("grass", this.#scene);
		groundMaterial.diffuseColor = new Color3(0, .25, 0);
		this.#ground.material = groundMaterial;
		this.#ground.position.y = this.#sy - 39.06;
		this.#ground.position.x = this.#sx - 20;
		this.#ground.position.z = this.#sz + 85;

		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		this.#marbles.forEach((marble) => {
			new PhysicsAggregate(marble, PhysicsShapeType.SPHERE, { mass: App.GRAVITY, restitution: 0, friction: Math.random() }, this.#scene);
		});

		// Create a static box shape.
		new PhysicsAggregate(this.#ground, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, this.#scene);

		layout.forEach((track) => {
			if (track.type === 'straight') {
				this.#layout.push(this.generateAStraightRoad(track));
			} else if (track.type === 'curve') {
				this.#layout.push(this.generateACurve(track));
			}
		});

		this.#layout.forEach((track) => {
			new PhysicsAggregate(
				track,
				PhysicsShapeType.MESH,
				{ mass: 0, friction: 0 }, this.#scene
			);

		});
	}

	generateAStraightRoad(args) {
		const { startPoint, controlPoint1, controlPoint2, endPoint } = args;
		const segments = 100;
		const trackWidth = 4;
		return renderStraight({ startPoint, controlPoint1, controlPoint2, endPoint, segments, trackWidth, scene: this.#scene });
	}

	generateACurve(args) {
		/*
		 180 degrees
		*/
		const { startPoint, controlPoint1, controlPoint2, endPoint } = args;
		const angle = 45;
		const firstGuardRailScale = { startScale: .6, endScale: .6 };
		const secondGuardRailScale = { startScale: .6, endScale: 3 };
		const segments = 100;
		const trackWidth = 4;

		/*
		90 degrees

		const startPoint = { x: 0, y: 0, z: 0 };
		const controlPoint1 = { x: 0, y: 0, z: 10};
		const controlPoint2 = { x: -10, y: 0, z: 15 };
		const endPoint = { x: -15, y: 0, z: 15 };
		const angle = 45;
		const segments = 100;
		const trackWidth = 4;
		const firstGuardRailScale = { startScale: .6, endScale: .6 };
		const secondGuardRailScale = { startScale: .6, endScale: 2 };

		*/
		return renderCurve({
			startPoint,
			controlPoint1,
			controlPoint2,
			endPoint,
			segments,
			trackWidth,
			angle,
			firstGuardRailScale,
			secondGuardRailScale,
			scene: this.#scene
		});
	}

}
