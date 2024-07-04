export default class Table {
	#header;
	#data;

	#columns;

	constructor(args = {
		header: undefined,
		data: undefined
	}) {
		this.#header = args.header;
		this.#data = args.data;
		this.#format();
	}

	render() {
		let divider = '+';
		this.#columns.forEach((columnSize) => {
			divider = `${divider}${'-'.repeat(columnSize)}+`
		});

		let report = '';
		report = `${report}${divider}\n`;

		let header = '|';
		this.#header.forEach((headerText, index) => {
			header = `${header} ${headerText}${' '.repeat(this.#columns[index] - headerText.length - 1)}|`;
		});
		report = `${report}${header}\n`;

		report = `${report}${divider}\n`;

		this.#data.forEach((row) => {
			let rowText = '|';
			row.forEach((columnData, index) => {
				const columnText = columnData.toString();
				rowText = `${rowText} ${columnText}${' '.repeat(this.#columns[index] - columnText.length - 1)}|`;
			});
			report = `${report}${rowText}\n`;
		});

		report = `${report}${divider}\n`;

		console.log(report);

	}

	#format() {
		this.#columns = [];
		this.#header.forEach((headerText) => {
			this.#columns.push(headerText.length + 2);
		});
		this.#data.forEach((row) => {
			row.forEach((columnData, index) => {
				this.#columns[index] = Math.max(this.#columns[index], columnData.toString().length + 2);
			});
		});
	}

}