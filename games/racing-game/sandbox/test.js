import {
	ArcRotateCamera, Engine,
	HemisphericLight,
	MeshBuilder,
	PBRMetallicRoughnessMaterial,
	Scene,
	Vector3
} from "@babylonjs/core";

var createScene = function () {

	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new Scene(engine);

	// This creates and positions a free camera (non-mesh)
	var camera1 = new ArcRotateCamera("Camera1", 0, 0.8, 5, Vector3.Zero(), scene);
	camera1.setTarget(Vector3.Zero());

	camera1.lowerRadiusLimit = 4;
	camera1.upperRadiusLimit = 20;

	var camera2 = new ArcRotateCamera("Camera2", 0, 0.8, 10, Vector3.Zero(), scene);

	var camera3 = new ArcRotateCamera("Camera3", 0, 0.8, 10, Vector3.Zero(), scene);

	var camera4 = new ArcRotateCamera("Camera4", 0, 0.8, 10, Vector3.Zero(), scene);

	// This attaches the camera to the canvas
	camera1.attachControl(document.getElementById("world1"), true);

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

	// Default intensity is 1. Let's dim the light a small amount
	light.intensity = 0.7;

	// Our built-in 'sphere' shape.
	var box = MeshBuilder.CreateBox("Box", {size: 2}, scene);

	box.position.y = 0.5;

	var mat = new PBRMetallicRoughnessMaterial("mat", scene);

	mat.metallic = 1;
	mat.roughness = 0.5;

	box.material = mat;

	scene.createDefaultEnvironment();

	engine.registerView(document.getElementById("world1"));
	engine.registerView(document.getElementById("world2"), camera2);
	engine.registerView(document.getElementById("world3"), camera3);
	engine.registerView(document.getElementById("world4"), camera4);

	// Some animations
	var alpha = 0;
	scene.registerBeforeRender(() => {
		camera2.radius = 10 + Math.cos(alpha) * 5;
		camera3.alpha += 0.01;
		camera4.beta = Math.cos(alpha);

		alpha += 0.01;
	})

	return scene;

};

var canvas = document.createElement("canvas");

var engine = new Engine(canvas, true);

// Set the default canvas to use for events
engine.inputElement = document.getElementById("world1");

var scene = createScene();

engine.runRenderLoop(function() {
	if (scene.activeCamera) {
		scene.render();
	}
});

