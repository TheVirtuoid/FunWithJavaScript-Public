import Model from "../../../src/classes/databases/Model/Model.js";
import ModelData from "../../../src/classes/databases/Model/ModelData.js";

describe('When I work with the Model database', () => {
	it('should throw an error when being constructed', () => {
		expect(() => new Model()).to.throw();
	});

	it('should have an empty database', () => {
		expect(Model.getAllModels().length).to.equal(0);
	});

	describe('and after I set a database', () => {
		const models = JSON.stringify([
			{id: '1', name: 'Model 1', description: 'Description 1', url: 'url1'},
			{id: '2', name: 'Model 2', description: 'Description 2', utl: 'url2'},
			{id: '3', name: 'Model 3', description: 'Description 3', url: 'url3'}
		]);

		beforeEach(() => {
			Model.setDatabase(models);
		});

		it('should get a model by id', () => {
			expect(Model.getModelById('1')).to.be.instanceof(ModelData);
		});

		it('should return undefined if the model id is not found', () => {
			expect(Model.getModelById('bad')).to.be.undefined;
		});

		it('should return all models', () => {
			const allModelsData = Model.getAllModels();
			expect(allModelsData).to.have.length(3);
			allModelsData.forEach((modelData) => {
				expect(modelData).to.be.instanceof(ModelData);
			});
		});

		it('should get a model by name', () => {
			expect(Model.getModelByName('Model 1')).to.be.instanceof(ModelData);
		});

		it('should return undefined if the model name is not found', () => {
			expect(Model.getModelByName('bad')).to.be.undefined;
		});

		it('should populate a modelData', () => {
			const modelData = Model.getModelById('1');
			Model.getModel(modelData);
			expect(modelData.model).not.to.be.null;
		});
	});
});



