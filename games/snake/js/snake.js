import '../css/common.pcss';
import '../css/index.pcss';

const inputSelectionGroup = document.getElementById('input-selection-group');
const uiSelectionGroup = document.getElementById('ui-selection-group');
const goButton = document.getElementById('go-button');

const uiMapping = new Map([
	['ui-html', 'ui-html.html'],
]);

let inputValue = '';
let uiValue = '';

localStorage.setItem('virtuoid-snake', JSON.stringify({inputValue, uiValue}))

const onInputSelectionChange = (event) => {
	if (event.isTrusted) {
		inputValue = event.target.value;
		changeGoButtonState();
	}
};

const onUiSelectionChange = (event) => {
	if (event.isTrusted) {
		uiValue = event.target.value;
		changeGoButtonState();
	}
}

const changeGoButtonState = () => {
	if (inputValue && uiValue) {
		goButton.removeAttribute('disabled');
	} else {
		goButton.setAttribute('disabled', '');
	}
}

const onGoButtonClick = (event) => {
	event.preventDefault();
	localStorage.setItem('virtuoid-snake', JSON.stringify({inputValue, uiValue}))
	const page = uiMapping.get(uiValue);
	window.location.href = page;
};

inputSelectionGroup.addEventListener('change', onInputSelectionChange);
uiSelectionGroup.addEventListener('change', onUiSelectionChange);
goButton.addEventListener('click', onGoButtonClick);


