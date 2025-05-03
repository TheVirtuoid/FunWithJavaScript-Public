import LayoutDb from "../../../src/classes/databases/LayoutDb/LayoutDb.js";
import LayoutData from "../../../src/classes/databases/LayoutDb/LayoutData.js";

describe('When I work with the Layout database', () => {
	it('should throw an error when being constructed', () => {
		expect(() => new LayoutDb()).to.throw();
	});

	it('should have an empty database', () => {
		expect(LayoutDb.getAllLayouts().length).to.equal(0);
	});

	describe('and after I set a database', () => {
		const layouts = JSON.stringify([
			{id: '1', name: 'Layout 1', description: 'Description 1', url: 'url1'},
			{id: '2', name: 'Layout 2', description: 'Description 2', utl: 'url2'},
			{id: '3', name: 'Layout 3', description: 'Description 3', url: 'url3'}
		]);

		beforeEach(() => {
			LayoutDb.setDatabase(layouts);
		});

		it('should get a layout by id', () => {
			expect(LayoutDb.getLayoutById('1')).to.be.instanceof(LayoutData);
		});

		it('should return undefined if the layout id is not found', () => {
			expect(LayoutDb.getLayoutById('bad')).to.be.undefined;
		});

		it('should return all layouts', () => {
			const allLayoutsData = LayoutDb.getAllLayouts();
			expect(allLayoutsData).to.have.length(3);
			allLayoutsData.forEach((layoutData) => {
				expect(layoutData).to.be.instanceof(LayoutData);
			});
		});

		it('should get a layout by name', () => {
			expect(LayoutDb.getLayoutByName('Layout 1')).to.be.instanceof(LayoutData);
		});

		it('should return undefined if the layout name is not found', () => {
			expect(LayoutDb.getLayoutByName('bad')).to.be.undefined;
		});

		it('should populate a layoutData', () => {
			const layoutData = LayoutDb.getLayoutById('1');
			LayoutDb.getLayout(layoutData);
			expect(layoutData.layout).not.to.be.null;
		});
	});
});



