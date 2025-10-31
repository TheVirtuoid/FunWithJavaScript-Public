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

const deviceReference = Keyboard;
const vectorReference = Vector2d;
const deviceData = { layout: KeyboardLayout.LAYOUT_WASD };
const direction = Vector2d.Right();
const speed = 1;
const length = 3;
const position = new Vector2d(15, 15);

const game = new Game();
const pitch = new Pitch({ dimensions: new Vector2d(30, 30) });
const ui = new Ui({ uiName: 'html' });
const snake = new Snake({ position, direction, speed, length });
const input = new Input({ deviceReference, vectorReference, deviceData });

game.addPitch(pitch);
game.addUi(ui);
game.addInput(input);
game.addSnake(snake);

game.start();