export default class ExtractorUI {

	static Preload = (scene) => {
		scene.load.image('extractor-aetherite', 'img/extractor-aetherite.png');
		scene.load.image('extractor-luminite', 'img/extractor-luminite.png');
		scene.load.image('extractor-obsidianite', 'img/extractor-obsidianite.png');
		scene.load.image('extractor-pyrotite', 'img/extractor-pyrotite.png');
		scene.load.image('extractor-zenithite', 'img/extractor-zenithite.png');
	}

	constructor(extractor) {
	}
}