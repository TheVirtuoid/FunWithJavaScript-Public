import {
	Color3,
	MeshBuilder,
	PhysicsAggregate,
	PhysicsShapeType,
	StandardMaterial,
	Vector3
} from "@babylonjs/core";

const meshes = new Map();
let currentMesh = null;
let currentStep = 1;

const addMesh = (name, mesh) => {
	if (meshes.has(name)) {
		meshes.get(name).dispose();
	}
	meshes.set(name, mesh);
}

const buildSelect = (selectBox) => {
	selectBox.replaceChildren();
	selectBox.insertAdjacentHTML('afterbegin', `<option value="">Select Mesh</option>`);
	meshes.forEach((mesh, meshName) => {
		const option = document.createElement('option');
		option.value = meshName;
		option.textContent = meshName;
		selectBox.appendChild(option);
	});
}

const getMesh = (name) => {
	if (meshes.has(name)) {
		return meshes.get(name);
	}
	return null;
}

const getMeshDimensions = (mesh) => {
	const boundingInfo = mesh.getBoundingInfo();
	const boundingBox = boundingInfo.boundingBox;

	const width = boundingBox.maximum.x - boundingBox.minimum.x;
	const height = boundingBox.maximum.y - boundingBox.minimum.y;
	const depth = boundingBox.maximum.z - boundingBox.minimum.z;

	return { width, height, depth };
}

const setCurrentStep = (selectedButton, inputs) => {
	selectedButton.closest('.buttons').querySelectorAll('button').forEach(button => {
		button.classList.remove('selected');
		if (button === selectedButton) {
			button.classList.add('selected');
		}
	});
	inputs.forEach((input) => {
		input.step = selectedButton.value;
	});
}

const colorRandom = () => {
	return new Vector3(Math.random(), Math.random(), Math.random());
}

const buildGround = (scene, controls) => {
	const groundMaterial = new StandardMaterial("grass", scene);
	groundMaterial.diffuseColor = new Color3(0, .25, 0);

	const groundMaterial2 = new StandardMaterial('grass-2', scene);
	groundMaterial2.diffuseColor = new Color3(0, .15, 0);

	const groundMaterial3 = new StandardMaterial('grass-3', scene);
	groundMaterial3.diffuseColor = new Color3(0, .35, 0);

	const groundMaterial4 = new StandardMaterial('grass-4', scene);
	groundMaterial4.diffuseColor = new Color3(0, .10, 0);

	const groundMaterial5 = new StandardMaterial('grass-5', scene);
	groundMaterial5.diffuseColor = new Color3(.1, .6, .1);

	const dirtMaterial1 = new StandardMaterial('dirt-1', scene);
	dirtMaterial1.diffuseColor = new Color3(0.6, 0.3, 0.1);

	const dirtMaterial2 = new StandardMaterial('dirt-2', scene);
	dirtMaterial2.diffuseColor = new Color3(0.4, 0.2, 0.1);

	const groundWallMaterial = new StandardMaterial('ground-wall', scene);
	groundWallMaterial.diffuseColor = new Color3(0, 0, 0);

	const groundRandomMaterial = new StandardMaterial('ground-random', scene);
	groundRandomMaterial.diffuseColor = colorRandom();

	const depth = -85;

	const groundBase = MeshBuilder.CreateGround('ground-base', {
		width: 200,
		height: 200,
		subdivisions: 256,
	}, scene);
	groundBase.material = groundMaterial;
	groundBase.position = new Vector3(0, depth, 100);
	// groundBase.rotate(new Vector3(1, 0, 0), -Math.PI / 45);
	new PhysicsAggregate(groundBase, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBase', groundBase);

	const groundBaseWallNorth = MeshBuilder.CreateBox('ground-base-north', { depth: 200, width: 1, height: 1 }, scene);
	groundBaseWallNorth.material = groundWallMaterial;
	groundBaseWallNorth.position = new Vector3(-100, depth, 100);
	new PhysicsAggregate(groundBaseWallNorth, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallNorth', groundBaseWallNorth);

	const groundBaseWallSouth = MeshBuilder.CreateBox('ground-base-south', { depth: 200, width: 1, height: 1 }, scene);
	groundBaseWallSouth.material = groundWallMaterial;
	groundBaseWallSouth.position = new Vector3(100, depth, 100);
	new PhysicsAggregate(groundBaseWallSouth, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallSouth', groundBaseWallSouth);

	const groundBaseWallEast = MeshBuilder.CreateBox('ground-base-east', { depth: 1, width: 200, height: 10 }, scene);
	groundBaseWallEast.material = groundWallMaterial;
	groundBaseWallEast.position = new Vector3(0, depth, 0);
	new PhysicsAggregate(groundBaseWallEast, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallEast', groundBaseWallEast);

	const groundBaseWallWest = MeshBuilder.CreateBox('ground-base-west', { depth: 1, width: 200, height: 1 }, scene);
	groundBaseWallWest.material = groundWallMaterial;
	groundBaseWallWest.position = new Vector3(0, depth, 200);
	new PhysicsAggregate(groundBaseWallWest, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallWest', groundBaseWallWest);

	/*const ground180 = MeshBuilder.CreateBox('ground-180', { depth: 200, width: 50, height: 5 }, scene);
	ground180.material = groundMaterial2;
	ground180.position = new Vector3(75, -33, 100);
	new PhysicsAggregate(ground180, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('ground180', ground180);

	const ground90 = MeshBuilder.CreateBox('ground-base-east', { depth: 50, width: 132, height: 7 }, scene);
	ground90.material = groundMaterial2;
	ground90.position = new Vector3(-34, -31, 50);
	new PhysicsAggregate(ground90, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('ground90', ground90);

	const groundStraight3 = MeshBuilder.CreateBox('ground-straight3', { depth: 78, width: 32, height: 10 }, scene);
	groundStraight3.material = groundMaterial3;
	groundStraight3.position = new Vector3(39, -33.1, 39);
	groundStraight3.rotate(new Vector3(0, 0, 1), Math.PI / 1.065);
	new PhysicsAggregate(groundStraight3, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('groundStraight3', groundStraight3);

	const groundStraight1 = MeshBuilder.CreateBox('ground-straight1', { depth: 14, width: 125, height: 34 }, scene);
	groundStraight1.material = groundMaterial4;
	groundStraight1.position = new Vector3(-38, -23.8, 6);
	new PhysicsAggregate(groundStraight1, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('groundStraight1', groundStraight1);

	const dirtStraight1 = MeshBuilder.CreateBox('dirt-straight1', { depth: 37, width: 125, height: 10 }, scene);
	dirtStraight1.material = dirtMaterial1;
	dirtStraight1.position = new Vector3(-38, -24.6, 24);
	dirtStraight1.rotate(new Vector3(1, 0, 0), -Math.PI / 1.3);
	new PhysicsAggregate(dirtStraight1, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('dirtStraight1', dirtStraight1);

	const dirtStraight2 = MeshBuilder.CreateBox('dirt-straight2', { depth: 39, width: 125, height: 10 }, scene);
	dirtStraight2.material = dirtMaterial2;
	dirtStraight2.position = new Vector3(-38, -28.9, 44);
	dirtStraight2.rotate(new Vector3(1, 0, 0), -Math.PI / 1.07);
	new PhysicsAggregate(dirtStraight2, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('dirtStraight2', dirtStraight2);

	const groundStraight5 = MeshBuilder.CreateBox('ground-straight5', { depth: 109, width: 35, height: 10 }, scene);
	groundStraight5.material = groundMaterial5;
	groundStraight5.position = new Vector3(33.7, -39.4, 128);
	groundStraight5.rotate(new Vector3(0, 0, 1), -Math.PI / 1.07);
	new PhysicsAggregate(groundStraight5, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('groundStraight5', groundStraight5);

	const groundStartline = MeshBuilder.CreateBox('ground-startline', { depth: 14, width: 125, height: 9 }, scene);
	groundStartline.material = groundMaterial;
	groundStartline.position = new Vector3(-38, -8.1, 8);
	groundStartline.rotate(new Vector3(1, 0, 0), -Math.PI / 1.27);
	new PhysicsAggregate(groundStartline, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('groundStartline', groundStartline);

	const groundStartAnchor = MeshBuilder.CreateBox('ground-start-anchor', { depth: 5, width: 125, height: 9 }, scene);
	groundStartAnchor.material = groundMaterial;
	groundStartAnchor.position = new Vector3(-38, -4.8, 2.7);
	new PhysicsAggregate(groundStartAnchor, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	addMesh('groundStartAnchor', groundStartAnchor);*/

	const selectBox = controls.querySelector('#select-box');
	const inputs = controls.querySelectorAll('input[type=number]');

	controls.querySelector('.buttons').addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			currentStep = parseFloat(event.target.value)
			setCurrentStep(event.target, inputs);
		}
	});

	controls.addEventListener('change', (event) => {
		if (event.target !== selectBox && currentMesh) {
			const newValue = parseFloat(event.target.value);
			const dimensions = getMeshDimensions(currentMesh);
			switch (event.target.id) {
				case 'pos-x':
					currentMesh.position.x = newValue;
					break;
				case 'pos-y':
					currentMesh.position.y = newValue;
					break;
				case 'pos-z':
					currentMesh.position.z = newValue;
					break;
				case 'dim-width':
					currentMesh.scaling.x = newValue / dimensions.width;
					break;
				case 'dim-height':
					currentMesh.scaling.y = newValue / dimensions.height;
					break;
				case 'dim-depth':
					currentMesh.scaling.z = newValue / dimensions.depth;
					break;
			}
		}
	});

	buildSelect(selectBox);
	setCurrentStep(controls.querySelector(`button[value="${currentStep}"]`), inputs);

	const posX = controls.querySelector('#pos-x');
	const posY = controls.querySelector('#pos-y');
	const posZ = controls.querySelector('#pos-z');
	const dimWidth = controls.querySelector('#dim-width');
	const dimHeight = controls.querySelector('#dim-height');
	const dimDepth = controls.querySelector('#dim-depth');

	selectBox.addEventListener('change', (e) => {
		currentMesh = getMesh(selectBox.value);
		let x, y, z, depth, height, width;
		if (currentMesh) {
			x = currentMesh.position.x;
			y = currentMesh.position.y;
			z = currentMesh.position.z;
			const dimensions = getMeshDimensions(currentMesh);
			depth = dimensions.depth;
			height = dimensions.height;
			width = dimensions.width;
		} else {
			x = y = z = depth = height = width = '';
		}
		posX.value = x;
		posY.value = y;
		posZ.value = z;
		dimDepth.value = depth;
		dimHeight.value = height;
		dimWidth.value = width;
	});

}
export { buildGround };