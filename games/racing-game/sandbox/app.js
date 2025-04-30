import {
	ArcRotateCamera,
	Engine,
	HavokPlugin,
	HemisphericLight, Mesh,
	MeshBuilder,
	PhysicsAggregate, PhysicsShapeType,
	Scene, Tools,
	Vector3
} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";

export default class App {
	#engine;
	#scene;
	#canvas;

	#camera;
	#light1;
	#sphere;
	#ground;

	#sphereAggregate;
	#groundAggregate;

	#physicsPlugin;

	#gravityVector = new Vector3(0, -9.81, 0);

	#renderLoopHandle;

	constructor() {
		this.#canvas = document.getElementById('world');
		this.#engine = new Engine(this.#canvas, true);
		this.#scene = new Scene(this.#engine);

		this.#renderLoopHandle = this.renderLoop.bind(this);

		this.#addToScene()
			.then(this.#renderLoopHandle);

		// hide/show the Inspector
		/*window.addEventListener("keydown", (ev) => {
			if (ev.shiftKey && ev.ctrlKey && ev.altKey && (ev.key === "I" || ev.key === "i")) {
				if (scene.debugLayer.isVisible()) {
					scene.debugLayer.hide();
				} else {
					scene.debugLayer.show();
				}
			}
		});*/
	}

	renderLoop() {
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
		})
	}

	async #addToScene() {
		this.#camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.#scene);
		this.#camera.attachControl(this.#canvas, true);
		this.#light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), this.#scene);

		this.#sphere = MeshBuilder.CreateSphere("sphere", { diameter: .25 }, this.#scene);
		this.#sphere.position.y = .25;

		this.#ground = MeshBuilder.CreateBox("ground", { width: 2, height: .1, depth: 1 }, this.#scene);
		this.#ground.rotation.z = Tools.ToRadians(-2);

		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		// Create a sphere shape and the associated body. Size will be determined automatically.
		this.#sphereAggregate = new PhysicsAggregate(this.#sphere, PhysicsShapeType.SPHERE, { mass: 1, restitution:0.75 }, this.#scene);
		// Create a static box shape.
		this.#groundAggregate = new PhysicsAggregate(this.#ground, PhysicsShapeType.BOX, { mass: 0 }, this.#scene);

		const myPaths = [
			[ 	new Vector3(5.0, 0, 0),
				new Vector3(4.5, 1, 0),
				new Vector3(4.0, 2, 0),
				new Vector3(3.5, 3, 0),
				new Vector3(3.0, 4, 0)
			],
			[	new Vector3(0, 0.0, -5),
				new Vector3(0, 0.5, -7),
				new Vector3(0, 1.0, -9),
				new Vector3(0, 1.5, -11),
				new Vector3(0, 2.0, -13)
			],
			[	new Vector3(-5.0, 0, 0),
				new Vector3(-4.5, 1, 0),
				new Vector3(-4.0, 2, 0),
				new Vector3(-3.5, 3, 0),
				new Vector3(-3.0, 4, 0)
			]

		];
		let ribbon = MeshBuilder.CreateRibbon("ribbon", {
			pathArray: myPaths, sideOrientation: Mesh.DOUBLESIDE, updatable: true
		}, this.#scene);

		const path0 = [];
		for (let a = 0; a <= Math.PI; a += Math.PI / 4) {
			path0.push(new Vector3(4, 4 * Math.cos(a), 4 * Math.sin(a)));
		}

		const path1 = [];
		for (let a = 0; a <= Math.PI; a += Math.PI / 4) {
			path1.push(new Vector3(0, 4 * Math.cos(a), 2 + 4 * Math.sin(a)));
		}

		const path2 = [];
		for (let a = 0; a <= Math.PI; a += Math.PI / 4) {
			path2.push(new Vector3(-4, 4 * Math.cos(a), 4 * Math.sin(a)));
		}

		const myPaths2 = [path0, path1, path2];

		ribbon = MeshBuilder.CreateRibbon('ribbon', {
			pathArray: myPaths2,
			instance: ribbon,
			sideOrientation: Mesh.DOUBLESIDE
		});

		ribbon.position.z = -3;

		const ribbonAggregate = new PhysicsAggregate(ribbon, PhysicsShapeType.MESH, { mass: 0 }, this.#scene);


	}

}