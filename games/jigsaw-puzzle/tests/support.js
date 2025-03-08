import Position2d from "../src/classes/support/Position2d.js";

const images = new Map([
	['beach', [
		{ url: '/images/beach-418742_1280.jpg', id: 'ac09e151-333f-48e8-ab87-e608c0d5bd7b', name: 'My Favorite Beach', category: 'beach' },
		{ url: '/images/beach-6292382_1280.jpg', id: '52fc4101-5ccc-498a-ae63-a477e4d95c52', name: 'My Stock Footage Beach', category: 'beach' }
	]],
	['landscape', [
		{ url: '/images/mountains-8451480_1280.jpg', id: '3c60a8c9-d8b1-44a4-a4b9-12c9582dd405', name: 'Some field somewhere', category: 'landscape' }
	]],
	['insects', [
		{ url: '/images/butterfly-7954767_1280.jpg', id: '39731510-00db-4db3-96fd-75b40440956d', name: 'Butterfly', category: 'insects' }
	]],
	['cities', [
		{ url: '/images/london-7965770_1280.jpg', id: '42f2883a-ef8b-475b-ae5c-86328efdfd2d', name: 'Jolly Ole London', category: 'cities' }
	]]
]);

let imagesLength = 0;
images.forEach((categoryImages) => {
	imagesLength += categoryImages.length;
});

const cuts = new Map([
	['square',
		{ name: 'Square', description: 'A square cut', url: '/images/cut-square.jpg', id: 'f06ef6b8-c7b2-467c-bc75-5bd76a8ddebd' }
	],
	['jigsaw',
		{ name: 'Jigsaw', description: 'A jigsaw cut', url: '/images/cut-jigsaw.jpg', id: 'f8f3db49-a53d-47d9-ad3c-1603e129cef8' }
	]
]);

const numPieces = [
	{ name: '8', pieces: 8, id: '4affe6f4-1405-47de-8eaf-05a406cf432e', dimensions: { x: 4, y: 2 } },
	{ name: '16', pieces: 16, id: 'f994da83-6d81-4067-a3b0-1faeb45fd9a4', dimensions: { x: 4, y: 4 } },
	{ name: '32', pieces: 32, id: 'e5f4031a-897f-4241-ac4b-197a2166cf47', dimensions: { x: 8, y: 4 } }
];

const cutsLength = cuts.size;

const numPiecesLength = numPieces.size;

export { images, imagesLength, cuts, cutsLength, numPieces, numPiecesLength };