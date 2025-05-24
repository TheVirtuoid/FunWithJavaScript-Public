import {
	ArcRotateCamera, Color3,
	Engine,
	HavokPlugin,
	HemisphericLight,
	PhysicsAggregate, PhysicsShapeType,
	Scene, UniversalCamera,
	Vector3, ImportMeshAsync
} from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
import HavokPhysics from "@babylonjs/havok";
import {renderCurve, renderStraight} from "./utilities.js";
import Marble from "./Marble.js";
import Track from "../src/classes/Track/Track.js";
import V3 from "../src/classes/V3/V3.js";
import { buildGround } from "./ground.js";
import * as GUI from "@babylonjs/gui";
import FinishLine from "../src/classes/Ui/FinishLine.js";
import EndingAnchor from "../src/classes/Ui/EndingAnchor.js";
import StartingAnchor from "../src/classes/Ui/StartingAnchor.js";
import StartingLine from "../src/classes/Ui/StartingLine.js";
import Straight from "../src/classes/Ui/Straight.js";
import Curve from "../src/classes/Ui/Curve.js";

const marbleNames = [
	"Sir Rolls-a-Lot",
	"Marble Madness",
	"Speedy Spheroid",
	"Captain Clackity",
	"Roundabout Ruby",
	"Momentum Mike",
	"Rollin' Thunder",
	"Marble McMarbleface",
	"Professor Pebble",
	"Spherical Sam",
	"Glassy McGee",
	"The Orbinator",
	"Whoosh Wilson",
	"Marble Stewart",
	"Gravitron",
	"Ziggy Zaggles",
	"Skippy Stone",
	"Rolling Stone",
	"Zoom Zoom",
	"Doctor Dizzle",
	"Rocky Rollers",
	"Slick Willy",
	"Bouncy Bobby",
	"Pebble Pete",
	"Marble Wander",
	"Whirlwind Wally",
	"Purl the Swirl",
	"Slippy Sphere",
	"Glaston Berry",
	"Smoothie McLap",
	"Orb-ituary",
	"Zoom Bloom",
	"Marble Cinderella",
	"Globey McTrotter",
	"Spheroid Supreme",
	"Polly Polish",
	"Loopy Lou",
	"Roller Coaster",
	"Marble Madoff",
	"Glide N' Slide",
	"Dizzy Wizzy",
	"Baller Shot-Caller",
	"Rounder Pounder",
	"Marbelous Marv",
	"Sir Spinny",
	"The Inertia Kid",
	"Glass Dasher",
	"Round Robin",
	"Marble-ous Wonder",
	"Spherical Phil"
];

export default class App {

	static GRAVITY = 1;
	static CAMERA_VIEW = false;
	static MODELS = true;
	static SX = 5;
	static SY = 0;
	static SZ = 5;
	static TRACKWIDTH = 4;

	#emptyCanvas;
	#engine;
	#scene;
	#canvas;
	#canvas2;

	#camera;
	#camera2;
	#light1;

	#finishLine;
	#endingAnchor;
	#startingAnchor;
	#startingLine;

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

	#controls;

	#orderOfFinish = [];

	#marbleDb = new Map();
	#finishLineTextTop = 10;
	#finishTextTexture = null;
	#topOfTheFinishListList;

	constructor(layout) {
		this.#emptyCanvas = document.createElement("canvas");
		this.#canvas = document.getElementById('world');
		this.#canvas2 = document.getElementById('world2');
		this.#sceneElement = document.querySelector('section.scene');
		this.#controls = document.querySelector('#controls');

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

		if (App.MODELS) {
			colors.forEach((color, index) => {
				let position;
				if (index < 8) {
					position = { x: App.SX - 1.75 + (index * .5), y: App.SY - .25, z: App.SZ + 1.25 }
				} else if (index < 16) {
					position = { x: App.SX - 1.75 + ((index - 8) * .5), y: App.SY - 1.1, z: App.SZ + 2.25 }
				} else if (index < 24) {
					position = { x: App.SX - 1.75 + ((index - 16) * .5), y: App.SY - 1.95, z: App.SZ + 3.25 }
				} else {
					position = { x: App.SX - 1.75 + ((index - 24) * .5), y: App.SY - 2.8, z: App.SZ + 4.25 }
				}
				const marble = new Marble({
					name: marbleNames[index],
					color: color,
					scene: this.#scene,
					position:  position
				});
				this.#marbleDb.set(marble.getMarble(), marble)
				this.#marbles.push(marble.getMarble());
			});
		}

		this.#addToScene(layout)
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
		this.#initializeUI();
		this.#createTextOverlay('Race Results', this.#scene);
		this.#finishLineTextTop += 8;
		this.#topOfTheFinishListList = this.#finishLineTextTop;
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
			const meshHit = this.#finishLine.finishLineRay.intersectsMeshes(this.#marbles);
			for (const mesh of meshHit) {
				const { pickedMesh } = mesh;
				const marble = this.#marbleDb.get(pickedMesh);
				if (marble && !this.#orderOfFinish.includes(marble)) {
					this.#orderOfFinish.push(marble);
					this.#createTextOverlay(marble, this.#scene);
				}
			}
		})
	}

	#initializeUI() {
		if (!this.#finishTextTexture) {
			this.#finishTextTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.#scene);
		}
	}

	#createTextOverlay(textOrMarble, scene) {
		// Create text block
		const textBlock = new GUI.TextBlock(`text-${crypto.randomUUID()}`);
		if (textOrMarble instanceof Marble) {
			textBlock.text = `${this.#orderOfFinish.length} - ${textOrMarble.name}`;
			textBlock.color = textOrMarble.color.toHexString();
			textBlock.fontSize = 16;
		} else {
			textBlock.text = textOrMarble;
			textBlock.color = "white";
			textBlock.fontSize = 24;
		}
		textBlock.fontFamily = "Arial";
		textBlock.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
		textBlock.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
		if (this.#orderOfFinish.length > 16) {
			textBlock.left = '300px';
		} else {
			textBlock.left = '50px';
		}
		textBlock.left = this.#orderOfFinish.length > 16 ? '300px' : '50px';
		textBlock.top = `${this.#finishLineTextTop}px`;
		// Add to texture
		this.#finishTextTexture.addControl(textBlock);
		this.#finishLineTextTop += textOrMarble instanceof Marble ? 20 : 26;
		if (this.#orderOfFinish.length === 16) {
			this.#finishLineTextTop = this.#topOfTheFinishListList;
		}
		return textBlock;
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

	async #addToScene(layout) {
		this.#sx = App.SX;
		this.#sy = App.SY;
		this.#sz = App.SZ;

		this.#camera = new UniversalCamera("UniversalCamera", new Vector3(App.SX + 35, App.SY + 15, App.SZ), this.#scene);
		this.#camera.inputs.addMouseWheel();
		// this.#camera.setTarget(Vector3.Zero());
		// this.#camera.setTarget(new Vector3(App.SX, App.SY -10, App.SZ + 40));
		this.#camera.setTarget(new Vector3(App.SX + 20, App.SY, App.SZ + 20));

		if (App.CAMERA_VIEW) {
			this.#camera2 = new UniversalCamera("UniversalCamera2", new Vector3(App.SX - 30, App.SY -40, App.SZ + 10), this.#scene);
			this.#engine.registerView(this.#canvas, this.#camera);
			this.#engine.registerView(this.#canvas2, this.#camera2);
			this.#scene.activeCameras = [this.#camera2, this.#camera];
		}

		this.#camera.attachControl(this.#canvas, true);

		this.#light1 = new HemisphericLight("light1", new Vector3(-1, 1, 0), this.#scene);

		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		if (App.MODELS) {
			this.#marbles.forEach((marble) => {
				new PhysicsAggregate(marble, PhysicsShapeType.SPHERE, { mass: App.GRAVITY, restitution: 0, friction: Math.random() }, this.#scene);
			});
		}

		buildGround(this.#scene, this.#controls);

		layout.tracks.forEach((track) => {
			if (track.type === Track.STARTING_ANCHOR) {
				this.#startingAnchor = new StartingAnchor(track, App.TRACKWIDTH, this.#scene);
				this.#layout.push(this.#startingAnchor.render());
			} else if (track.type === Track.STRAIGHT) {
				const straight = new Straight(track, App.TRACKWIDTH, this.#scene);
				this.#layout.push(straight.render());
			} else if (track.type === Track.ENDING_ANCHOR) {
				this.#endingAnchor = new EndingAnchor(track, App.TRACKWIDTH, this.#scene);
				this.#layout.push(this.#endingAnchor.render());
			} else if (track.type === Track.CURVE) {
				const curve = new Curve(track, App.TRACKWIDTH, this.#scene);
				this.#layout.push(curve.render());
			} else if (track.type === Track.STARTLINE) {
				this.#startingLine = new StartingLine(track, App.TRACKWIDTH, this.#scene);
				this.#layout.push(this.#startingLine.render());
			} else if (track.type === Track.FINISHLINE) {
				this.#finishLine = new FinishLine(track, App.TRACKWIDTH, this.#scene);
				this.#layout.push(this.#finishLine.render());
			}
		});

		this.#layout.forEach((track) => {
			new PhysicsAggregate(
				track,
				PhysicsShapeType.MESH,
				{ mass: 0, friction: 0 }, this.#scene
			);
		});

		/*const box = MeshBuilder.CreateBox('box', { width: 20, height: 20, depth: 20}, this.#scene);
		box.material = groundMaterial;
		// box.setEnabled(false);
		box.position.x += 7;*/

		const startLine = this.#layout[1];
		// startLine.setEnabled(false);

		/*await InitializeCSG2Async();

		const boxCsg = CSG2.FromMesh(box);
		const ribbonCsg = CSG2.FromMesh(this.#layout[1]);

		const mesh = boxCsg.subtract(ribbonCsg).toMesh('test');*/

		// skybox
		/*const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, this.#scene);
		const skyboxMaterial = new StandardMaterial("skyBox", this.#scene);
		skyboxMaterial.backFaceCulling = false;
		skyboxMaterial.reflectionTexture = new CubeTexture("textures/skybox", this.#scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
		skyboxMaterial.diffuseColor = new Color3(.75, .75, 1);
		skyboxMaterial.specularColor = new Color3(.75, .75, 1);
		skybox.material = skyboxMaterial;*/

	}
}
