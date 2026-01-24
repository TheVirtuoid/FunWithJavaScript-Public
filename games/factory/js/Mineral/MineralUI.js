import Mineral from "./Mineral.js";

export default class MineralUI {

	static Preload = (scene) => {

		const createCircleTexture = (scene, key, color, alpha) => {
			const g = scene.make.graphics({ x: 0, y: 0, add: false });
			g.fillStyle(color, alpha);
			g.fillCircle(32, 32, 24);
			g.generateTexture(key, 64, 64);
			g.destroy();
		};

		createCircleTexture(scene, Mineral.AETHERITE.description, 0xff0000, 0.50);
		createCircleTexture(scene, Mineral.LUMINITE.description, 0x198028, 0.5);
		createCircleTexture(scene, Mineral.PYROTITE.description, 0x24249a, 0.5);
		createCircleTexture(scene, Mineral.OBSIDIANITE.description, 0xfff401, 0.5);
		createCircleTexture(scene, Mineral.ZENITHITE.description, 0x000000, 0.5);

		Mineral.TYPES.forEach(mineral => {
			const ore = `ore-${mineral.description}`;
			scene.load.image(ore, `img/${ore}.png`);
			const pure = `pure-${mineral.description}`;
			scene.load.image(pure, `img/${pure}.png`);
		});

	}


	constructor(mineral) {
	}
}