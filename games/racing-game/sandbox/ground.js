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

const buildGround = (scene, controls) => {
	const groundMaterial = new StandardMaterial("grass", scene);
	groundMaterial.diffuseColor = new Color3(0, .25, 0);

	const groundMaterial2 = new StandardMaterial('grass-2', scene);
	groundMaterial2.diffuseColor = new Color3(0, .15, 0);

	const groundMaterial3 = new StandardMaterial('grass-2', scene);
	groundMaterial3.diffuseColor = new Color3(0, .35, 0);


	const groundWallMaterial = new StandardMaterial('ground-wall', scene);
	groundWallMaterial.diffuseColor = new Color3(0, 0, 0);

	const groundBase = MeshBuilder.CreateGround('ground-base', {
		width: 200,
		height: 200,
		subdivisions: 4,
	}, scene);
	groundBase.material = groundMaterial;
	groundBase.position = new Vector3(0, -35, 100);
	new PhysicsAggregate(groundBase, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBase', groundBase);

	const groundBaseWallNorth = MeshBuilder.CreateBox('ground-base-north', { depth: 200, width: 1, height: 1 }, scene);
	groundBaseWallNorth.material = groundWallMaterial;
	groundBaseWallNorth.position = new Vector3(-100, -35, 100);
	new PhysicsAggregate(groundBaseWallNorth, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallNorth', groundBaseWallNorth);

	const groundBaseWallSouth = MeshBuilder.CreateBox('ground-base-south', { depth: 200, width: 1, height: 1 }, scene);
	groundBaseWallSouth.material = groundWallMaterial;
	groundBaseWallSouth.position = new Vector3(100, -35, 100);
	new PhysicsAggregate(groundBaseWallSouth, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallSouth', groundBaseWallSouth);

	const groundBaseWallEast = MeshBuilder.CreateBox('ground-base-east', { depth: 1, width: 200, height: 1 }, scene);
	groundBaseWallEast.material = groundWallMaterial;
	groundBaseWallEast.position = new Vector3(0, -35, 0);
	new PhysicsAggregate(groundBaseWallEast, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallEast', groundBaseWallEast);

	const groundBaseWallWest = MeshBuilder.CreateBox('ground-base-west', { depth: 1, width: 200, height: 1 }, scene);
	groundBaseWallWest.material = groundWallMaterial;
	groundBaseWallWest.position = new Vector3(0, -35, 200);
	new PhysicsAggregate(groundBaseWallWest, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	// addMesh('groundBaseWallWest', groundBaseWallWest);

	const ground180 = MeshBuilder.CreateBox('ground-180', { depth: 200, width: 50, height: 5 }, scene);
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
	new PhysicsAggregate(groundStraight3, PhysicsShapeType.BOX, { mass: 0, friction: 1 }, scene);
	groundStraight3.rotate(new Vector3(0, 0, 1), Math.PI / 1.065);
	addMesh('groundStraight3', groundStraight3);


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