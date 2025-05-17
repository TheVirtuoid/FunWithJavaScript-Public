import Layout from "../../src/classes/Layout/Layout.js";
import Track from "../../src/classes/Track/Track.js";
import V3 from "../../src/classes/V3/V3.js";

describe('When I work with the Layout class', () => {
	const startingPosition = new V3(1, 1, 1);
	const startingDirectionVector = new V3(1, 0, 0);
	let startAnchor;
	let straight;
	let curve;
	let endAnchor;
	const startAnchorId = 'start-anchor';
	const straightId = 'straight';
	const curveId = 'curve';
	const endAnchorId = 'end-anchor';

	beforeEach(() => {
		startAnchor = Track.CreateStartingAnchor({ id: startAnchorId, startingPosition, startingDirectionVector });
		straight = Track.CreateStraight({ id: straightId, length: 10 });
		curve = Track.CreateCurve({ id: curveId, radius: 40, degrees: 90 });
		endAnchor = Track.CreateEndingAnchor({ id: endAnchorId });
	});

	it('should initialize the class', () => {
		const layout = new Layout();
		expect(layout).to.be.instanceOf(Layout);
	});
	it('should have a id property', () => {
		const layout = new Layout();
		expect(layout.id).to.be.a('string');
	});

	it('should allow me to set the tracks property upon initialization', () => {
		const tracks = [startAnchor, straight, endAnchor];
		const layout = new Layout({ tracks });
		expect(layout.getSize()).to.equal(3);
		expect(layout.getTrack(startAnchorId)).to.equal(startAnchor);
		expect(layout.getTrack(straightId)).to.equal(straight);
		expect(layout.getTrack(endAnchorId)).to.equal(endAnchor);
	});

	it('should throw an error if the tracks property is not an array', () => {
		expect(() => {
			new Layout({ tracks: 'not an array' });
		}).to.throw('Layout constructor: tracks must be an array');
	});

	it('should throw an error if the tracks property does not contain all Track objects', () => {
		expect(() => {
			new Layout({ tracks: [startAnchor, 'not a track'] });
		}).to.throw('Layout constructor: all elements in tracks must be instances of Track');
	});

	it('should throw an error if tracks is defined, and the first and last elements are not Anchors', () => {
		expect(() => {
			new Layout({ tracks: [straight, endAnchor] });
		}).to.throw('Layout constructor: tracks property must begin with a StartingAnchor track');
		expect(() => {
			new Layout({ tracks: [startAnchor, straight] });
		}).to.throw('Layout constructor: tracks property must end with an EndingAnchor track');
	});

	describe('And when I work with the methods', () => {
		let layout;

		beforeEach(() => {
			layout = new Layout();
		});

		// we don't test for a good 'getTrack()' because that was already done in checking initialization.
		it('should return undefined if we get a track that does not exist.', () => {
			expect(layout.getTrack('nothing here')).to.be.undefined;
		});

		it('should add a track to the layout', () => {
			layout.addTrack(startAnchor);
			expect(layout.getTrack(startAnchorId)).to.equal(startAnchor);
		});

		it('should throw an error when first track added is not a StartingAnchor track', () => {
			expect(() => {
				layout.addTrack(straight);
			}).to.throw('Layout.addTrack(): First track added must be an Anchor');
		});

		it('should add a two tracks to the successfully', () => {
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			expect(layout.getTrack(straightId)).to.equal(straight);
		});

		it('should throw an error when adding a track that is not a Track object', () => {
			expect(() => {
				layout.addTrack('not a track');
			}).to.throw('Layout.addTrack(): Argument must be an instance of Track');
		});

		it('should remove a track from the layout', () => {
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			const removedTrack = layout.removeTrack(straight);
			expect(layout.getTrack(straightId)).to.be.undefined;
			expect(removedTrack).to.equal(straight);
		});

		it('should return undefined if track cannot be found', () => {
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			const removedTrack = layout.removeTrack(curve);
			expect(removedTrack).to.be.undefined;
		});

		it('should remove a track from the layout when specifying id', () => {
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			layout.addTrack(curve);
			const removedTrack = layout.removeTrackById(straightId);
			expect(layout.getTrack(straightId)).to.be.undefined;
			expect(removedTrack).to.equal(straight);
		});

		it('should return undefined if track cannot be found when specifying id', () => {
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			const removedTrack = layout.removeTrackById(curveId);
			expect(removedTrack).to.be.undefined;
		});

		it('should clear a layout', () => {
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			layout.addTrack(curve);
			layout.addTrack(endAnchor);
			layout.clear();
			expect(layout.getSize()).to.equal(0);
		});
	});

	describe('And when I work with tracks, make sure the starting/ending positions are correct', () => {
		const comparePositions = (position1, position2) => {
			return position1.compareTo(position2);
		}

		it('should set all the correct positions when passed an array of tracks', () => {
			const layout = new Layout({ tracks: [startAnchor, straight, curve, endAnchor] });
			expect(straight.startingPosition.compareWithTolerance(startAnchor.endingPosition)).to.be.true;
			expect(curve.startingPosition.compareWithTolerance(straight.endingPosition)).to.be.true;
			expect(endAnchor.startingPosition.compareWithTolerance(curve.endingPosition)).to.be.true;
			expect(endAnchor.endingPosition).to.be.null;
		});

		it('should set the ending position of the first anchor', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			expect(startAnchor.endingPosition).not.to.be.null;
		});

		it('should set the starting position of the second track', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			expect(straight.startingPosition.compareWithTolerance(startAnchor.endingPosition)).to.be.true;
		});

		it('should set the starting position of the third track', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			layout.addTrack(curve);
			expect(curve.startingPosition.compareWithTolerance(straight.endingPosition)).to.be.true;
		});

		it('should set the starting position of the last anchor', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			layout.addTrack(curve);
			layout.addTrack(endAnchor);
			expect(endAnchor.startingPosition.compareWithTolerance(curve.endingPosition)).to.be.true;
		});

		it('should set the ending position of the last anchor to null', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			layout.addTrack(curve);
			layout.addTrack(endAnchor);
			expect(endAnchor.endingPosition).to.be.null;
		});

		it('should reset the starting position is a piece is removed', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			layout.addTrack(curve);
			layout.addTrack(endAnchor);
			layout.removeTrackById('straight');
			expect(curve.startingPosition.compareWithTolerance(startAnchor.endingPosition)).to.be.true;
			expect(endAnchor.startingPosition.compareWithTolerance(curve.endingPosition)).to.be.true;
		});
	});
});