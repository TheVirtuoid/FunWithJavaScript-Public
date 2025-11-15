import '../css/common.pcss';
import '../css/snake-html.pcss';
import Game from "../snake-base/Game/Game.js";
import Pitch from "../snake-base/Pitch/Pitch.js";
import Vector2d from "../snake-base/Vector/Vector2d/Vector2d.js";
import Snake from "../snake-base/Snake/Snake.js";
import Ui from "../snake-ui/Ui/Ui.js";
import Input from "../snake-input/Input/Input.js";

import Keyboard from "../snake-input/devices/Keyboard/Keyboard.js";
import KeyboardLayout from "../snake-input/devices/Keyboard/KeyboardLayout/KeyboardLayout.js";
import Score from "../snake-base/Score/Score.js";
import Messages from "../snake-base/Messages/Messages.js";
import ActionButton from "../snake-ui/ActionButton/ActionButton.js";
import ActionButtons from "../snake-ui/ActionButtons/ActionButtons.js";

const inputTypes = new Map([
	['kb-wasd', KeyboardLayout.LAYOUT_WASD ],
	['kb-arrow', KeyboardLayout.LAYOUT_ARROW ]
]);
const { inputValue } = JSON.parse(localStorage.getItem('virtuoid-snake') || '{}');

const deviceReference = Keyboard;
const vectorReference = Vector2d;
const deviceData = { layout: inputTypes.get(inputValue) };
const direction = Vector2d.Right();
const speed = 1;
const length = 3;
const dimensions = new Vector2d(20, 20);
const position = new Vector2d(dimensions.x / 2, dimensions.y / 2);

const game = new Game();
const pitch = new Pitch({ dimensions });
const ui = new Ui({ uiName: 'html' });
const snake = new Snake({ position, direction, speed, length });
const input = new Input({ deviceReference, vectorReference, deviceData });
const score = new Score({ length });
const messages = new Messages();
const actionButtons = new ActionButtons();


const onTryAgainClick = () => {
	game.restart();
}
const onGoBackClick = () => {
	window.location.href = 'index.html';
}

const tryAgainButton = new ActionButton({
	label: 'Try Again',
	action: onTryAgainClick.bind(this),
	classList: ['primary', 'medium'],
	disabled: true,
	hidden: true
});

const goBackButton = new ActionButton({
	label: 'Go Back',
	action: onGoBackClick.bind(this),
	classList: ['secondary', 'medium'],
	disabled: true,
	hidden: true
});

actionButtons.addButton(tryAgainButton);
actionButtons.addButton(goBackButton);

game.addPitch(pitch);
game.addUi(ui);
game.addInput(input);
game.addSnake(snake);
game.addScore(score);
game.addMessages(messages);
game.addActionButtons(actionButtons);

game.start();