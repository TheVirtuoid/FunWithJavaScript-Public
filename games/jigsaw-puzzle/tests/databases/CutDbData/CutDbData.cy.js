import CutDbData from "../../../src/classes/databases/CutDbData/CutDbData.js";

describe('WHen I work with the CutData class', () => {
	it('should initialize an empty class', () => {
		const cutData = new CutDbData();
		expect(cutData).to.have.property('name', null);
		expect(cutData).to.have.property('description', null);
		expect(cutData).to.have.property('url', null);
		expect(cutData).to.have.property('id', null);
	});

	it('should initialize the claas based upon individual properties', () => {
		const testData = 		{ name: 'Square', description: 'A square cut', url: '/images/cut-square.jpg', id: 'f06ef6b8-c7b2-467c-bc75-5bd76a8ddebd' };
		const cutData = new CutDbData(testData);
		expect(cutData.name).to.equal(testData.name);
		expect(cutData.description).to.equal(testData.description);
		expect(cutData.url).to.equal(testData.url);
		expect(cutData.id).to.equal(testData.id);
	});
});