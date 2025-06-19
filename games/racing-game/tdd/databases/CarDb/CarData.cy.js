import CarData from "../../../src/classes/databases/CarDb/CarData.js";

describe('When I work with the CarData class', () => {
	it('should initialize the class', () => {
		const carData = new CarData();
		expect(carData).to.be.instanceOf(CarData);
	});

	describe('And when I work with the properties', () => {
		it('should set the default properties', () => {
			const carData = new CarData();
			expect(carData.id).to.equal('');
			expect(carData.name).to.equal('');
			expect(carData.description).to.equal('');
			expect(carData.modelUrl).to.equal('');
			expect(carData.thumbnailUrl).to.equal('');
			expect('model' in carData).to.be.true;
			expect(carData.model).to.be.undefined;
			expect('thumbnail' in carData).to.be.true;
			expect(carData.thumbnail).to.be.undefined;
		});
		it('should set the properties', () => {
			const carData = new CarData({
				id: 'id',
				name: 'name',
				description: 'description',
				modelUrl: 'modelUrl',
				thumbnailUrl: 'thumbnailUrl'
			});
			expect(carData.id).to.equal('id');
			expect(carData.name).to.equal('name');
			expect(carData.description).to.equal('description');
			expect(carData.modelUrl).to.equal('modelUrl');
			expect(carData.thumbnailUrl).to.equal('thumbnailUrl');
			expect('model' in carData).to.be.true;
			expect(carData.model).to.be.undefined;
			expect('thumbnail' in carData).to.be.true;
			expect(carData.thumbnail).to.be.undefined;
		});

		describe('and when I try to set the properties', () => {
			it('property "id" should be read only', () => {
				const carData = new CarData();
				expect(() => {
					carData.id = 'newId';
				}).to.throw();
			});

			it('property "name" should be read only', () => {
				const carData = new CarData();
				expect(() => {
					carData.name = 'newName';
				}).to.throw();
			});

			it('property "description" should be read only', () => {
				const carData = new CarData();
				expect(() => {
					carData.description = 'newDescription';
				}).to.throw();
			});

			it('property "modelUrl" should be read only', () => {
				const carData = new CarData();
				expect(() => {
					carData.modelUrl = 'newUrl';
				}).to.throw();
			});

			it('property "thumbnailUrl" should be read only', () => {
				const carData = new CarData();
				expect(() => {
					carData.thumbnailUrl = 'newUrl';
				}).to.throw();
			});

			it('property "model" should be read only', () => {
				const carData = new CarData();
				expect(() => {
					carData.model = 'whatever';
				}).to.throw();
			});

			it('property "thumbnail" should be read only', () => {
				const carData = new CarData();
				expect(() => {
					carData.thumbnail = 'whatever';
				}).to.throw();
			});
		});

		describe('And when I use the methods', () => {
			it('should load in the model', () => {
				const carData = new CarData({
					id: 'car-one',
					name: 'name',
					description: 'description',
					modelUrl: '/databases/car/Ferarri.glb',
					thumbnailUrl: '/databases/car/auto-1941988_1280.png'
				});
				carData.loadCar()
					.then(() => {
						expect(carData.model).not.to.be.undefined;
						expect(carData.thumbnail).not.to.be.undefined;
					});
			});
		});
	});
});