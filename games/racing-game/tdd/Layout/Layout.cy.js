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
		const track1 = new Track({ id: 'test1', type: 'straight' });
		const track2 = new Track({ id: 'test2', type: 'straight' });
		const track3 = new Track({ id: 'test3', type: 'straight' });
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
			new Layout({ tracks: [new Track({ id: 'test1', type: 'straight' }), 'not a track'] });
		}).to.throw('Layout constructor: all elements in tracks must be instances of Track');
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
			const track = new Track({id: 'test', type: 'straight' });
			layout.addTrack(track);
			expect(layout.getTrack('test')).to.equal(track);
		});

		it('should throw an error when adding a track that is not a Track object', () => {
			expect(() => {
				layout.addTrack('not a track');
			}).to.throw('Layout.addTrack(): Argument must be an instance of Track');
		});

		it('should remove a track from the layout', () => {
			const track = new Track({id: 'test', type: 'straight' });
			layout.addTrack(track);
			const removedTrack = layout.removeTrack(track);
			expect(layout.getTrack('test')).to.not.equal(track);
			expect(removedTrack).to.equal(track);
		});

		it('should return undefined if track cannot be found', () => {
			const track = new Track({id: 'test', type: 'straight' });
			const removedTrack = layout.removeTrack(track);
			expect(removedTrack).to.be.undefined;
		});

		it('should remove a track from the layout when specifying id', () => {
			const track = new Track({id: 'test', type: 'straight' });
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
			const track = new Track({id: 'test', type: 'straight' });
			layout.addTrack(track);
			layout.clear();
			expect(layout.getSize()).to.equal(0);
		});
	});
});