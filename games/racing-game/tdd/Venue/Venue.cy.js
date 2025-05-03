import LayoutData from "../../src/classes/databases/LayoutDb/LayoutData.js";
import LayoutDb from "../../src/classes/databases/LayoutDb/LayoutDb.js";
import layoutData from '../support/layout-data.json';
import Layout from "../../src/classes/Layout/Layout.js";
import Track from "../../src/classes/Track/Track.js";
LayoutDb.setDatabase(JSON.stringify(layoutData));

describe('When I work with the Layout class', () => {
	let layout;
	beforeEach(() => {
		layout = new Layout();
	});

	it('should initialize the class', () => {
		expect(layout).to.be.instanceOf(Layout);
	});

	describe('And when I work with the properties', () => {
		it('should have a id property', () => {
			expect(layout.id).to.be.a('string');
		});

		it('should have a name property', () => {
			expect(layout.name).to.be.a('string');
		});

		it('should have a description property', () => {
			expect(layout.description).to.be.a('string');
		});

		it('should have a layoutId property', () => {
			expect(layout.layoutId).to.be.a('string');
		});

		it('should have a layout property', () => {
			expect(layout.layout).to.be.null;
		});

		it('should allow me to set the properties upon initialization', () => {
			const id = 'layout-one';
			const name = 'name';
			const description = 'description';
			const layoutId = 'layout-one';
			const layout = new Layout({ id, name, description, layoutId });
			expect(layout.id).to.equal(id);
			expect(layout.name).to.equal(name);
			expect(layout.description).to.equal(description);
			expect(layout.layoutId).to.equal(layoutId);
			expect(layout.layout).to.be.null;
		})
	});

	describe('And when I work with the methods', () => {
		let layout;

		beforeEach(() => {
			const id = 'id';
			const name = 'name';
			const description = 'description';
			const layoutId = 'layout-one';
			layout = new Layout({id, name, description, layoutId});
		});
		it('getLayout() should get the layout by layoutId', () => {
			const newLayout = layout.getLayout();
			expect(newLayout).to.be.instanceOf(LayoutData);
			expect(layout.layout).to.equal(newLayout);
		});
		it('getLayout() should get the layout by layoutId when an ID is passed', () => {
			const newLayoutId = 'layout-two';
			const newLayout = layout.getLayout(newLayoutId);
			expect(newLayout).to.be.instanceOf(LayoutData);
			expect(layout.layoutId).to.equal(newLayoutId);
			expect(layout.layout).to.equal(newLayout);
		});
		it('getLayout() should return undefined if the layout id is not found', () => {
			const newLayout = layout.getLayout('bad');
			expect(newLayout).to.be.undefined;
			expect(layout.layout).to.be.null;
		});

		describe('And when I work with adding/removing tracks from the layout', () => {
			beforeEach(()=> {
				layout.getLayout();
			});

			it('should add a track to the layout', () => {
				const track = new Track({id: 'test', type: 'straight' });
				layout.addTrack(track);
				expect(layout.layout.tracks).to.include(track);
			});
			it('should remove a track from the layout', () => {
				const trackId = 'track-one';
				layout.addTrack(trackId);
				expect(layout.layout.tracks).to.include(trackId);
				layout.removeTrack(trackId);
				expect(layout.layout.tracks).to.not.include(trackId);
			});
			it('should clear a layout', () => {});
			it('should throw an error if trying to add a track to a layout that is not found', () => {});
			it('should throw an error if trying to remove a track from a layout that is not found', () => {});
			it('should throw an error if trying to clear a layout that is not found', () => {});
			it('should find a track based upon id', () => {});
			it('should return undefined if the track cannot be found based upon id', () => {});
		});
	});
});