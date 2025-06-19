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
			expect(venueData.thumbnailUrl).to.equal('');
			expect('thumbnail' in venueData).to.be.true;
			expect(venueData.models).to.have.length(0);
			expect(venueData.layout).to.have.length(0);
			expect(venueData.thumbnail).to.be.undefined;
		});
		it('should set the properties', () => {
			const venueData = new VenueData({
				id: 'id',
				name: 'name',
				description: 'description',
				thumbnailUrl: 'url',
				models: ['anything'],
				layout: ['goes', 'here']
			});
			expect(venueData.id).to.equal('id');
			expect(venueData.name).to.equal('name');
			expect(venueData.description).to.equal('description');
			expect(venueData.thumbnailUrl).to.equal('url');
			expect(venueData.models).to.have.length(1);
			expect(venueData.layout).to.have.length(2);
			expect(venueData.thumbnail).to.be.undefined;
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

			it('property "thumbnailUrl" should be read only', () => {
				const venueData = new VenueData();
				expect(() => {
					venueData.thumbnailUrl = 'newUrl';
				}).to.throw();
			});

			it('property "models" should be read only', () => {
				const venueData = new VenueData();
				expect(() => {
					venueData.models = 'whatever';
				}).to.throw();
			});

			it('property "layout" should be read only', () => {
				const venueData = new VenueData();
				expect(() => {
					venueData.layout = 'whatever';
				}).to.throw();
			});

			it('property "thumbnail" should be read only', () => {
				const venueData = new VenueData();
				expect(() => {
					venueData.thumbnail = 'whatever';
				}).to.throw();
			});
		});

		describe('And when I use the methods', () => {
			it('should load in the venue', () => {
				const venueData = new VenueData({
					id: 'venue-one',
					name: 'name',
					description: 'description',
					thumbnailUrl: '/databases/venue/car-race-438467_1280.jpg',
					models: [],
					layout: []
				});
				venueData.loadVenue()
					.then(() => {
						expect(venueData.models).to.have.length(0);
						expect(venueData.layout).to.have.length(0);
						expect(venueData.thumbnail).not.to.be.undefined;
					})
					.catch(() => {
						expect(false).to.be.true;
					});
			});
		});
	});
});