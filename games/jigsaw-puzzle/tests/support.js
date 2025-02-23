const images = new Map([
	['beach', [
		{ url: '/images/beach-418742_1280.jpg', id: 'ac09e151-333f-48e8-ab87-e608c0d5bd7b' },
		{ url: '/images/beach-6292382_1280.jpg', id: '52fc4101-5ccc-498a-ae63-a477e4d95c52' }
	]],
	['landscape', [
		{ url: '/images/mountains-8451480_1280.jpg', id: '3c60a8c9-d8b1-44a4-a4b9-12c9582dd405' }
	]],
	['insects', [
		{ url: '/images/butterfly-7954767_1280.jpg', id: '39731510-00db-4db3-96fd-75b40440956d' }
	]],
	['cities', [
		{ url: '/images/london-7965770_1280.jpg', id: '42f2883a-ef8b-475b-ae5c-86328efdfd2d' }
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
])

const cutsLength = cuts.size;

const numPieces = [8, 16, 32];
const numPiecesLength = numPieces.length;

export { images, imagesLength, cuts, cutsLength, numPieces, numPiecesLength };