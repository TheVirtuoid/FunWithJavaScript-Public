const images = new Map([
	['beach', [{ url: '/images/beach-418742_1280.jpg' }, { url: '/images/beach-6292382_1280.jpg' }]],
	['landscape', [{ url: '/images/mountains-8451480_1280.jpg' }]],
	['insects', [{ url: '/images/butterfly-7954767_1280.jpg' }]],
	['cities', [{ url: '/images/london-7965770_1280.jpg' }]]
]);

let imagesLength = 0;
images.forEach((categoryImages) => {
	imagesLength += categoryImages.length;
});

const cuts = new Map([
	['square', { name: 'Square', description: 'A square cut', url: '/images/cut-square.jpg' }],
	['jigsaw', { name: 'Jigsaw', description: 'A jigsaw cut', url: '/images/cut-jigsaw.jpg' }]
])

export { images, imagesLength, cuts };