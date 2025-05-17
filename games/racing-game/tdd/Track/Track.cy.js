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
		let startingAnchor;
		let straight;
		let straightContour;
		let curve180Positive;
		let curve180Negative;
		let curve90Positive;
		let curve90Negative;
		let endingAnchor;
		let startLine;
		let finishLine;

		const radius = 50;
		const tolerance = 0.0001;

		const startingPosition = new V3(1, 1, 1);
		const startingDirectionVector = new V3(1, 0, 0);

		const inTolerance = (source, destination) => {
			const x = Math.abs(source.x - destination.x);
			const y = Math.abs(source.y - destination.y);
			const z = Math.abs(source.z - destination.z);
			return x < tolerance && y < tolerance && z < tolerance;
		}

		beforeEach(() => {
			startingAnchor = Track.CreateStartingAnchor({ startingPosition, startingDirectionVector});
			straight = Track.CreateStraight({length: 10});
			straightContour = Track.CreateStraight({
				length: 10,
				contour: {
					controlPoint1: new V3(0, .5, 0),
					controlPoint2: new V3(1, 1, 0)
				},
			});
			curve180Positive = Track.CreateCurve({radius, degrees: 180, curveDirection: Track.CURVE_DIRECTION_POSITIVE });
			curve180Negative = Track.CreateCurve({radius, degrees: 180, curveDirection: Track.CURVE_DIRECTION_NEGATIVE });
			curve90Positive = Track.CreateCurve({radius, degrees: 90, curveDirection: Track.CURVE_DIRECTION_POSITIVE });
			curve90Negative = Track.CreateCurve({radius, degrees: 90, curveDirection: Track.CURVE_DIRECTION_NEGATIVE });
			endingAnchor = Track.CreateEndingAnchor({});
			startLine = Track.CreateStartLine({});
			finishLine = Track.CreateFinishLine({});
		});

		it('should throw error if connectTo is not a Track', () => {
			expect(() => straight.connectTo('not a track')).to.throw('Track.connectTo(): Argument must be an instance of Track');
		});

		it('should have changed the startingPosition, endingPosition of the STRAIGHT', () => {
			straight.connectTo(startingAnchor);
			expect(straight.startingPosition.compareTo(startingAnchor.endingPosition)).to.be.true;
			expect(straight.startingDirectionVector.compareTo(startingAnchor.endingDirectionVector)).to.be.true;
			const endingX = startingAnchor.startingPosition.x + startingAnchor.length + straight.length;
			expect(straight.endingPosition.compareTo(new V3(endingX, 1, 1))).to.be.true;
			expect(straight.endingDirectionVector.compareTo(straight.startingDirectionVector)).to.be.true;
		});

		it('should have changed the startingPosition, endingPosition of the STARTLINE', () => {
			startLine.connectTo(startingAnchor);
			expect(startLine.startingPosition.compareTo(startingAnchor.endingPosition)).to.be.true;
			expect(startLine.startingDirectionVector.compareTo(startingAnchor.endingDirectionVector)).to.be.true;
			const endingX = startingAnchor.startingPosition.x + startingAnchor.length + startLine.length;
			expect(startLine.endingPosition.compareTo(new V3(endingX, 1, 1))).to.be.true;
			expect(startLine.endingDirectionVector.compareTo(startLine.startingDirectionVector)).to.be.true;
		});

		it('should have changed the startingPosition, endingPosition of the FINISHLINE', () => {
			finishLine.connectTo(startingAnchor);
			expect(finishLine.startingPosition.compareTo(startingAnchor.endingPosition)).to.be.true;
			expect(finishLine.startingDirectionVector.compareTo(startingAnchor.endingDirectionVector)).to.be.true;
			const endingX = startingAnchor.startingPosition.x + startingAnchor.length + finishLine.length;
			expect(finishLine.endingPosition.compareTo(new V3(endingX, 1, 1))).to.be.true;
			expect(finishLine.endingDirectionVector.compareTo(finishLine.startingDirectionVector)).to.be.true;
		});

		it('should have changed the startingPosition, endingPosition of the ENDINGANCHOR', () => {
			straight.connectTo(startingAnchor);
			endingAnchor.connectTo(straight);
			expect(endingAnchor.startingPosition.compareTo(straight.endingPosition)).to.be.true;
			expect(endingAnchor.startingDirectionVector.compareTo(straight.endingDirectionVector)).to.be.true;
			expect(endingAnchor.endingPosition).to.be.null
			expect(endingAnchor.endingDirectionVector).to.be.null;
		});

		it('should have changed the endingPosition of the STRAIGHT with contour', () => {
			straightContour.connectTo(startingAnchor);
			const endingX = startingAnchor.startingPosition.x + startingAnchor.length + straightContour.length;
			expect(straightContour.endingPosition.compareTo(new V3(endingX, 1, 1))).to.be.true;
			expect(straightContour.endingDirectionVector.x).to.be.closeTo(1, .1);
			expect(straightContour.endingDirectionVector.y).to.equal(0);
			expect(straightContour.endingDirectionVector.z).to.be.closeTo(0, .1);
		});

		describe('And when I work with CURVE', () => {
			it('should have changed the startingPosition, endingPosition of the CURVE180Positive', () => {
				curve180Positive.connectTo(startingAnchor);
				expect(curve180Positive.startingPosition.compareTo(startingAnchor.endingPosition)).to.be.true;
				expect(curve180Positive.startingDirectionVector.compareTo(startingAnchor.endingDirectionVector)).to.be.true;

				const { x: svx, y: svy, z: svz } = curve180Positive.startingDirectionVector;
				const { x: spx, y: spy, z: spz } = curve180Positive.startingPosition;
				const { x: evx, y: evy, z: evz } = curve180Positive.endingDirectionVector;
				const { x: epx, y: epy, z: epz } = curve180Positive.endingPosition;
				expect(evx).to.be.closeTo(svx * -1, tolerance);
				expect(evy).to.be.closeTo(svy, tolerance);
				expect(evz).to.be.closeTo(svz * -1, tolerance);

				const endingPosition = new V3(spx, spy, spz + 2 * curve180Positive.radius);
				expect(epx).to.be.closeTo(endingPosition.x, tolerance);
				expect(epy).to.be.closeTo(endingPosition.y, tolerance);
				expect(epz).to.be.closeTo(endingPosition.z, tolerance);
				const cp1 = new V3(spx + radius, spy, spz);
				const cp2 = new V3(spx + radius, spy, spz + radius * 2);
				const { controlPoint1, controlPoint2 } = curve180Positive.contour;
				expect(controlPoint1.x).to.be.closeTo(cp1.x, tolerance);
				expect(controlPoint1.y).to.be.closeTo(cp1.y, tolerance);
				expect(controlPoint1.z).to.be.closeTo(cp1.z, tolerance);
				expect(controlPoint2.x).to.be.closeTo(cp2.x, tolerance);
				expect(controlPoint2.y).to.be.closeTo(cp2.y, tolerance);
				expect(controlPoint2.z).to.be.closeTo(cp2.z, tolerance);
			});

			it('should have changed the startingPosition, endingPosition of the CURVE180Negative', () => {
				curve180Negative.connectTo(startingAnchor);
				expect(curve180Negative.startingPosition.compareTo(startingAnchor.endingPosition)).to.be.true;
				expect(curve180Negative.startingDirectionVector.compareTo(startingAnchor.endingDirectionVector)).to.be.true;

				const { x: svx, y: svy, z: svz } = curve180Negative.startingDirectionVector;
				const { x: spx, y: spy, z: spz } = curve180Negative.startingPosition;
				const { x: evx, y: evy, z: evz } = curve180Negative.endingDirectionVector;
				const { x: epx, y: epy, z: epz } = curve180Negative.endingPosition;
				expect(evx).to.be.closeTo(svx * -1, tolerance);
				expect(evy).to.be.closeTo(svy, tolerance);
				expect(evz).to.be.closeTo(svz * -1, tolerance);

				const endingPosition = new V3(spx, spy, spz - 2 * curve180Negative.radius);
				expect(epx).to.be.closeTo(endingPosition.x, tolerance);
				expect(epy).to.be.closeTo(endingPosition.y, tolerance);
				expect(epz).to.be.closeTo(endingPosition.z, tolerance);

				const cp1 = new V3(spx + radius, spy, spz);
				const cp2 = new V3(spx + radius, spy, spz - radius * 2);
				const { controlPoint1, controlPoint2 } = curve180Negative.contour;
				expect(controlPoint1.x).to.be.closeTo(cp1.x, tolerance);
				expect(controlPoint1.y).to.be.closeTo(cp1.y, tolerance);
				expect(controlPoint1.z).to.be.closeTo(cp1.z, tolerance);
				expect(controlPoint2.x).to.be.closeTo(cp2.x, tolerance);
				expect(controlPoint2.y).to.be.closeTo(cp2.y, tolerance);
				expect(controlPoint2.z).to.be.closeTo(cp2.z, tolerance);
			});

			it('should have changed the startingPosition, endingPosition of the CURVE90Positive', () => {
				curve90Positive.connectTo(startingAnchor);
				expect(curve90Positive.startingPosition.compareTo(startingAnchor.endingPosition)).to.be.true;
				expect(curve90Positive.startingDirectionVector.compareTo(startingAnchor.endingDirectionVector)).to.be.true;

				const { x: spx, y: spy, z: spz } = curve90Positive.startingPosition;

				const exp = curve90Positive.startingDirectionVector.perpendicular(V3.DIRECTION_POSITIVE);
				expect(inTolerance(curve90Positive.endingDirectionVector, exp)).to.be.true;

				const endingPosition = new V3(spx + radius, spy, spz + radius);
				expect(inTolerance(curve90Positive.endingPosition, endingPosition)).to.be.true;

				const cp1 = new V3(spx + radius / 2, spy, spz);
				const cp2 = new V3(spx + radius, spy, spz + radius / 2);
				const { controlPoint1, controlPoint2 } = curve90Positive.contour;
				expect(inTolerance(controlPoint1, cp1)).to.be.true;
				expect(inTolerance(controlPoint2, cp2)).to.be.true;
			});

			it('should have changed the startingPosition, endingPosition of the CURVE90Negative', () => {
				curve90Negative.connectTo(startingAnchor);
				expect(curve90Negative.startingPosition.compareTo(startingAnchor.endingPosition)).to.be.true;
				expect(curve90Negative.startingDirectionVector.compareTo(startingAnchor.endingDirectionVector)).to.be.true;

				const { x: spx, y: spy, z: spz } = curve90Negative.startingPosition;

				const exp = curve90Negative.startingDirectionVector.perpendicular(V3.DIRECTION_NEGATIVE);
				expect(inTolerance(curve90Negative.endingDirectionVector, exp)).to.be.true;

				const endingPosition = new V3(spx + radius, spy, spz - radius);
				expect(inTolerance(curve90Negative.endingPosition, endingPosition)).to.be.true;

				const cp1 = new V3(spx + radius / 2, spy, spz);
				const cp2 = new V3(spx + radius, spy, spz - radius / 2);
				const { controlPoint1, controlPoint2 } = curve90Negative.contour;
				expect(inTolerance(controlPoint1, cp1)).to.be.true;
				expect(inTolerance(controlPoint2, cp2)).to.be.true;
			});

		});
	});

	/*describe('And when I use the setEndPoints method', () => {
		const id = 'id';
		const length = 10;
		it('should throw error if startingPoints has not been set', () => {
			const track = Track.CreateStraight({ id, length });
			expect(() => track.setEndPoints()).to.throw();
		});
	});*/

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




















