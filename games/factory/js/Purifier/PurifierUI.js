export default class PurifierUI {

	static Preload = (scene) => {
		scene.load.image('purifier-aetherite', 'img/purifier-aetherite.png');
		scene.load.image('purifier-luminite', 'img/purifier-luminite.png');
		scene.load.image('purifier-obsidianite', 'img/purifier-obsidianite.png');
		scene.load.image('purifier-pyrotite', 'img/purifier-pyrotite.png');
		scene.load.image('purifier-zenithite', 'img/purifier-zenithite.png');
	}

	constructor(purifier) {
	}
}