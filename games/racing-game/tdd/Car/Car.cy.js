import Car from "../../src/classes/Car/Car.js";

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
		it('should have a frame property', () => {
			expect(car.frame).to.be.an('object');
		});
		it('should have a chassis property', () => {
			expect(car.chassis).to.be.an('object');
		});

		it('should allow me to set the properties upon initialization', () => {
			const id = 'id';
			const name = 'name';
			const description = 'description';
			const modelId = 'modelId';
			const car = new Car({id, name, description, modelId});
			expect(car.id).to.equal(id);
			expect(car.name).to.equal(name);
			expect(car.description).to.equal(description);
			expect(car.modelId).to.equal(modelId);
		})
	});

	xdescribe('And when I work with the methods', () => {
		it('getModel() should get the model by modelId', () => {});
		it('getModel() should return undefined if the model id is not found', () => {});
	});

	describe('And when I work with the frame property', () => {
		it('should have a model property', () => {
			expect(car.frame.model).to.be.null;
		});
		it('should have a shape property', () => {
			expect(car.frame.shape).to.be.null;
		});
	});

	describe('And when I work with the chassis property', () => {
		it('should have a frontAxle property', () => {
			expect(car.chassis.frontAxle).to.be.null;
		});
		it('should have a rearAxle property', () => {
			expect(car.chassis.rearAxle).to.be.null;
		});
		it('should have a wheels property', () => {
			expect(car.chassis.wheels).to.be.null;
		});
		it('should have a structure property', () => {
			expect(car.chassis.structure).to.be.null;
		});
	});
});