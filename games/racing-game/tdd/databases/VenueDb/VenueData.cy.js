import LayoutData from "../../../src/classes/databases/LayoutDb/LayoutData.js";

describe('When I work with the LayoutData class', () => {
	it('should initialize the class', () => {
		const layoutData = new LayoutData();
		expect(layoutData).to.be.instanceOf(LayoutData);
	});

	describe('And when I work with the properties', () => {
		it('should set the default properties', () => {
			const layoutData = new LayoutData();
			expect(layoutData.id).to.equal('');
			expect(layoutData.name).to.equal('');
			expect(layoutData.description).to.equal('');
			expect(layoutData.layout).to.be.null;
		});
		it('should set the properties', () => {
			const layoutData = new LayoutData({
				id: 'id',
				name: 'name',
				description: 'description',
				layout: 'should not set'
			});
			expect(layoutData.id).to.equal('id');
			expect(layoutData.name).to.equal('name');
			expect(layoutData.description).to.equal('description');
			expect(layoutData.layout).to.be.null;
		});

		describe('and when I try to set the properties', () => {
			it('property "id" should be read only', () => {
				const layoutData = new LayoutData();
				expect(() => {
					layoutData.id = 'newId';
				}).to.throw();
			});
			it('property "name" should be read only', () => {
				const layoutData = new LayoutData();
				expect(() => {
					layoutData.name = 'newName';
				}).to.throw();
			});
			it('property "description" should be read only', () => {
				const layoutData = new LayoutData();
				expect(() => {
					layoutData.description = 'newDescription';
				}).to.throw();
			});
			it('property "layout" should be read only', () => {
				const layoutData = new LayoutData();
				expect(() => {
					layoutData.layout = 'newLayout';
				}).to.throw();
			});
		});
	});

	describe('and when I work with the methods', () => {
		it('should load in a layout', () => {
			const layoutData = new LayoutData({
				id: 'layout-one',
				name: 'name',
				description: 'description',
				url: 'url'
			});
			layoutData.getLayout();
			expect(layoutData.layout).not.to.be.null;
		});
	});
});