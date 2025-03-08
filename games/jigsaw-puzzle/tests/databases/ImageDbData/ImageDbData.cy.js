import Position2d from "../../../src/classes/support/Position2d.js";
import NumPieceDbData from "../../../src/classes/databases/NumPieceDbData/NumPieceDbData.js";
import ImageDbData from "../../../src/classes/databases/ImageDbData/ImageDbData.js";

describe('When I work with the ImageDbData class', () => {
	it('should initialize an empty class', () => {
		const imageData = new ImageDbData();
		expect(imageData).to.have.property('name', null);
		expect(imageData).to.have.property('url', null);
		expect(imageData).to.have.property('id', null);
		expect(imageData).to.have.property('category', null);
	});

	it('should initialize the claas based upon individual properties', () => {
		const testData = { url: '/images/london-7965770_1280.jpg', id: '42f2883a-ef8b-475b-ae5c-86328efdfd2d', name: 'Jolly Ole London', category: 'cities' };
		const imageData = new ImageDbData(testData);
		expect(imageData.name).to.equal(testData.name);
		expect(imageData.url).to.equal(testData.url);
		expect(imageData.id).to.equal(testData.id);
		expect(imageData.category).to.equal(testData.category);
	});
});
