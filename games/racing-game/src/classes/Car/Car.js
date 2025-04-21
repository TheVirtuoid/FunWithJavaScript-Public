export default class Car {
	constructor(args = {}) {
		this.id = args.id || window?.crypto.randomUUID() || '';
		this.name = args.name || '';
		this.description = args.description || '';
		this.modelId = args.modelId || '';

		this.frame = {
			model: null,
			shape: null,
		};

		this.chassis = {
			frontAxle: null,
			rearAxle: null,
			wheels: null,
			structure: null,
		};
	}
}