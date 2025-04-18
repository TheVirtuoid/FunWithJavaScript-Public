describe('When I work with the Track class', () => {
	it('should return an instance of the class', () => {});

	describe('And when I work with the properties', () => {
		it('should have an id property', () => {});
		it('should have a name property', () => {});
		it('should have a description property', () => {});
		it('should have a type property', () => {});
		it('should have an attributes property', () => {});
	});

	describe('And when I work with the methods', () => {
		it('getType() should return the track based upon the type', () => {});
		it('getType() should return undefined if the type is not found', () => {});
	});

	describe('And when I work with the common attributes', () => {
		it('should have a startingPosition property', () => {});
		it('should have a startingDirectionVector property', () => {});
		it('should have an endingPosition property', () => {});
		it('should have an endingDirectionVector property', () => {});
	});

	describe('And when I work with type=straight attributes', () => {
		it('should have a length property', () => {});
		it('should have a contour property', () => {});
	});

	describe('And when I work with type=curve attributes', () => {
		it('should have a radius property', () => {});
		it('should have a degrees property', () => {});
		it('should have a depthDrop property', () => {});
		it('should have a curveDirection property', () => {});
	});

	describe('And when I work with the type=anchor attributes', () => {
		it('should have a beginningPosition property', () => {});
		it('should have a beginningDirectionVector property', () => {});
	});

	describe('And when I work with the type=startline attributes', () => {
		it('should not have any additional properties', () => {});
	});

	describe('And when I work with the type=finishline attributes', () => {
		it('should not have any additional properties', () => {});
	});

});