import {
	ArcRotateCamera, Color3,
	Engine,
	HavokPlugin,
	HemisphericLight,
	PhysicsAggregate, PhysicsShapeType,
	Scene, UniversalCamera,
	Vector3, ImportMeshAsync, MeshBuilder
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
import Car from "../carbox/Car.js";

export default class App2 {

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
	#sceneElement;

	#layout = [];

	#controls;

	#car;

	#orderOfFinish = [];

	#finishLineTextTop = 10;
	#finishTextTexture = null;
	#topOfTheFinishListList;

	constructor(layout) {
		this.#emptyCanvas = document.createElement("canvas");
		this.#canvas = document.getElementById('world');
		this.#canvas2 = document.getElementById('world2');
		this.#sceneElement = document.querySelector('section.scene');
		this.#controls = document.querySelector('#controls');

		this.#engine = new Engine(this.#canvas, true);
		this.#scene = new Scene(this.#engine);

		this.#renderLoopHandle = this.renderLoop.bind(this);


		this.#addToScene(layout)
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
		// this.#initializeUI();
		/*this.#createTextOverlay('Race Results', this.#scene);
		this.#finishLineTextTop += 8;
		this.#topOfTheFinishListList = this.#finishLineTextTop;*/
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
			/*const meshHit = this.#finishLine.finishLineRay.intersectsMeshes(this.#marbles);
			for (const mesh of meshHit) {
				const { pickedMesh } = mesh;
				const marble = this.#marbleDb.get(pickedMesh);
				if (marble && !this.#orderOfFinish.includes(marble)) {
					this.#orderOfFinish.push(marble);
					this.#createTextOverlay(marble, this.#scene);
				}
			}*/
		})
	}

	/*#initializeUI() {
		if (!this.#finishTextTexture) {
			this.#finishTextTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, this.#scene);
		}
	}*/

	/*#createTextOverlay(textOrMarble, scene) {
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
	}*/


	async #addToScene(layout) {
		this.#sx = App2.SX;
		this.#sy = App2.SY;
		this.#sz = App2.SZ;

		this.#camera = new UniversalCamera("UniversalCamera", new Vector3(App2.SX + 20, App2.SY-5, App2.SZ + 10), this.#scene);
		this.#camera.inputs.addMouseWheel();
		this.#camera.setTarget(new Vector3(App2.SX, App2.SY, App2.SZ+15));

		this.#camera.attachControl(this.#canvas, true);

		this.#light1 = new HemisphericLight("light1", new Vector3(-1, 1, 0), this.#scene);

		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		buildGround(this.#scene, this.#controls);

		layout.tracks.forEach((track) => {
			if (track.type === Track.STARTING_ANCHOR) {
				this.#startingAnchor = new StartingAnchor(track, App2.TRACKWIDTH, this.#scene);
				this.#layout.push(this.#startingAnchor.render());
			} else if (track.type === Track.STRAIGHT) {
				const straight = new Straight(track, App2.TRACKWIDTH, this.#scene);
				this.#layout.push(straight.render());
			} else if (track.type === Track.ENDING_ANCHOR) {
				this.#endingAnchor = new EndingAnchor(track, App2.TRACKWIDTH, this.#scene);
				this.#layout.push(this.#endingAnchor.render());
			} else if (track.type === Track.CURVE) {
				const curve = new Curve(track, App2.TRACKWIDTH, this.#scene);
				this.#layout.push(curve.render());
			} else if (track.type === Track.STARTLINE) {
				this.#startingLine = new StartingLine(track, App2.TRACKWIDTH, this.#scene);
				this.#layout.push(this.#startingLine.render());
			} else if (track.type === Track.FINISHLINE) {
				this.#finishLine = new FinishLine(track, App2.TRACKWIDTH, this.#scene);
				this.#layout.push(this.#finishLine.render());
			}
		});

		this.#layout.forEach((track) => {
			new PhysicsAggregate(
				track,
				PhysicsShapeType.MESH,
				{ mass: 0, friction: .5, restitution: 1}, this.#scene
			);
		});

		this.#car = new Car({
			position: new Vector3(App2.SX - 1, App2.SY +.5, App2.SZ + 1),
			scene: this.#scene,
			scale: 0.25,
			physicsGroup: 1
		});
		this.#car.build();

		const startLine = this.#layout[1];

	}
}
