export default class Router {
	#routes;
	#location;

	constructor(routes, locationSelector) {
		this.#routes = routes;
		this.#location = document.querySelector(locationSelector);
	}

	routeTo(page) {
		const route = this.#routes.get(page);
		const pageTemplate = route.template;
		const pageCode = route.code;
		const template = document.createElement('template');
		template.innerHTML = pageTemplate;
		this.#location.replaceChildren();
		this.#location.appendChild(template.content.cloneNode(true));
		new pageCode();
	}
}