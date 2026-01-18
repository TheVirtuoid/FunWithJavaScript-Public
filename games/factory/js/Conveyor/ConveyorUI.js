export default class ConveyorUI {

	static Preload = (scene) => {
		scene.load.image('conveyor-straight', 'img/conveyor-straight.png');
		scene.load.image('conveyor-curve-left', 'img/conveyor-curve-left.png');
		scene.load.image('conveyor-curve-right', 'img/conveyor-curve-right.png');
		scene.load.image('conveyor-t-intersection-left', 'img/conveyor-t-intersection-left.png');
		scene.load.image('conveyor-t-intersection-right', 'img/conveyor-t-intersection-right.png');
		scene.load.image('conveyor-x-intersection', 'img/conveyor-x-intersection.png');
		scene.load.image('distribution-center', 'img/distribution-center.png');
	};


	constructor(conveyor) {

	}
}