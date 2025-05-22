import {
	ArcRotateCamera, Color3,
	Engine,
	HavokPlugin,
	HemisphericLight,
	MeshBuilder, RenderTargetTexture,
	PhysicsAggregate, PhysicsShapeType,
	Scene, StandardMaterial, UniversalCamera,
	Vector3, ImportMeshAsync, Texture, InitializeCSG2Async, MorphTarget as CSG3, CSG2, CubeTexture
} from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
import HavokPhysics from "@babylonjs/havok";
import {renderCurve, renderStraight} from "./utilities.js";
import Marble from "./Marble.js";
import Track from "../src/classes/Track/Track.js";
import V3 from "../src/classes/V3/V3.js";
import buildGround from "./ground.js";

export default class App {

	static GRAVITY = 0;
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
	#ground;

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

		if (App.MODELS) {
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
		}

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
				console.log(result);
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
		this.#camera.setTarget(new Vector3(App.SX, App.SY, App.SZ));

		if (App.CAMERA_VIEW) {
			this.#camera2 = new UniversalCamera("UniversalCamera2", new Vector3(App.SX - 30, App.SY -40, App.SZ + 10), this.#scene);
			this.#engine.registerView(this.#canvas, this.#camera);
			this.#engine.registerView(this.#canvas2, this.#camera2);
			this.#scene.activeCameras = [this.#camera2, this.#camera];
		}

		this.#camera.attachControl(this.#canvas, true);

		this.#light1 = new HemisphericLight("light1", new Vector3(-1, 1, 0), this.#scene);
		// this.#light1.diffuse = new Color3(1, 1, 1);

		buildGround(this.#scene);


		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		if (App.MODELS) {
			this.#marbles.forEach((marble) => {
				new PhysicsAggregate(marble, PhysicsShapeType.SPHERE, { mass: App.GRAVITY, restitution: 0, friction: Math.random() }, this.#scene);
			});
		}

		// Create a static box shape.
		new PhysicsAggregate(this.#ground, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, this.#scene);

		const blackMaterial = new StandardMaterial("black", this.#scene);
		blackMaterial.diffuseColor = new Color3(0, 0, 0);

		const startLineMaterial = new StandardMaterial("startline", this.#scene);
		startLineMaterial.diffuseColor = new Color3(1, 1, .6);

		layout.tracks.forEach((track) => {
			if (track.type === Track.STARTING_ANCHOR) {
				this.#layout.push(this.generateAStraightRoad(track));
				const mesh = this.#layout.at(-1);
				mesh.material = blackMaterial;
			} else if (track.type === Track.STRAIGHT) {
				this.#layout.push(this.generateAStraightRoad(track));
			} else if (track.type === Track.ENDING_ANCHOR) {
				this.#layout.push(this.generateAStraightRoad(track));
				const mesh = this.#layout.at(-1);
				mesh.material = blackMaterial;
			} else if (track.type === Track.CURVE) {
				this.#layout.push(this.generateACurve(track));
			} else if (track.type === Track.STARTLINE) {
				this.#layout.push(this.generateAStraightRoad(track));
				const mesh = this.#layout.at(-1);
				mesh.material = startLineMaterial;
			} else if (track.type === Track.FINISHLINE) {
				this.#layout.push(this.generateAStraightRoad(track));
				const mesh = this.#layout.at(-1);
				const material = new StandardMaterial("finishLineMaterial", this.#scene);
				const texture = new Texture('/checkerboard-7800519_1280.jpg', this.#scene);
				material.diffuseTexture = texture;
				material.diffuseColor = new Color3(1, 1, 1);
				// Optional: Configure texture settings if needed
				// texture.uScale = 2.0; // Scale texture in U direction
				// texture.vScale = 2.0; // Scale texture in V direction
				// texture.hasAlpha = true; // If your texture has transparency
				mesh.material = material;
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
		/!*skyboxMaterial.diffuseColor = new Color3(.75, .75, 1);
		skyboxMaterial.specularColor = new Color3(.75, .75, 1);*!/
		skybox.material = skyboxMaterial;*/

	}

	generateAStraightRoad(track) {
		const startPoint = track.startingPosition;
		const endPoint = track.endingPosition
			? track.endingPosition
			: track.startingDirectionVector.setDirectedPosition(track.startingPosition, track.length);
		const { controlPoint1: cp1, controlPoint2: cp2} = track.contour ? track.contour : this.#getStraightBezierCurve(startPoint, endPoint);
		// control points are adjusted in the renderStraight function.
		const controlPoint1 = new V3(cp1.x, cp1.y, cp1.z);
		const controlPoint2 = new V3(cp2.x, cp2.y, cp2.z);
		const segments = 100;
		const trackWidth = App.TRACKWIDTH;
		return renderStraight({ startPoint, controlPoint1, controlPoint2, endPoint, segments, trackWidth, scene: this.#scene });
	}

	#getStraightBezierCurve(startPoint, endPoint) {
		const controlPoint1 = {
			x: (endPoint.x - startPoint.x) / 3,
			y: (endPoint.y - startPoint.y) / 3,
			z: (endPoint.z - startPoint.z) / 3
		};

		const controlPoint2 = {
			x: 2 * (endPoint.x - startPoint.x) / 3,
			y: 2 * (endPoint.y - startPoint.y) / 3,
			z: 2 * (endPoint.z - startPoint.z) / 3
		};

		return { controlPoint1, controlPoint2 };
	}


	generateACurve(track) {
		const startPoint = track.startingPosition;
		const endPoint = track.endingPosition;
		const controlPoint1 = track.contour.controlPoint1;
		const controlPoint2 = track.contour.controlPoint2;
		const curveDirection = track.curveDirection;
		const angle = 45;
		const firstGuardRailScale = { startScale: .6, endScale: .6 };
		const secondGuardRailScale = { startScale: .6, endScale: 3 };
		const segments = 100;
		const trackWidth = App.TRACKWIDTH;

		return renderCurve({
			startPoint,
			controlPoint1,
			controlPoint2,
			endPoint,
			segments,
			trackWidth,
			angle,
			curveDirection,
			firstGuardRailScale,
			secondGuardRailScale,
			scene: this.#scene
		});
	}

}
