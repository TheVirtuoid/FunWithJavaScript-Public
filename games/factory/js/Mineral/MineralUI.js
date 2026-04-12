import Mineral from "./Mineral.js";
import Utilities from "../Utilities/Utilities.js";
import World from "../World/World.js";

export default class MineralUI {

	static DEPOSIT_COLORS = new Map([
		[Mineral.AETHERITE, 0xff0000],
		[Mineral.LUMINITE, 0x198028],
		[Mineral.PYROTITE, 0x24249a],
		[Mineral.OBSIDIANITE, 0xfff401],
		[Mineral.ZENITHITE, 0x000000],
	]);

	static DEPOSIT_ALPHA = 0.5;
	static DEPOSIT_RADIUS = 24;

	static GetOreParentTexture(oreParent, mineral) {
		if (oreParent === Mineral.ORE_PARENT_EXTRACTOR) {
			return mineral.oreTexture;
		} else if (oreParent === Mineral.ORE_PARENT_PURIFIER) {
			return mineral.pureTexture;
		}
	}


	#scene;

	constructor(scene) {
		this.#scene = scene;
	}

	createMineral(type, purity) {
		return new Mineral({
			type,
			purity,
			oreTexture: `ore-${type.description}`,
			pureTexture: `pure-${type.description}`,
			depositTexture: `deposit-${type.description}`
		});
	}

	createOreImage(mineral, position, oreParent = Mineral.ORE_PARENT_EXTRACTOR) {
		const worldPosition = Utilities.GridToPosition(position);
		mineral.setOreImage(this.#scene.add.image(worldPosition.x, worldPosition.y, MineralUI.GetOreParentTexture(oreParent, mineral)));
		mineral.oreImage.setDepth(10000);
	}

	preload() {
		const createCircleTexture = (scene, mineral) => {
			const g = scene.make.graphics({ x: 0, y: 0, add: false });
			g.fillStyle(MineralUI.DEPOSIT_COLORS.get(mineral), MineralUI.DEPOSIT_ALPHA);
			g.fillCircle(World.UNIT_HALF_SIZE, World.UNIT_HALF_SIZE, MineralUI.DEPOSIT_RADIUS);
			g.generateTexture(`deposit-${mineral.description}`, World.UNIT_SIZE, World.UNIT_SIZE);
			g.destroy();
		};

		Mineral.TYPES.forEach(mineral => {
			const ore = `ore-${mineral.description}`;
			this.#scene.load.image(ore, `img/${ore}.png`);
			const pure = `pure-${mineral.description}`;
			this.#scene.load.image(pure, `img/${pure}.png`);
			createCircleTexture(this.#scene, mineral);
		});
	}


}