const errorIncubatorOffline = new Error(`Incubator off-line.`);
const errorLowPower = new Error(`Low power detected.`);
const errorFeedClogged	= new Error(`Feed tube clogged.`);

const createAnimal = () => {
	const errors = [];
	if (Math.random() < 0.5) {
		errors.push(errorIncubatorOffline);
	}
	if (Math.random() < 0.3) {
		errors.push(errorLowPower);
	}
	if (Math.random() < 0.4) {
		errors.push(errorFeedClogged);
	}
	if (errors.length > 0) {
		throw new AggregateError(errors, 'Could not create the animal.');
	} else {
		console.log('\n\n*** New Animal Created! ***');
	}
}

try {
	createAnimal();
} catch (err) {
	const errorCount = err.errors.length;
	console.log(`\n\n--------Error: ${err.message} (${errorCount} error${errorCount > 1 ? 's' : ''})--------`);
	err.errors.forEach((error, index) => {
		console.log(`   Error ${index + 1}: ${error.message}`);
	});
}
console.log('\n\n');
