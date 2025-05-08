import Track from "../../src/classes/Track/Track.js";
import {Vector3} from "@babylonjs/core";
import TRack from "../../src/classes/Track/Track.js";

describe('When I create a Curve piece of track', () => {
	it('should create the curve piece', () => {
		const track = Track.CreateCurve({});
		expect(track).to.be.instanceOf(Track);
		expect(track.type).to.be.equal(Track.CURVE);
	});

	describe('And when I instantiate an empty piece', () => {
		let track;
		let radius = 10;
		let degrees = 90;
		let depthDrop = [1, 2, 3, 4];
		let curveDirection = 'left';
		beforeEach(() => {
			track = Track.CreateCurve({ radius, degrees, depthDrop, curveDirection });
		});

		it('should have a null starting position', () => {
			expect(track.startingPosition).to.be.null;
		});

		it('should have a null starting direction vector', () => {
			expect(track.startingDirectionVector).to.be.null;
		});

		it('should have a null ending position', () => {
			expect(track.endingPosition).to.be.null;
		});

		it('should have a null ending direction vector', () => {
			expect(track.endingDirectionVector).to.be.null;
		});

		it('should have a radius property', () => {
			expect(track.radius).to.equal(radius);
		});

		it('should have a degrees property', () => {
			expect(track.degrees).to.equal(degrees);
		});

		it('should have a depthDrop property', () => {
			expect(track.depthDrop).to.deep.equal(depthDrop);
		});

		it('should have a curveDirection property', () => {
			expect(track.curveDirection).to.equal(curveDirection);
		});
	});

	describe('And when I try to change the new properties', () => {
		let track;
		beforeEach(() => {
			track = Track.CreateCurve({});
		})

		it('should throw an error when trying to set the radius', () => {
			expect(() => track.radius = 20).to.throw();
		});

		it('should throw an error when trying to set the degrees', () => {
			expect(() => track.degrees = 20).to.throw();
		});

		it('should throw an error when trying to set the depthDrop', () => {
			expect(() => track.depthDrop = [1,2,3,4]).to.throw();
		});

		it('should throw an error when trying to set the curveDirection', () => {
			expect(() => track.curveDirection = 'right').to.throw();
		});
	});

	describe('And when I try to set invalid property values', () => {
		it('should throw error is degrees isn not 45, 90, 135, 180, 225, 270, 315, 360', () => {
			let track;
			track = Track.CreateCurve({degrees: 45});
			track = Track.CreateCurve({degrees: 90});
			track = Track.CreateCurve({degrees: 135});
			track = Track.CreateCurve({degrees: 180});
			track = Track.CreateCurve({degrees: 225});
			track = Track.CreateCurve({degrees: 270});
			track = Track.CreateCurve({degrees: 315});
			track = Track.CreateCurve({degrees: 360});
			expect(() => Track.CreateCurve({degrees: 100})).to.throw();
		});

		it('should throw error id depthDrop is not a valid array of numbers', () => {
			expect(() => Track.CreateCurve({depthDrop: [1, 2, 3, '4']})).to.throw();
			expect(() => Track.CreateCurve({depthDrop: 'bad'})).to.throw();
		});

		it('should throw error if curveDirection is not left or right', () => {
			let track;
			track = Track.CreateCurve({ curveDirection: 'left'});
			track = Track.CreateCurve({ curveDirection: 'right'});
			expect(() => Track.CreateCurve({curveDirection: 'up'})).to.throw();
		});


	});


});
