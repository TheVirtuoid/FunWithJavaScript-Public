import ModelData from "../../../src/classes/databases/Model/ModelData.js";

describe('When I work with the ModelData class', () => {
	it('should initialize the class', () => {
		const modelData = new ModelData();
		expect(modelData).to.be.instanceOf(ModelData);
	});

	describe('And when I work with the properties', () => {
		it('should set the default properties', () => {
			const modelData = new ModelData();
			expect(modelData.id).to.equal('');
			expect(modelData.name).to.equal('');
			expect(modelData.description).to.equal('');
			expect(modelData.url).to.equal('');
			expect(modelData.model).to.be.null;
		});
		it('should set the properties', () => {
			const modelData = new ModelData({
				id: 'id',
				name: 'name',
				description: 'description',
				url: 'url',
				model: 'should not set'
			});
			expect(modelData.id).to.equal('id');
			expect(modelData.name).to.equal('name');
			expect(modelData.description).to.equal('description');
			expect(modelData.url).to.equal('url');
			expect(modelData.model).to.be.null;
		});

		describe('and when I try to set the properties', () => {
			it('property "id" should be read only', () => {
				const modelData = new ModelData();
				expect(() => {
					modelData.id = 'newId';
				}).to.throw();
			});
			it('property "name" should be read only', () => {
				const modelData = new ModelData();
				expect(() => {
					modelData.name = 'newName';
				}).to.throw();
			});
			it('property "description" should be read only', () => {
				const modelData = new ModelData();
				expect(() => {
					modelData.description = 'newDescription';
				}).to.throw();
			});
			it('property "url" should be read only', () => {
				const modelData = new ModelData();
				expect(() => {
					modelData.url = 'newUrl';
				}).to.throw();
			});
			it('property "model" should be read only', () => {
				const modelData = new ModelData();
				expect(() => {
					modelData.model = 'newModel';
				}).to.throw();
			});
		});
	});

	describe('and when I work with the methods', () => {
		it('should load in a model', () => {
			const modelData = new ModelData({
				id: 'id',
				name: 'name',
				description: 'description',
				url: 'url'
			});
			modelData.getModel();
			expect(modelData.model).not.to.be.null;
		});
	});
});