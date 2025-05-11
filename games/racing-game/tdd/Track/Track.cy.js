import Track from "../../src/classes/Track/Track.js";
import V3 from "../../src/classes/V3/V3.js";

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

		it('should NOT have an attributes property', () => {
			expect('attributes' in track).to.be.false;
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
		});
	});

	describe('And when I use the connectTo method', () => {
		const startingPosition = new V3(1, 1, 1);
		const startingDirectionVector = new V3(1, 0, 0);
		const track1 = Track.CreateStartingAnchor({ startingPosition, startingDirectionVector });
		const track2 = Track.CreateStraight({ length: 10 });
		it('should throw error if connectTo is not a Track', () => {
			expect(() => track2.connectTo('not a track')).to.throw('Track.connectTo(): Argument must be an instance of Track');
		});
		it('should have changed the startingPosition of the STRAIGHT', () => {
			track2.connectTo(track1);
			expect(track2.startingPosition.compareTo(startingPosition)).to.be.true;
			expect(track2.startingDirectionVector.compareTo(startingDirectionVector)).to.be.true;
		});
	});

	describe('And when I use the setEndPoints method', () => {
		const id = 'id';
		const length = 10;
		it('should throw error if startingPoints has not been set', () => {
			const track = Track.CreateStraight({ id, length });
			expect(() => track.setEndPoints()).to.throw();
		});
	});

	describe('And when I work with the common attributes', () => {
		let track;
		beforeEach(() => {
			track = new Track();
		});

		it('should have a startingPosition property', () => {
			expect('startingPosition' in track).to.be.true;
		});

		it('should have a startingDirectionVector property', () => {
			expect('startingDirectionVector' in track).to.be.true;
		});

		it('should have an endingPosition property', () => {
			expect('endingPosition' in track).to.be.true;
		});

		it('should have an endingDirectionVector property', () => {
			expect('endingDirectionVector' in track).to.be.true;
		});

		it('should have a radius property', () => {
			expect('radius' in track).to.be.true;
		});

		it('should have a degrees property', () => {
			expect('degrees' in track).to.be.true;
		});

		it('should have a depthDrop property', () => {
			expect('depthDrop' in track).to.be.true;
		});

		it('should have a contour property', () => {
			expect('contour' in track).to.be.true;
		});

		it('should have a length property', () => {
			expect('length' in track).to.be.true;
		});

		it('should have a curveDirection property', () => {
			expect('curveDirection' in track).to.be.true;
		});

		it('should have a startingGuardRail property', () => {
			expect('startingGuardRail' in track).to.be.true;
		});

		it('should have an endingGuardRail property', () => {
			expect('endingGuardRail' in track).to.be.true;
		});

		it('should have a trackWidth property', () => {
			expect('trackWidth' in track).to.be.true;
		});

		describe('And when I examine the defaults', () => {
			it('should set the id to blank string', () => {
				expect(track.id).to.equal('');
			});

			it('should set the name to blank string', () => {
				expect(track.name).to.equal('');
			});

			it('should set the description to blank string', () => {
				expect(track.description).to.equal('');
			});

			it('should set the type to Track.NONE', () => {
				expect(track.type).to.equal(Track.NONE);
			});

			it('should set startingPosition to null', () => {
				expect(track.startingPosition).to.equal(null);
			});

			it('should set startingDirectionVector to null', () => {
				expect(track.startingDirectionVector).to.equal(null);
			});

			it('should set endingPosition to null', () => {
				expect(track.endingPosition).to.equal(null);
			});

			it('should set endingDirectionVector to null', () => {
				expect(track.endingDirectionVector).to.equal(null);
			});

			it('should set radius to null', () => {
				expect(track.radius).to.equal(null);
			});

			it('should set degrees to null', () => {
				expect(track.degrees).to.equal(null);
			});

			it('should set depthDrop to null', () => {
				expect(track.depthDrop).to.equal(null);
			});

			it('should set curveDirection to null', () => {
				expect(track.curveDirection).to.equal(null);
			});

			it('should set contour to null', () => {
				expect(track.contour).to.equal(null);
			});

			it('should set length to null', () => {
				expect(track.length).to.equal(null);
			});

			it('should set startingPosition to null ', () => {
				expect(track.startingPosition).to.equal(null);
			});

			it('should set startingDirectionVector to null ', () => {
				expect(track.startingDirectionVector).to.equal(null);
			});

			it('should set endingPosition to null ', () => {
				expect(track.endingPosition).to.equal(null);
			});

			it('should set endingDirectionVector to null ', () => {
				expect(track.endingDirectionVector).to.equal(null);
			});

			it('should set startingGuardRail.staringHeight to the default ', () => {
				expect(track.startingGuardRail.startingHeight).to.equal(Track.STARTING_GUARDRAIL_START_HEIGHT);
			});

			it('should set startingGuardRail.endingHeight to the default ', () => {
				expect(track.startingGuardRail.endingHeight).to.equal(Track.STARTING_GUARDRAIL_END_HEIGHT);
			});

			it('should set endingGuardRail.startingHeight to the default ', () => {
				expect(track.endingGuardRail.startingHeight).to.equal(Track.ENDING_GUARDRAIL_START_HEIGHT);
			});

			it('should set endingGuardRail.endingHeight to the default ', () => {
				expect(track.endingGuardRail.endingHeight).to.equal(Track.ENDING_GUARDRAIL_END_HEIGHT);
			});

			it('should set trackWidth to the default ', () => {
				expect(track.trackWidth).to.equal(Track.TRACK_WIDTH);
			});
		});
	});

});




















