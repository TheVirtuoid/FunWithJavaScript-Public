import VenueData from "../../src/classes/databases/VenueDb/VenueData.js";
import VenueDb from "../../src/classes/databases/VenueDb/VenueDb.js";
import venueData from '../support/venue-data.json';
import Venue from "../../src/classes/Venue/Venue.js";
VenueDb.setDatabase(JSON.stringify(venueData));

describe('When I work with the Venue class', () => {
	let venue;
	beforeEach(() => {
		venue = new Venue();
	});

	it('should initialize the class', () => {
		expect(venue).to.be.instanceOf(Venue);
	});

	describe('And when I work with the properties', () => {
		it('should have a id property', () => {
			expect(venue.id).to.be.a('string');
		});

		it('should have a name property', () => {
			expect('name' in venue).to.be.true;
		});

		it('should have a description property', () => {
			expect('description' in venue).to.be.true;
		});

		it('should have a venueId property', () => {
			expect(venue.venueId).to.be.a('string');
		});

		it('should have a models property', () => {
			expect('models' in venue).to.be.true;
		});

		it('should have a layout property', () => {
			expect('layout' in venue).to.be.true;
		});

		it('should allow me to set the properties upon initialization', () => {
			const id = 'test';
			const venueId = venueData[0].id;
			const venue = new Venue({ id, venueId });
			expect(venue.id).to.equal(id);
			expect(venue.name).to.be.undefined;
			expect(venue.description).to.be.undefined;
			expect(venue.venueId).to.equal(venueId);
			expect(venue.models).to.be.undefined;
			expect(venue.layout).to.be.undefined;
		})
	});

	describe('And when I work with the methods', () => {
		let venue;

		beforeEach(() => {
			const id = 'test';
			const venueId = venueData[0].id;
			venue = new Venue({ id, venueId });
		});

		it('getVenue() should get the venue by venueId', () => {
			venue.getVenue();
			expect(venue.description).to.equal(venueData[0].description);
			expect(venue.name).to.equal(venueData[0].name);
			expect(venue.models).to.be.null;
			expect(venue.layout).to.be.null;
		});

		it('getVenue() should return undefined if the venue id is not found', () => {
			const id = 'test';
			const venueId = 'baddie';
			venue = new Venue({ id, venueId });
			const newVenue = venue.getVenue();
			expect(newVenue).to.be.undefined;
		});
	});
});