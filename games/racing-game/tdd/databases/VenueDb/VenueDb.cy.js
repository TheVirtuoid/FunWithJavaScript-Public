import VenueDb from "../../../src/classes/databases/VenueDb/VenueDb.js";
import VenueData from "../../../src/classes/databases/VenueDb/VenueData.js";

describe('When I work with the Venue database', () => {
	it('should throw an error when being constructed', () => {
		expect(() => new VenueDb()).to.throw();
	});

	it('should have an empty database', () => {
		expect(VenueDb.getAllVenues().length).to.equal(0);
	});

	describe('and after I set a database', () => {
		const venues = JSON.stringify([
			{id: '1', name: 'Venue 1', description: 'Description 1', url: 'url1'},
			{id: '2', name: 'Venue 2', description: 'Description 2', utl: 'url2'},
			{id: '3', name: 'Venue 3', description: 'Description 3', url: 'url3'}
		]);

		beforeEach(() => {
			VenueDb.setDatabase(venues);
		});

		it('should get a venue by id', () => {
			expect(VenueDb.getVenueById('1')).to.be.instanceof(VenueData);
		});

		it('should return undefined if the venue id is not found', () => {
			expect(VenueDb.getVenueById('bad')).to.be.undefined;
		});

		it('should return all venues', () => {
			const allVenuesData = VenueDb.getAllVenues();
			expect(allVenuesData).to.have.length(3);
			allVenuesData.forEach((venueData) => {
				expect(venueData).to.be.instanceof(VenueData);
			});
		});

		it('should get a venue by name', () => {
			expect(VenueDb.getVenueByName('Venue 1')).to.be.instanceof(VenueData);
		});

		it('should return undefined if the venue name is not found', () => {
			expect(VenueDb.getVenueByName('bad')).to.be.undefined;
		});

		it('should populate a venueData', () => {
			const venueData = VenueDb.getVenueById('1');
			VenueDb.loadVenue(venueData);
			expect(venueData.models).to.be.null;
			expect(venueData.layout).to.be.null;
		});
	});
});



