import Mineral from "./Mineral.js";
import Utilities from "../Utilities/Utilities.js";

export default class MineralUI {


	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createMineral(type) {
		const mineral = new Mineral({ type });
		mineral.setOreImage(this.#scene.textures.get(`ore-${type.description}`));
		mineral.setPureImage(this.#scene.textures.get(`pure-${type.description}`));
		return mineral;
	}

	createOreImage(mineral, position) {
		const worldPosition = Utilities.GridToPosition(position);
		mineral.setOreImage(this.#scene.add.image(worldPosition.x, worldPosition.y, `ore-${mineral.type.description}`));
		return mineral;
	}

	preload() {
		const createCircleTexture = (scene, key, color, alpha) => {
			const g = scene.make.graphics({ x: 0, y: 0, add: false });
			g.fillStyle(color, alpha);
			g.fillCircle(32, 32, 24);
			g.generateTexture(key, 64, 64);
			g.destroy();
		};

		createCircleTexture(this.#scene, Mineral.AETHERITE.description, 0xff0000, 0.50);
		createCircleTexture(this.#scene, Mineral.LUMINITE.description, 0x198028, 0.5);
		createCircleTexture(this.#scene, Mineral.PYROTITE.description, 0x24249a, 0.5);
		createCircleTexture(this.#scene, Mineral.OBSIDIANITE.description, 0xfff401, 0.5);
		createCircleTexture(this.#scene, Mineral.ZENITHITE.description, 0x000000, 0.5);

		Mineral.TYPES.forEach(mineral => {
			const ore = `ore-${mineral.description}`;
			this.#scene.load.image(ore, `img/${ore}.png`);
			const pure = `pure-${mineral.description}`;
			this.#scene.load.image(pure, `img/${pure}.png`);
		});
	}


}