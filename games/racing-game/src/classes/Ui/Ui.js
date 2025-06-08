import {
	Color3,
	Engine,
	HavokPlugin,
	HemisphericLight,
	MeshBuilder, PhysicsAggregate, PhysicsShapeType,
	Scene,
	StandardMaterial,
	UniversalCamera,
	Vector3
} from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";

let instance;
let currentName;

export default class Ui {
	library;
	canvas;
	scene;
	engine;
	name;
	camera;
	physicsPlugin;
	light;
	meshes;
	materials;

	constructor(args = {}) {
		if (!instance) {
			const { library, canvas, name } = args;
			this.library = library;
			this.canvas = canvas;
			this.name = name;
			this.meshes = new Map();
			this.materials = new Map();
			instance = this;
		}
		return instance;
	}

	static CreateEngine(args = {}) {
		const { canvas = instance.canvas } = args;
		instance.engine = new Engine(canvas, true);
		return instance.engine;
	}

	static CreateScene(args = {}) {
		const { engine = instance.engine } = args;
		instance.scene = new Scene(engine);
		return instance.scene;
	}

	static CreateCamera(args = {}) {
		const { canvas = instance.canvas, scene = instance.scene, position, target, name = instance.name } = args;
		const camera= new UniversalCamera(`${name}-UniversalCamera`, Ui.toVector3(position), scene);
		camera.inputs.addMouseWheel();
		camera.setTarget(Ui.toVector3(target));
		camera.attachControl(canvas, true);
		instance.camera = camera;
		return camera;
	}

	static CreateLight(args = {}) {
		const { name = instance.name, position, scene = instance.scene } = args;
		instance.light = new HemisphericLight(`${name}-light`, Ui.toVector3(position), scene);
		return instance.light;
	}

	static async LoadPhysics(args = {}) {
		const { scene = instance.scene, gravityVector = { x: 0, y: -9.81, z: 0 } } = args;
		instance.physicsPlugin = new HavokPlugin(true, await HavokPhysics());
		scene.enablePhysics(gravityVector, instance.physicsPlugin);
		return instance.physicsPlugin;
	}

	static CreateGround(args = {}) {
		const {
			name = 'ground',
			scene = instance.scene,
			width,
			height,
			subdivisions = 4,
			position,
			material
		} = args;
		const meshName = `${instance.name}-${name}`;
		const mesh = MeshBuilder.CreateGround(
			meshName, { width, height, subdivisions },
			scene);
		if (material) {
			mesh.material = material;
		}
		if (position) {
			mesh.position = Ui.toVector3(position);
		}
		instance.meshes.set(meshName, mesh);
		new PhysicsAggregate(mesh, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
		return mesh;
	}

	static CreateBox(args = {}) {
		const { name = 'box', scene = instance.scene, position, depth, width, height, material, physicsOptions } = args;
		const meshName = `${instance.name}-${name}`;
		const mesh = MeshBuilder.CreateBox(
			meshName, {
				depth,
				width,
				height
			}, scene);
		if (material) {
			mesh.material = material;
		}
		if (position) {
			mesh.position = Ui.toVector3(position);
		}
		if (physicsOptions) {
			new PhysicsAggregate(mesh, PhysicsShapeType.BOX, physicsOptions, scene);
		}
		instance.meshes.set(meshName, mesh);
		return mesh;
	}

	static CreateMaterial(args = {}) {
		const { diffuseColor, name = 'material', scene = instance.scene } = args;
		const materialName = `${instance.name}-${name}`;
		const material = new StandardMaterial(materialName, scene);
		if (diffuseColor) {
			material.diffuseColor = Ui.toColor3(diffuseColor);
		}
		instance.materials.set(materialName, material);
		return material;
	}

	static getMesh(name) {
		return instance.meshes.get(name);
	}

	static getMaterial(name) {
		return instance.materials.get(name);
	}

	static toVector3(coordinates) {
		return new Vector3(coordinates.x, coordinates.y, coordinates.z);
	}

	static toColor3(color) {
		return new Color3(color.r, color.g, color.b);
	}
}