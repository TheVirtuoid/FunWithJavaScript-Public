import Extractor from "./Extractor.js";

export default new Map([
	[Extractor.AETHERITE,
		{ base: { speed: 2000, purity: .1, cost: 50 } },
		{ 1: { speed: 1800, purity: .25, cost: 200 } },
		{ 2: { speed: 1500, purity: .45, cost: 350 } },
		{ 3: { speed: 1200, purity: .65, cost: 500 } },
		{ 4: { speed: 900, purity: .85, cost: 800 } },
		{ 5: { speed: 700, purity: 1, cost: 1300 } }
	]
]);