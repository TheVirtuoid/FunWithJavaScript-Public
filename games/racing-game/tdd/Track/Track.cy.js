import Track from "../../src/classes/Track/Track.js";

describe('When I work with the Track class', () => {
	it('should return an instance of the class', () => {
		const track = new Track();
		expect(track).to.be.instanceOf(Track);
	});

	describe('And when I work with the properties', () => {
		let track;
		beforeEach(() => {
			track = new Track();
		});
		it('should have an id property', () => {
			expect(track.id).to.equal('');
		});
		it('should have a name property', () => {
			expect(track.name).to.equal('');
		});
		it('should have a description property', () => {
			expect(track.description).to.equal('');
		});
		it('should have a type property', () => {
			expect(track.type).to.equal(Track.NONE);
		});
		it('should have an attributes property', () => {
			expect('attributes' in track).to.be.true;
		});

		describe('And when I try to set the properties upon instantiation', () => {
			let track;
			let id;
			let name;
			let description;
			let type;
			let attributes;

			beforeEach(() => {
				id = 'id';
				name = 'name';
				description = 'description';
				type = Track.STRAIGHT;
				attributes = {
					something: 'something'
				}
				track = new Track({
					id,
					name,
					description,
					type,
					attributes
				});
			});

			it('should set the id', () => {
				expect(track.id).to.equal(id);
			});

			it('should set the description', () => {
				expect(track.description).to.equal(description);
			});

			it('should set the name', () => {
				expect(track.name).to.equal(name);
			});

			it('should set the type', () => {
				expect(track.type).to.equal(type);
			});

			it('should set the attributes', () => {
				expect(track.attributes).to.equal(attributes);
			});
		});

		describe('And whe I try to set the properties after instantiation', () => {
			it('should throw an error if I try to set the id', () => {
				expect(() => track.id = 'test').to.throw();
			});

			it('should throw an error if I try to set the name', () => {
				expect(() => track.name = 'test').to.throw();
			});

			it('should throw an error if I try to set the description', () => {
				expect(() => track.description = 'test').to.throw();
			});

			it('should throw an error if I try to set the type', () => {
				expect(() => track.type = Track.STRAIGHT).to.throw();
			});

			it('should throw an error if I try to set the attributes', () => {
				expect(() => track.attributes = {something: 'something'}).to.throw();
			});
		});
	});

	describe('And when I work with the common attributes', () => {
		let track;
		beforeEach(() => {
			track = new Track();
		});

		it('should have a startingPosition property', () => {
			expect('startingPosition' in track).to.be.true;;
		});

		it('should have a startingDirectionVector property', () => {
			expect('startingDirectionVector' in track).to.be.true;;
		});

		it('should have an endingPosition property', () => {
			expect('endingPosition' in track).to.be.true;;
		});

		it('should have an endingDirectionVector property', () => {
			expect('endingDirectionVector' in track).to.be.true;
		});
	});

});




















