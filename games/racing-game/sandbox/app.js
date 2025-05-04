import {
	ArcRotateCamera, Color3,
	Engine,
	HavokPlugin,
	HemisphericLight,
	MeshBuilder,
	PhysicsAggregate, PhysicsShapeType,
	Scene, StandardMaterial, UniversalCamera,
	Vector3
} from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
import HavokPhysics from "@babylonjs/havok";
import {renderCurve, renderStraight} from "./utilities.js";

export default class App {

	static GRAVITY = 1;
	static SX = 0;
	static SY = 39;
	static SZ = -55;
	static TRACKWIDTH = 4;
	#engine;
	#scene;
	#canvas;

	#camera;
	#light1;
	#sphere;
	#ground;

	#sphereAggregate;
	#groundAggregate;

	#sphere1;
	#sphere2;

	#physicsPlugin;

	#gravityVector = new Vector3(0, -9.81, 0);

	#sx;
	#sy;
	#sz;

	#renderLoopHandle;

	#layout = [];

	constructor(layout) {
		this.#canvas = document.getElementById('world');
		this.#engine = new Engine(this.#canvas, true);
		this.#scene = new Scene(this.#engine);

		this.#renderLoopHandle = this.renderLoop.bind(this);

		this.#addToScene(layout)
			.then(this.#renderLoopHandle);

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

	async #addToScene(layout) {
		this.#sx = App.SX;
		this.#sy = App.SY;
		this.#sz = App.SZ;

		this.#camera = new UniversalCamera("UniversalCamera", new Vector3(App.SX, App.SY + 10, App.SZ + -10), this.#scene);
		this.#camera.inputs.addMouseWheel();
		this.#camera.setTarget(Vector3.Zero());
		this.#camera.attachControl(this.#canvas, true);

		this.#light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), this.#scene);

		this.#sphere = MeshBuilder.CreateSphere("sphere", { diameter: .5 }, this.#scene);
		const sphereMaterial = new StandardMaterial("red", this.#scene);
		sphereMaterial.diffuseColor = new Color3(1, 0, 0);
		this.#sphere.material = sphereMaterial;
		this.#sphere.position.y = this.#sy + .3;
		this.#sphere.position.z = this.#sz + .5;
		this.#sphere.position.x = this.#sx;

		this.#sphere1 = MeshBuilder.CreateSphere("sphere1", { diameter: .5 }, this.#scene);
		const sphere1Material = new StandardMaterial("blue", this.#scene);
		sphere1Material.diffuseColor = new Color3(0, 0, 1);
		this.#sphere1.material = sphere1Material;
		this.#sphere1.position.y = this.#sy + .3;
		this.#sphere1.position.z = this.#sz + .5;
		this.#sphere1.position.x = this.#sx - 1;

		this.#sphere2 = MeshBuilder.CreateSphere("sphere2", { diameter: .5 }, this.#scene);
		const sphere2Material = new StandardMaterial("green", this.#scene);
		sphere2Material.diffuseColor = new Color3(0, 1, 0);
		this.#sphere2.material = sphere2Material;
		this.#sphere2.position.y = this.#sy + .3;
		this.#sphere2.position.z = this.#sz + .5;
		this.#sphere2.position.x = this.#sx + 1;

		this.#ground = MeshBuilder.CreateBox("ground", { width: 60, height: .1, depth: 60}, this.#scene);
		const groundMaterial = new StandardMaterial("grass", this.#scene);
		groundMaterial.diffuseColor = new Color3(0, .25, 0);
		this.#ground.material = groundMaterial;
		this.#ground.position.y = this.#sy - 39.06;
		this.#ground.position.x = this.#sx - 20;
		this.#ground.position.z = this.#sz + 85;

		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		// Create a sphere shape and the associated body. Size will be determined automatically.
		new PhysicsAggregate(this.#sphere, PhysicsShapeType.SPHERE, { mass: App.GRAVITY, restitution: 0, friction: .05 }, this.#scene);
		new PhysicsAggregate(this.#sphere1, PhysicsShapeType.SPHERE, { mass: App.GRAVITY, restitution: 0, friction: .05 }, this.#scene);
		new PhysicsAggregate(this.#sphere2, PhysicsShapeType.SPHERE, { mass: App.GRAVITY, restitution: 0, friction: .05 }, this.#scene);
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
		/*const sy = this.#sy - 39;
		const sz = this.#sz + 55;
		const startPoint = { x: this.#sx, y: sy, z: sz };
		const controlPoint1 = { x: this.#sx + .7, y: sy, z: sz + 25 };
		const controlPoint2 = { x: this.#sx - 30.7, y: sy, z: sz + 25 };
		const endPoint = { x: this.#sx - 30, y: sy, z: sz };*/
		const { startPoint, controlPoint1, controlPoint2, endPoint } = args;
		const angle = 75;
		const firstGuardRailScale = { startScale: .6, endScale: .6 };
		const secondGuardRailScale = { startScale: .6, endScale: 2 };
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
