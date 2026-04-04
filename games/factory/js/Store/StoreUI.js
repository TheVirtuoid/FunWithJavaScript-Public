import Store from "./Store.js";
import Conveyor from "../Conveyor/Conveyor.js";
import Combinator from "../Combinator/Combinator.js";
import Purifier from "../Purifier/Purifier.js";
import Extractor from "../Extractor/Extractor.js";
import WorldData from "../WorldData/WorldData.js";
import GameEvent from "../GameEvent/GameEvent.js";
import Utilities from "../Utilities/Utilities.js";
import ConveyorUI from "../Conveyor/ConveyorUI.js";
import StoreSection from "./StoreSection/StoreSection.js";
import StoreSectionUI from "./StoreSection/StoreSectionUI.js";
import ExtractorUI from "../Extractor/ExtractorUI.js";
import CombinatorUI from "../Combinator/CombinatorUI.js";
import PurifierUI from "../Purifier/PurifierUI.js";

export default class StoreUI {

	#scene;
	#store;
	#dom;
	#storeSectionUI;
	#eventHandlerId;

	#buildings = new Map([
		[Conveyor.NAME, ConveyorUI],
		[Extractor.NAME, ExtractorUI],
		[Purifier.NAME, PurifierUI],
		[Combinator.NAME, CombinatorUI]
	]);

	#stores = new Map();

	constructor(scene) {
		this.#scene = scene;
		this.#storeSectionUI = new Map();
		this.#eventHandlerId = window.crypto.randomUUID();
	}

	preload() {
		this.#buildings.forEach((builderClass) => {
			const builder = new builderClass(this.#scene);
			builder.preload();
		});
	}

	create() {
		this.#dom = document.querySelector('#store');
		Store.STORES.forEach(storeData => {
			this.#storeSectionUI.set(storeData.name, new StoreSectionUI({
				dom: this.#dom,
				name: storeData.name,
				buildingClass: this.#buildings.get(storeData.name),
				scene: this.#scene
			}));
		});
	}

	start(store) {
		this.#store = store;
		this.#storeSectionUI.forEach((storeSectionUI) => {
			const storeSection = store.getStoreSection(storeSectionUI.name);
			storeSectionUI.build(storeSectionUI.name, storeSection);
		});
		this.#store.setCallback(this.#eventHandlerId, this.#eventCallback.bind(this));
	}

	#eventCallback(event) {
		if (event.type === GameEvent.STORE_UPDATE_CASH) {
			this.#disablePurchases(event.data);
		}
	}


	#disablePurchases(availableCash) {
		this.#storeSectionUI.forEach((storeSectionUI) => {
			storeSectionUI.setDisabled(availableCash);
		});
	}

	/*#purchase(event) {
		if (event.target.tagName === 'BUTTON') {
			const description = event.target.closest('li').dataset.key;
			const item = this.getInventory(description);
			const amount = item.cost;
			if (amount <= this.#cash) {
				const newCost = this.purchaseBuilding(description);
				event.target.textContent = Utilities.FormatShortNumber(newCost);
				event.target.title = `Total cost: ${newCost}`;
				const symbol = [...WorldData.BUILDING_SYMBOLS].find(entry => entry[0] === description)[1];
				GameEvent.Emit(GameEvent.INVENTORY_ADD, { symbol, number: 1 });
				GameEvent.Emit(GameEvent.STAT_CASH, -amount);
			}
		}
	}*/
}