import {
	ArcRotateCamera, Color3,
	Engine,
	HavokPlugin,
	HemisphericLight, Matrix, Mesh,
	MeshBuilder,
	PhysicsAggregate, PhysicsShapeType,
	Scene, StandardMaterial, Tools,
	Vector3
} from "@babylonjs/core";
import { Inspector } from '@babylonjs/inspector';
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

	bp1;
	bp2;

	constructor() {
		this.#canvas = document.getElementById('world');
		this.#engine = new Engine(this.#canvas, true);
		this.#scene = new Scene(this.#engine);

		this.#renderLoopHandle = this.renderLoop.bind(this);

		this.#addToScene()
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

	bezierCurve3d(args = {}) {
		const { startPoint, controlPoint1, controlPoint2, endPoint, segments = 10, zAdjust = 0 } = args;
		const points = [];
		for (let t = 0; t <= 1; t += 1 / segments) {
			const x = Math.pow(1 - t, 3) * startPoint.x +
				3 * Math.pow(1 - t, 2) * t * controlPoint1.x +
				3 * (1 - t) * Math.pow(t, 2) * controlPoint2.x +
				Math.pow(t, 3) * endPoint.x;

			const y = Math.pow(1 - t, 3) * startPoint.y +
				3 * Math.pow(1 - t, 2) * t * controlPoint1.y +
				3 * (1 - t) * Math.pow(t, 2) * controlPoint2.y +
				Math.pow(t, 3) * endPoint.y;

			const z = Math.pow(1 - t, 3) * startPoint.z +
				3 * Math.pow(1 - t, 2) * t * controlPoint1.z +
				3 * (1 - t) * Math.pow(t, 2) * controlPoint2.z +
				Math.pow(t, 3) * endPoint.z;

			points.push({ x, y, z });
		}
		points.push({ x: endPoint.x, y: endPoint.y, z: endPoint.z });
		return points;
	}

	async #addToScene() {
		this.#camera = new ArcRotateCamera("Camera", Math.PI, Math.PI / 2.5, 20, Vector3.Zero(), this.#scene);
		this.#camera.attachControl(this.#canvas, true);
		this.#light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), this.#scene);

		this.#sphere = MeshBuilder.CreateSphere("sphere", { diameter: .5 }, this.#scene);
		this.#sphere.position.y = 9.25;
		this.#sphere.position.z = -49.5;

		this.#ground = MeshBuilder.CreateBox("ground", { width: 60, height: .1, depth: 60}, this.#scene);
		const groundMaterial = new StandardMaterial("green", this.#scene);
		groundMaterial.diffuseColor = new Color3(0, .25, 0);
		this.#ground.material = groundMaterial;
		this.#ground.position.y = -0.06;
		this.#ground.position.x = -20;

		this.#physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		this.#scene.enablePhysics(this.#gravityVector, this.#physicsPlugin);

		// Create a sphere shape and the associated body. Size will be determined automatically.
		this.#sphereAggregate = new PhysicsAggregate(this.#sphere, PhysicsShapeType.SPHERE, { mass: 1, restitution: 0 }, this.#scene);
		// Create a static box shape.
		this.#groundAggregate = new PhysicsAggregate(this.#ground, PhysicsShapeType.BOX, { mass: 0 }, this.#scene);

		let straightRoad = this.generateAStraightRoad();
		straightRoad.position.y = 9;
		straightRoad.position.z = -50;
		const straightRoadAggregate = new PhysicsAggregate(
			straightRoad,
			PhysicsShapeType.MESH,
			{ mass: 0 }, this.#scene
		);
		let curveRoad = this.generateACurve();
		// curveRoad.position.z = -1;
		const curveRoadAggregate = new PhysicsAggregate(
			curveRoad,
			PhysicsShapeType.MESH,
			{ mass: 0 }, this.#scene
		);
	}

	generateAStraightRoad() {
		const startPoint = { x: 0, y: 0, z: 0 };
		const controlPoint1 = { x: 0, y: -.75, z: 5 };
		const controlPoint2 = { x: 0, y: -9, z: 15 };
		const endPoint = { x: 0, y: -9, z: 50};
		const segments = 100;

		const originalPoints = this.bezierCurve3d({ startPoint, controlPoint1, controlPoint2, endPoint, segments})

		const offsetDistance = 2;
		const { offsetPoints1, offsetPoints2 } = this.generateOffsetPoints(originalPoints, offsetDistance);
		console.log(offsetPoints1, offsetPoints2);

		return MeshBuilder.CreateRibbon("ribbon", {
			pathArray: [offsetPoints1, offsetPoints2],
			sideOrientation: Mesh.DOUBLESIDE,
			updatable: true
		}, this.#scene);

	}

	generateACurve() {

		/*
		Here's a more detailed explanation:
			Start and End Points: Let's say the start point is (0, 0) and the end point is (x, 0).
			Midpoint: The midpoint of the start and end points would be (x/2, 0).
			Control Points: To create a 180-degree curve, the control points need to be placed symmetrically around this midpoint.
				For a cubic Bezier curve, you'd need two control points, one for the start and one for the end of the curve.
					Control Point 1: This point would be a certain distance away from the start point (0, 0) and the midpoint. Let's say it's at (x1, y1).
					Control Point 2: This point would be the same distance away from the end point (x, 0) and the midpoint, but on the opposite side. Let's say it's at (x2, -y1).
			Symmetry: The x-coordinates of the control points should be such that (x1 + x2) / 2 = x/2 (the midpoint's x-coordinate).
				The y-coordinate of the second control point will be the negative of the y-coordinate of the first control point to
				ensure the curve bends upwards and then downwards.

		 */
		const startPoint = { x: 0, y: 0, z: 0 };
		/*const controlPoint1 = { x: .7, y: 0, z: 25 };
		const controlPoint2 = { x: -30.7, y: 0, z: 25 };*/
		const controlPoint1 = { x: .7, y: 0, z: 25 };
		const controlPoint2 = { x: -30.7, y: 0, z: 25 };
		const endPoint = { x: -30, y: 0, z: 0 };
		const segments = 100;

		const originalPoints = this.bezierCurve3d({ startPoint, controlPoint1, controlPoint2, endPoint, segments });
		const offsetDistance = 2;
		const maxBankAngle = 75; // Maximum bank angle in degrees

		const { offsetPoints1, offsetPoints2 } = this.generateOffsetPointsWithBanking(originalPoints, offsetDistance, maxBankAngle);
		console.log(originalPoints);
		console.log(offsetPoints1, offsetPoints2);
		return MeshBuilder.CreateRibbon("ribbon", {
			pathArray: [offsetPoints1, offsetPoints2],
			sideOrientation: Mesh.DOUBLESIDE,
			updatable: true
		}, this.#scene);
	}


	generateOffsetPoints(points, offsetDistance) {
		const offsetPoints1 = [];
		const offsetPoints2 = [];

		for (let i = 0; i < points.length - 1; i++) {
			const current = points[i];
			const next = points[i + 1];

			// Calculate the direction vector between the current and next points
			const direction = new Vector3(next.x - current.x, next.y - current.y, next.z - current.z).normalize();

			// Calculate a perpendicular vector (cross product with an arbitrary vector)
			const perpendicular = Vector3.Cross(direction, Vector3.Up()).normalize();

			// Offset the current point in both directions
			const offset1 = new Vector3(
				current.x + perpendicular.x * offsetDistance,
				current.y + perpendicular.y * offsetDistance,
				current.z + perpendicular.z * offsetDistance
			);

			const offset2 = new Vector3(
				current.x - perpendicular.x * offsetDistance,
				current.y - perpendicular.y * offsetDistance,
				current.z - perpendicular.z * offsetDistance
			);

			offsetPoints1.push(offset1);
			offsetPoints2.push(offset2);
		}

		// Add the last point offsets
		const last = points[points.length - 1];
		const secondLast = points[points.length - 2];
		const lastDirection = new Vector3(last.x - secondLast.x, last.y - secondLast.y, last.z - secondLast.z).normalize();
		const lastPerpendicular = Vector3.Cross(lastDirection, Vector3.Up()).normalize();

		offsetPoints1.push(new Vector3(
			last.x + lastPerpendicular.x * offsetDistance,
			last.y + lastPerpendicular.y * offsetDistance,
			last.z + lastPerpendicular.z * offsetDistance
		));

		offsetPoints2.push(new Vector3(
			last.x - lastPerpendicular.x * offsetDistance,
			last.y - lastPerpendicular.y * offsetDistance,
			last.z - lastPerpendicular.z * offsetDistance
		));

		return { offsetPoints1, offsetPoints2 };
	}

	generateOffsetPointsWithBanking(points, offsetDistance, maxBankAngle) {
		const offsetPoints1 = [];
		const offsetPoints2 = [];
		const totalPoints = points.length;

		for (let i = 0; i < totalPoints - 1; i++) {
			const current = points[i];
			const next = points[i + 1];

			// Calculate the direction vector between the current and next points
			const direction = new Vector3(next.x - current.x, next.y - current.y, next.z - current.z).normalize();

			// Calculate a perpendicular vector (cross product with an arbitrary vector)
			let perpendicular = Vector3.Cross(direction, Vector3.Up()).normalize();

			// Apply banking: Rotate the perpendicular vector based on the current point's position
			const bankAngle = maxBankAngle * Math.sin((Math.PI * i) / (totalPoints - 1)); // Smooth banking curve
			const rotationMatrix = Matrix.RotationAxis(direction, Tools.ToRadians(bankAngle));
			perpendicular = Vector3.TransformCoordinates(perpendicular, rotationMatrix);

			// Offset the current point in both directions
			const offset1 = new Vector3(
				current.x + perpendicular.x * offsetDistance,
				// current.y + perpendicular.y * offsetDistance,
				current.y,
				current.z + perpendicular.z * offsetDistance
			);

			const offset2 = new Vector3(
				current.x - perpendicular.x * offsetDistance,
				// current.y - perpendicular.y * offsetDistance,
				current.y - perpendicular.y * offsetDistance * 2,
				current.z - perpendicular.z * offsetDistance
			);

			offsetPoints1.push(offset1);
			offsetPoints2.push(offset2);
		}

		// Add the last point offsets
		const last = points[totalPoints - 1];
		const secondLast = points[totalPoints - 2];
		const lastDirection = new Vector3(last.x - secondLast.x, last.y - secondLast.y, last.z - secondLast.z).normalize();
		let lastPerpendicular = Vector3.Cross(lastDirection, Vector3.Up()).normalize();

		const lastRotationMatrix = Matrix.RotationAxis(lastDirection, Tools.ToRadians(0)); // No bank at the end
		lastPerpendicular = Vector3.TransformCoordinates(lastPerpendicular, lastRotationMatrix);

		offsetPoints1.push(new Vector3(
			last.x + lastPerpendicular.x * offsetDistance,
			// last.y + lastPerpendicular.y * offsetDistance,
			last.y,
			last.z + lastPerpendicular.z * offsetDistance
		));

		offsetPoints2.push(new Vector3(
			last.x - lastPerpendicular.x * offsetDistance,
			// last.y - lastPerpendicular.y * offsetDistance,
			last.y - lastPerpendicular.y * offsetDistance * 2,
			last.z - lastPerpendicular.z * offsetDistance
		));

		return { offsetPoints1, offsetPoints2 };
	}
}
