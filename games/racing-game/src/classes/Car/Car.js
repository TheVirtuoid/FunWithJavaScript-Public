import Model from "../databases/Model/Model.js";

export default class Car {
	#id;
	#name;
	#description;
	#modelId;
	#frame;
	#chassis;


	constructor(args = {}) {
		this.#id = args.id || window?.crypto.randomUUID() || '';
		this.#name = args.name || '';
		this.#description = args.description || '';
		this.#modelId = args.modelId || '';
		this.#frame = {
			model: null,
			shape: null,
		};

		this.#chassis = {
			frontAxle: null,
			rearAxle: null,
			wheels: {
				frontLeft: null,
				frontRight: null,
				rearLeft: null,
				rearRight: null,
			},
			structure: null,
		};
	}

	get id() {
		return this.#id;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description;
	}

	get modelId() {
		return this.#modelId;
	}

	get model() {
		return this.#frame.model;
	}

	get frontAxle() {
		return this.#chassis.frontAxle;
	}

	get rearAxle() {
		return this.#chassis.rearAxle;
	}

	get frontLeftWheel() {
		return this.#chassis.wheels.frontLeft;
	}

	get frontRightWheel() {
		return this.#chassis.wheels.frontRight;
	}

	get rearLeftWheel() {
		return this.#chassis.wheels.rearLeft;
	}

	get rearRightWheel() {
		return this.#chassis.wheels.rearRight;
	}

	getModel(modelId = this.#modelId) {
		if (modelId === this.#modelId && this.model) {
			return this.model;
		}
		const newModel = Model.getModelById(modelId) || null
		if (newModel) {
			this.#frame.model = newModel;
			this.#modelId = modelId;
		} else {
			return undefined;
		}
		return this.model;
	}
}



















