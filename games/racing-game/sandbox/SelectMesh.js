export default class SelectMesh {

	#meshes = new Map();
	#currentMesh = null;
	#currentStep = 1;
	#selectBox
	#inputs;
	#buttons;
	#controls;

	#posX;
	#posY;
	#posZ;
	#dimWidth;
	#dimHeight;
	#dimDepth;

	constructor(controls) {
		this.#controls = controls;
		this.#selectBox = this.controls.querySelector('#select-box');
		this.#inputs = this.controls.querySelectorAll('input[type=number]');
		this.#buttons = this.controls.querySelector('.buttons');

		this.#posX = controls.querySelector('#pos-x');
		this.#posY = controls.querySelector('#pos-y');
		this.#posZ = controls.querySelector('#pos-z');
		this.#dimWidth = controls.querySelector('#dim-width');
		this.#dimHeight = controls.querySelector('#dim-height');
		this.#dimDepth = controls.querySelector('#dim-depth');

		this.#selectBox.replaceChildren();
		this.#selectBox.insertAdjacentHTML('afterbegin', `<option value="">Select Mesh</option>`);



		this.#setCurrentStep(this.controls.querySelector(`button[value="${this.currentStep}"]`), this.inputs);

		this.buttons.addEventListener('click', (event) => {
			if (event.target.tagName === 'BUTTON') {
				this.#currentStep = parseFloat(event.target.value)
				this.#setCurrentStep(event.target, this.inputs);
			}
		});
		this.controls.addEventListener('change', (event) => {
			if (event.target !== this.selectBox && this.currentMesh) {
				const newValue = parseFloat(event.target.value);
				const dimensions = this.#getMeshDimensions(this.currentMesh);
				switch (event.target.id) {
					case 'pos-x':
						this.#currentMesh.position.x = newValue;
						break;
					case 'pos-y':
						this.#currentMesh.position.y = newValue;
						break;
					case 'pos-z':
						this.#currentMesh.position.z = newValue;
						break;
					case 'dim-width':
						this.#currentMesh.scaling.x = newValue / dimensions.width;
						break;
					case 'dim-height':
						this.#currentMesh.scaling.y = newValue / dimensions.height;
						break;
					case 'dim-depth':
						this.#currentMesh.scaling.z = newValue / dimensions.depth;
						break;
				}
			}
		});

		this.selectBox.addEventListener('change', (e) => {
			this.#currentMesh = this.#getMesh(this.selectBox.value);
			let x, y, z, depth, height, width;
			if (this.currentMesh) {
				x = this.currentMesh.position.x;
				y = this.currentMesh.position.y;
				z = this.currentMesh.position.z;
				const dimensions = this.#getMeshDimensions(this.currentMesh);
				depth = dimensions.depth;
				height = dimensions.height;
				width = dimensions.width;
			} else {
				x = y = z = depth = height = width = '';
			}
			this.posX.value = x;
			this.posY.value = y;
			this.posZ.value = z;
			this.dimDepth.value = depth;
			this.dimHeight.value = height;
			this.dimWidth.value = width;
		});
	}

	get selectBox () {
		return this.#selectBox;
	}

	get inputs() {
		return this.#inputs;
	}

	get buttons() {
		return this.#buttons;
	}

	get controls() {
		return this.#controls;
	}

	get currentMesh() {
		return this.#currentMesh;
	}

	get currentStep() {
		return this.#currentStep;
	}

	get posX() {
		return this.#posX;
	}

	get posY() {
		return this.#posY;
	}

	get posZ() {
		return this.#posZ;
	}

	get dimWidth() {
		return this.#dimWidth;
	}

	get dimHeight() {
		return this.#dimHeight;
	}

	get dimDepth() {
		return this.#dimDepth;
	}

	addMesh (name, mesh) {
		if (this.#meshes.has(name)) {
			this.#meshes.get(name).dispose();
		}
		this.#meshes.set(name, mesh);
		const option = document.createElement('option');
		option.value = name;
		option.textContent = name;
		this.#selectBox.appendChild(option);
	}

	#getMesh(name) {
		if (this.#meshes.has(name)) {
			return this.#meshes.get(name);
		}
		return null;
	}

	#getMeshDimensions(mesh) {
		const boundingInfo = mesh.getBoundingInfo();
		const boundingBox = boundingInfo.boundingBox;

		const width = boundingBox.maximum.x - boundingBox.minimum.x;
		const height = boundingBox.maximum.y - boundingBox.minimum.y;
		const depth = boundingBox.maximum.z - boundingBox.minimum.z;

		return { width, height, depth };
	}

	#setCurrentStep(selectedButton, inputs) {
		selectedButton.closest('.buttons').querySelectorAll('button').forEach(button => {
			button.classList.remove('selected');
			if (button === selectedButton) {
				button.classList.add('selected');
			}
		});
		this.inputs.forEach((input) => {
			input.step = selectedButton.value;
		});
	}
}