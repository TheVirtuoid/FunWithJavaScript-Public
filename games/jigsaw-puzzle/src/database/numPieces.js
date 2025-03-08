import Position2d from "../classes/support/Position2d.js";

const numPieces = new Map([
	[8,
		{ name: '8', pieces: 8, id: '4affe6f4-1405-47de-8eaf-05a406cf432e', dimensions: new Position2d({ x: 4, y: 2 }) }
	],
	[16,
		{ name: '8', pieces: 16, id: 'f994da83-6d81-4067-a3b0-1faeb45fd9a4', dimensions: new Position2d({ x: 4, y: 4 }) }
	],
	[32,
		{ name: '8', pieces: 16, id: 'e5f4031a-897f-4241-ac4b-197a2166cf47', dimensions: new Position2d({ x: 8, y: 4 }) }
	],
])

export default numPieces;
