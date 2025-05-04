import CarDb from "../../../src/classes/databases/CarDb/CarDb.js";
import CarData from "../../../src/classes/databases/CarDb/CarData.js";

describe('When I work with the Car database', () => {
	it('should throw an error when being constructed', () => {
		expect(() => new CarDb()).to.throw();
	});

	it('should have an empty database', () => {
		expect(CarDb.getAllCars().length).to.equal(0);
	});

	describe('and after I set a database', () => {
		const cars = JSON.stringify([
			{id: '1', name: 'Car 1', description: 'Description 1', url: 'url1'},
			{id: '2', name: 'Car 2', description: 'Description 2', utl: 'url2'},
			{id: '3', name: 'Car 3', description: 'Description 3', url: 'url3'}
		]);

		beforeEach(() => {
			CarDb.setDatabase(cars);
		});

		it('should get a car by id', () => {
			expect(CarDb.getCarById('1')).to.be.instanceof(CarData);
		});

		it('should return undefined if the car id is not found', () => {
			expect(CarDb.getCarById('bad')).to.be.undefined;
		});

		it('should return all cars', () => {
			const allCarsData = CarDb.getAllCars();
			expect(allCarsData).to.have.length(3);
			allCarsData.forEach((carData) => {
				expect(carData).to.be.instanceof(CarData);
			});
		});

		it('should get a car by name', () => {
			expect(CarDb.getCarByName('Car 1')).to.be.instanceof(CarData);
		});

		it('should return undefined if the car name is not found', () => {
			expect(CarDb.getCarByName('bad')).to.be.undefined;
		});

		it('should populate a carData', () => {
			const carData = CarDb.getCarById('1');
			CarDb.loadCar(carData);
			expect(carData.model).to.be.null;
		});
	});
});



