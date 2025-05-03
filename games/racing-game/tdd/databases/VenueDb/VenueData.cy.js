import VenueData from "../../../src/classes/databases/VenueDb/VenueData.js";

describe('When I work with the VenueData class', () => {
	it('should initialize the class', () => {
		const venueData = new VenueData();
		expect(venueData).to.be.instanceOf(VenueData);
	});

	describe('And when I work with the properties', () => {
		it('should set the default properties', () => {
			const venueData = new VenueData();
			expect(venueData.id).to.equal('');
			expect(venueData.name).to.equal('');
			expect(venueData.description).to.equal('');
			expect(venueData.url).to.equal('');
			expect(venueData.models).to.be.undefined;
			expect(venueData.layout).to.be.undefined;
		});
		it('should set the properties', () => {
			const venueData = new VenueData({
				id: 'id',
				name: 'name',
				description: 'description',
				url: 'url'
			});
			expect(venueData.id).to.equal('id');
			expect(venueData.name).to.equal('name');
			expect(venueData.description).to.equal('description');
			expect(venueData.url).to.equal('url');
			expect(venueData.models).to.be.undefined;
			expect(venueData.layout).to.be.undefined;
		});

		describe('and when I try to set the properties', () => {
			it('property "id" should be read only', () => {
				const venueData = new VenueData();
				expect(() => {
					venueData.id = 'newId';
				}).to.throw();
			});

			it('property "name" should be read only', () => {
				const venueData = new VenueData();
				expect(() => {
					venueData.name = 'newName';
				}).to.throw();
			});

			it('property "description" should be read only', () => {
				const venueData = new VenueData();
				expect(() => {
					venueData.description = 'newDescription';
				}).to.throw();
			});

			it('property "url" should be read only', () => {
				const venueData = new VenueData();
				expect(() => {
					venueData.url = 'newUrl';
				}).to.throw();
			});
		});

		describe('And when I use the methods', () => {
			// TODO: When the database becomes official, fix this
			it('should load in the blueprint', () => {
				const venueData = new VenueData({
					id: 'venue-one',
					name: 'name',
					description: 'description',
					url: 'url'
				});
				venueData.loadVenue();
				expect(venueData.models).to.be.null;
				expect(venueData.layout).to.be.null;
			});
		});
	});
});