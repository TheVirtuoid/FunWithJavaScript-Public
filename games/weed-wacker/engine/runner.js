import Rock from './Rock.js';

for (let i = 1; i <= 50; i++) {
	console.log(`\n\n LEVEL ${i}`);
	Rock.getRockSpawnChances(i);
}