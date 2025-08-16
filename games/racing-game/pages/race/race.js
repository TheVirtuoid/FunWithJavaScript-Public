import {setButtons} from "../buttons.js";
import Ui from "../../src/classes/Ui/Ui.js";
import Ground from "./Ground.js";
import GameData from "../../src/classes/databases/GameData/GameData.js";
import VenueDb from "../../src/classes/databases/VenueDb/VenueDb.js";
import venues from "../../databases/venues.json";
import LayoutRenderer from "./LayoutRenderer.js";
import CarDb from "../../src/classes/databases/CarDb/CarDb.js";
import cars from './../../databases/cars.json';
import CarRenderer from "./CarRenderer.js";
import RacingLights from "./RacingLights.js";
import RaceTime from "./RaceTime.js";
import RaceResults from "./RaceResults.js";
import Sounds from "./Sounds.js";

export default class Race {
	static TRACKWIDTH = 6;
	#gameData;

	#venue;

	#engine;
	#scene;
	#canvas;
	#camera;
	#ui;
	#light;

	#ground;
	#layoutRenderer;
	#carRenderer;
	#startingPosition;
	#racingLights;
	#raceResults;

	#id = 'race';
	#raceTime;
	#orderOfFinish = [];
	#sounds;

	#startLine;
	#finishLine;

	constructor() {
		setButtons(['back', 'exit']);
		VenueDb.setDatabase(JSON.stringify(venues));
		CarDb.setDatabase(JSON.stringify(cars));
		this.#canvas = document.getElementById('world');
		this.#ui = new Ui({
			canvas: this.#canvas,
			name: 'FWJS'
		});
		this.#gameData = new GameData();
		this.#layoutRenderer = new LayoutRenderer({
			id: this.id,
			trackWidth: Race.TRACKWIDTH
		});
		this.#venue = VenueDb.getVenueById(this.#gameData.selectedVenue);
		this.#layoutRenderer.buildLayout(this.#venue.layout);
		this.#startingPosition = this.#layoutRenderer.startingPosition;

		this.#ground = new Ground(this.id);
		this.#carRenderer = new CarRenderer({
			id: this.id,
			startingVectorDirection: this.#layoutRenderer.startingLine
		});
		this.#carRenderer.buildCars(this.#gameData.selectedCars, this.#startingPosition);

		this.#sounds = new Sounds();
		this.#racingLights = new RacingLights('starting-lights', this.#sounds);

		this.#raceTime = new RaceTime('race-time');
		this.#raceResults = new RaceResults('race-results');
		this.start();
	}

	get id() {
		return this.#id;
	}

	start() {
		this.#initialize()
			.then(this.#render.bind(this));
	}

	async #initialize() {
		const width = document.body.offsetWidth * .8;
		const height = width / 16 * 9;
		this.#canvas.width = width;
		this.#canvas.height = height;
		this.#engine = Ui.CreateEngine();
		this.#scene = Ui.CreateScene();
		this.#layoutRenderer.scene = this.#scene;
		this.#carRenderer.scene = this.#scene;
		const { x: spx, y: spy, z: spz } = this.#startingPosition;
		this.#camera = Ui.CreateCamera({
			position: {x: spx + 3, y: spy + 20, z: spz - 10},
			target: {x: spx + 3, y: spy, z: spz + 10}
		});
		this.#light = Ui.CreateLight({ position: { x: -1, y: 1, z: 0 } });
		await Ui.LoadPhysics();

		await this.#ground.render();

		await this.#layoutRenderer.render();

		await this.#carRenderer.render(this.#layoutRenderer.startingLine.track.startingDirectionVector);

		this.#startLine = this.#layoutRenderer.startingLine;

		this.#finishLine = this.#layoutRenderer.finishLine;
		// this.#finishLine.setFinishLineMeshes(this.#carRenderer.renderedCars.map((car) => car.chassis));
		this.#finishLine.setFinishLineMeshes(this.#carRenderer.renderedCars.map((car) => car.collisionBox));
	}

	#render() {
		this.#racingLights.start(this.#sounds)
			.then(() => {
				this.#startLine.lowerBars();
				this.#raceTime.start();
			});
		let place = 1;
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
			this.#raceTime.show();
			const carCollisionBox = this.#finishLine.checkForFinish();
			if (carCollisionBox) {
				const car = this.#carRenderer.getCarByCollisionBox(carCollisionBox);
				this.#raceResults.addRow(car, place, this.#raceTime.getTime().output);
				this.#orderOfFinish.push(carCollisionBox);
				place++;
				if (place > 4) {
					this.#raceTime.stop();
					this.#sounds.fadeOut(Sounds.CAR_RACING, 4000);
				}
			}
		});
	}


}