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

export default class Race {
	static TRACKWIDTH = 6;
	#gameData;

	#venue;
	#cars;

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

	#id = 'race';

	constructor() {
		setButtons(['back', 'exit']);
		VenueDb.setDatabase(JSON.stringify(venues));
		CarDb.setDatabase(JSON.stringify(cars));
		this.#gameData = new GameData();
		this.#layoutRenderer = new LayoutRenderer({
			id: this.id,
			trackWidth: Race.TRACKWIDTH
		});
		this.#carRenderer = new CarRenderer({
			id: this.id
		});
		this.#venue = VenueDb.getVenueById(this.#gameData.selectedVenue);
		this.#layoutRenderer.buildLayout(this.#venue.layout);
		this.#startingPosition = this.#layoutRenderer.startingPosition;
		this.#carRenderer.buildCars(this.#gameData.selectedCars, this.#startingPosition);
		this.#canvas = document.getElementById('world');
		this.#ui = new Ui({
			canvas: this.#canvas,
			name: 'FWJS'
		});
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
			position: {x: spx, y: spy + 20, z: spz - 10},
			target: {x: spx, y: spy, z: spz}
		});
		this.#light = Ui.CreateLight({ position: { x: -1, y: 1, z: 0 } });
		await Ui.LoadPhysics();

		this.#ground = new Ground(this.id);
		this.#ground.render();

		this.#layoutRenderer.render();

		this.#carRenderer.render();

	}

	#render() {
		this.#engine.runRenderLoop(() => {
			this.#scene.render();
		});
	}


}