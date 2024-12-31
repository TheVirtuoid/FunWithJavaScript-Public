const setCar = (name) => {
	return {
		name,
		raceTime: Math.random() * 5000,
		crash: Math.random() < 0.75 ? randomCrash(name) : null
	};
}

const randomCrash = (name) => {
	const type = Math.random();
	if (type < .25) {
		return new Error(`${name}: Engine Failure`);
	} else if (type < .5) {
		return new Error(`${name}: Brake Failure`);
	} else if (type < .75) {
		return new Error(`${name}: Tire Blowout`);
	} else {
		return new Error(`${name}: Transmission Failure`);
	}
}

const buildPromise = (car) => {
	return new Promise((resolve, reject) => {
		if (car.crash) {
			reject(car.crash);
		} else {
			setTimeout(() => resolve(car.name), car.raceTime);
		}
	});
}

const redCar = setCar('Red');
const blueCar = setCar('Blue');
const greenCar = setCar('Green');
const yellowCar = setCar('Yellow');

// console.log(redCar, blueCar, greenCar, yellowCar);

const redCarRace = buildPromise(redCar);
const blueCarRace = buildPromise(blueCar);
const greenCarRace = buildPromise(greenCar);
const yellowCarRace = buildPromise(yellowCar);

Promise.any([redCarRace, blueCarRace, greenCarRace, yellowCarRace])
	.then((winner) => console.log(`\n\nThe winner is: ${winner}\n\n`))
	.catch((err) => {
		console.log('\n\nNO WINNER!! Multiple issues:');
		err.errors.forEach((error) => console.log(`-> ${error.message}`));
	});