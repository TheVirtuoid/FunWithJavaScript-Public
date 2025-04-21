import './css/racing-game.pcss';

document.getElementById('javascript-alive').textContent = 'And JavaScript is also alive!';

document.getElementById('hello-world').addEventListener('click', (e) => {
	document.getElementById('hello-world-text').classList.remove('hidden');
});