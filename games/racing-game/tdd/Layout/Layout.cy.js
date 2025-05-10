import Layout from "../../src/classes/Layout/Layout.js";
import Track from "../../src/classes/Track/Track.js";

describe('When I work with the Layout class', () => {
	it('should initialize the class', () => {
		const layout = new Layout();
		expect(layout).to.be.instanceOf(Layout);
	});
	it('should have a id property', () => {
		const layout = new Layout();
		expect(layout.id).to.be.a('string');
	});

	it('should allow me to set the tracks property upon initialization', () => {
		const track1 = new Track({ id: 'test1', type: Track.ANCHOR });
		const track2 = new Track({ id: 'test2', type: Track.STRAIGHT });
		const track3 = new Track({ id: 'test3', type: Track.ANCHOR });
		const tracks = [track1, track2, track3];
		const layout = new Layout({ tracks });
		expect(layout.getSize()).to.equal(3);
		expect(layout.getTrack('test1')).to.equal(track1);
		expect(layout.getTrack('test2')).to.equal(track2);
		expect(layout.getTrack('test3')).to.equal(track3);
	});

	it('should throw an error if the tracks property is not an array', () => {
		expect(() => {
			new Layout({ tracks: 'not an array' });
		}).to.throw('Layout constructor: tracks must be an array');
	});

	it('should throw an error if the tracks property does not contain all Track objects', () => {
		expect(() => {
			new Layout({ tracks: [new Track({ id: 'test1', type: Track.STRAIGHT }), 'not a track'] });
		}).to.throw('Layout constructor: all elements in tracks must be instances of Track');
	});

	it('should throw an error if tracks is defined, and the first and last element are not Anchors', () => {
		const track1 = new Track({ id: 'test1', type: Track.STRAIGHT });
		const track2 = new Track({ id: 'test2', type: Track.STRAIGHT });
		const track3 = new Track({ id: 'test3', type: Track.ANCHOR });
		expect(() => {
			new Layout({ tracks: [track1, track2, track3] });
		}).to.throw('Layout constructor: tracks property must begin with an Anchor track');
		expect(() => {
			new Layout({ tracks: [track3, track1, track2] });
		}).to.throw('Layout constructor: tracks property must end with an Anchor track');
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
			const track = new Track({id: 'test', type: Track.ANCHOR });
			layout.addTrack(track);
			expect(layout.getTrack('test')).to.equal(track);
		});

		it('should throw an error when first track added is not an Anchor track', () => {
			expect(() => {
				layout.addTrack(new Track({ id: 'test', type: Track.STRAIGHT }));
			}).to.throw('Layout.addTrack(): First track added must be an Anchor');
		});

		it('should add a two tracks to the successfully', () => {
			const track = new Track({id: 'test', type: Track.ANCHOR });
			const trackTest = new Track({ id: 'test1', type: Track.STRAIGHT });
			layout.addTrack(track);
			layout.addTrack(trackTest);
			expect(layout.getTrack('test1')).to.equal(trackTest);
		});

		it('should throw an error when adding a track that is not a Track object', () => {
			expect(() => {
				layout.addTrack('not a track');
			}).to.throw('Layout.addTrack(): Argument must be an instance of Track');
		});

		it('should remove a track from the layout', () => {
			layout.addTrack(new Track({ id: 'anchor', type: Track.ANCHOR }));
			const track = new Track({id: 'test', type: Track.STRAIGHT });
			layout.addTrack(track);
			const removedTrack = layout.removeTrack(track);
			expect(layout.getTrack('test')).to.not.equal(track);
			expect(removedTrack).to.equal(track);
		});

		it('should return undefined if track cannot be found', () => {
			layout.addTrack(new Track({ id: 'anchor', type: Track.ANCHOR }));
			const track = new Track({id: 'test', type: Track.STRAIGHT });
			const removedTrack = layout.removeTrack(track);
			expect(removedTrack).to.be.undefined;
		});

		it('should remove a track from the layout when specifying id', () => {
			layout.addTrack(new Track({ id: 'anchor', type: Track.ANCHOR }));
			const track = new Track({id: 'test', type: Track.STRAIGHT });
			layout.addTrack(track);
			const removedTrack = layout.removeTrackById('test');
			expect(layout.getTrack('test')).to.not.equal(track);
			expect(removedTrack).to.equal(track);
		});

		it('should return undefined if track cannot be found when specifying id', () => {
			const removedTrack = layout.removeTrackById('nothing here');
			expect(removedTrack).to.be.undefined;
		});

		it('should clear a layout', () => {
			layout.addTrack(new Track({ id: 'anchor', type: Track.ANCHOR }));
			const track = new Track({id: 'test', type: Track.STRAIGHT });
			layout.addTrack(track);
			layout.clear();
			expect(layout.getSize()).to.equal(0);
		});
	});

	describe('And when I work with tracks, make sure the starting/ending positions are correct', () => {
		let startAnchor;
		let straight;
		let curve;
		let endAnchor;

		const comparePositions = (position1, position2) => {
			return position1.x === position2.x && position1.y === position2.y && position1.z === position2.z;
		}

		beforeEach(() => {
			startAnchor = new Track({ id: 'start', type: Track.ANCHOR, attributes: { startingPosition: { x: 0, y: 0, z: 0 } } });
			straight = new Track({ id: 'straight', type: Track.STRAIGHT, attributes: { endingPosition: { x: 10, y: 10, z: 10 } } });
			curve = new Track({ id: 'curve', type: Track.CURVE, attributes: { endingPosition: { x: 20, y: 20, z: 20 } } });
			endAnchor = new Track({ id: 'end', type: Track.ANCHOR });
		});

		it('should set all the correct positions when passed an array of tracks', () => {
			const layout = new Layout({ tracks: [startAnchor, straight, curve, endAnchor] });
			expect(comparePositions(startAnchor.endingPosition, startAnchor.endingPosition)).to.be.true;
			expect(comparePositions(startAnchor.endingPosition, straight.startingPosition)).to.be.true;
			expect(comparePositions(straight.endingPosition, curve.startingPosition)).to.be.true;
			expect(comparePositions(curve.endingPosition, endAnchor.startingPosition)).to.be.true;
			expect(endAnchor.endingPosition).to.be.null;
		});

		it('should set the ending position of the first anchor', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			expect(comparePositions(startAnchor.endingPosition, startAnchor.endingPosition)).to.be.true;
		});

		it('should set the starting position of the second track', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			expect(comparePositions(startAnchor.endingPosition, straight.startingPosition)).to.be.true;
		});

		it('should set the starting position of the third track', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			layout.addTrack(curve);
			expect(comparePositions(straight.endingPosition, curve.startingPosition)).to.be.true;
		});

		it('should set the starting position of the last anchor', () => {
			const layout = new Layout();
			layout.addTrack(startAnchor);
			layout.addTrack(straight);
			layout.addTrack(curve);
			layout.addTrack(endAnchor);
			expect(comparePositions(curve.endingPosition, endAnchor.startingPosition)).to.be.true;
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
			expect(comparePositions(startAnchor.endingPosition, curve.startingPosition)).to.be.true;
		});
	});
});