import Device from "./Device.js";
import {MockVector} from "../../../tdd-utilities/tddUtilities.js";

describe('Device', () => {
	describe('Constructor', () => {
		it('should create a Device instance with required vector parameter', () => {
			const device = new Device({ vectorReference: MockVector });

			expect(device).to.exist;
			expect(device.vectorReference).to.equal(MockVector);
		});

		it('should generate a default UUID for id when not provided', () => {
			const device = new Device({ vectorReference: MockVector });

			expect(device.id).to.exist;
		});

		it('should use provided id when specified', () => {
			const customId = 'custom-device-123';
			const device = new Device({ id: customId, vectorReference: MockVector });

			expect(device.id).to.equal(customId);
		});

		it('should throw error when vector parameter is missing', () => {
			expect(() => new Device({})).to.throw();
		});
	});

	describe('Properties', () => {
		let device;

		beforeEach(() => {
			device = new Device({ id: 'test-device', vectorReference: MockVector });
		});

		it('should have read-only id property', () => {
			expect(() => device.id = 'modified-id').to.throw();
		});

		it('should have read-only vector property', () => {
			expect(() => device.vectorReference = null).to.throw();
		});
	});
});