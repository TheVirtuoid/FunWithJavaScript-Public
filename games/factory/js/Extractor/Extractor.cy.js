/*

1. Extractors
   - Can be leveled up to extract more minerals OR better minerals.
   - There are 5 types of extractors - one for each of the minerals
   - "Level" is the speed in which the mineral is extracted.
   - An Extractor has only one output for the minerals.
   - Produces 'ore', which is the unpurified mineral.
   - The extractor footprint is one square.

 */

import Extractor from './Extractor';
import Vector2d from "../Vector/Vector2d/Vector2d.js";
import Mineral from "../Mineral/Mineral.js";

describe('Extractor Class', () => {

	describe('Static Methods', () => {
		it('should have the database functions', () => {
			expect(Extractor.Cost).to.be.a('function');
			expect(Extractor.Speed).to.be.a('function');
		});
	});

	describe('constructor', () => {
		it('should throw error if type is not specified', () => {
			expect(() => new Extractor()).to.throw();
		});

		it('should throw error if type is invalid', () => {
			expect(() => new Extractor({type: 'bad' })).to.throw();
		});

		it('should create the instance with the specified type and the defaults', () => {
			const extractor = new Extractor({ type: Mineral.AETHERITE });
			expect(extractor.type).to.equal(Mineral.AETHERITE);
			expect(extractor.level).to.equal(1);
			expect(extractor.position).to.be.instanceOf(Vector2d);
			expect(extractor.speed).to.equal(Extractor.Speed(Mineral.AETHERITE));
			expect(extractor.id).to.be.a('string');
		});
	});

	describe('Methods', () => {
		let extractor;
		beforeEach(() => {
			extractor = new Extractor({ type: Mineral.AETHERITE });
		});

		it('should sell the machine', () => {
			expect(extractor.sell()).to.be.a('number');
		});

		it('should throw exception if setPosition is not sent a Vector2d', () => {
			expect(() => extractor.setPosition('bad')).to.throw();
		});

		it('should set the position', () => {
			const newPosition = new Vector2d(1, 1);
			extractor.setPosition(newPosition);
			expect(extractor.position.equals(newPosition)).to.be.true;
		})
	});

	describe('Properties', () => {
		let extractor;
		beforeEach(() => {
			extractor = new Extractor({ type: Mineral.AETHERITE });
		});

		it('should throw error if trying to change id', () => {
			expect(() => extractor.id = 'newId').to.throw();
		});
		it('should throw error if trying to change level', () => {
			expect(() => extractor.level = 2).to.throw();
		});
		it('should throw error if trying to change position', () => {
			expect(() => extractor.position = new Vector2d(1, 1)).to.throw();
		});
		it('should throw error if trying to change speed', () => {
			expect(() => extractor.speed = 2).to.throw();
		});
		it('should throw error if trying to change type', () => {
			expect(() => extractor.type = Mineral.PYROTITE).to.throw();
		});

	});

	describe('Events', () => {});
});
