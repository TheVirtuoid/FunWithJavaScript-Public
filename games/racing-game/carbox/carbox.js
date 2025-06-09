import './carbox.pcss';
import App from "./app.js";

const app = new App();
const posX = document.getElementById('pos-x');
const posY = document.getElementById('pos-y');
const posZ = document.getElementById('pos-z');

document.getElementById('go').addEventListener('click', (e) => {
	console.log(app.car.parent.position);
});