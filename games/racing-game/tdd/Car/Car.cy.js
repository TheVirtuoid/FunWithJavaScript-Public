import Car from "../../src/classes/Car/Car.js";
import ModelData from "../../src/classes/databases/Model/ModelData.js";
import Model from "../../src/classes/databases/Model/Model.js";
import modelData from '../support/model-data.json';
Model.setDatabase(JSON.stringify(modelData));

describe('When I work with the Car class', () => {
	let car;
	beforeEach(() => {
		car = new Car();
	});

	it('should initialize the class', () => {
		expect(car).to.be.instanceOf(Car);
	});

	describe('And when I work with the properties', () => {
		it('should have a id property', () => {
			expect(car.id).to.be.a('string');
		});

		it('should have a name property', () => {
			expect(car.name).to.be.a('string');
		});

		it('should have a description property', () => {
			expect(car.description).to.be.a('string');
		});

		it('should have a modelId property', () => {
			expect(car.modelId).to.be.a('string');
		});

		it('should have a model property', () => {
			expect(car.model).to.be.null;
		});

		it('should have a frontAxle property', () => {
			expect(car.frontAxle).to.be.null;
		});

		it('should have a rearAxle property', () => {
			expect(car.rearAxle).to.be.null;
		});

		it('should have a frontLeftWheel property', () => {
			expect(car.frontLeftWheel).to.be.null;
		});

		it('should have a frontRightWheel property', () => {
			expect(car.frontRightWheel).to.be.null;
		});

		it('should have a rearLeftWheel property', () => {
			expect(car.rearLeftWheel).to.be.null;
		});

		it('should have a rearRightWheel property', () => {
			expect(car.rearRightWheel).to.be.null;
		});


		it('should allow me to set the properties upon initialization', () => {
			const id = 'id';
			const name = 'name';
			const description = 'description';
			const modelId = 'car-one';
			const car = new Car({id, name, description, modelId});
			expect(car.id).to.equal(id);
			expect(car.name).to.equal(name);
			expect(car.description).to.equal(description);
			expect(car.modelId).to.equal(modelId);
		})
	});

	describe('And when I work with the methods', () => {
		let car;

		beforeEach(() => {
			const id = 'id';
			const name = 'name';
			const description = 'description';
			const modelId = 'car-one';
			car = new Car({id, name, description, modelId});
		});
		it('getModel() should get the model by modelId', () => {
			const model = car.getModel();
			expect(model).to.be.instanceOf(ModelData);
			expect(car.model).to.equal(model);
		});
		it('getModel() should get the model by modelId when an ID is passed', () => {
			const newModelId = 'car-two';
			const model = car.getModel(newModelId);
			expect(model).to.be.instanceOf(ModelData);
			expect(car.modelId).to.equal(newModelId);
			expect(car.model).to.equal(model);
		});
		it('getModel() should return undefined if the model id is not found', () => {
			const model = car.getModel('bad');
			expect(model).to.be.undefined;
			expect(car.model).to.be.null;
		});
	});
});