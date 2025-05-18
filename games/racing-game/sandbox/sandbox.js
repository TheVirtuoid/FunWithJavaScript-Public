import './sandbox.pcss';
import App from "./app.js";
import Track from "../src/classes/Track/Track.js";
import V3 from "../src/classes/V3/V3.js";
import Layout from "../src/classes/Layout/Layout.js";

const layout = [
	{
		type: 'straight',
		startPoint: { x: App.SX, y: App.SY, z: App.SZ },
		controlPoint1: { x: App.SX, y: App.SY - 29.25, z: App.SZ + 40 },
		controlPoint2: { x: App.SX, y: App.SY - 39, z: App.SZ + 42 },
		endPoint: { x: App.SX, y: App.SY - 39, z: App.SZ + 55}
	},
	{
		type: 'curve',
		startPoint: { x: App.SX, y: App.SY - 39, z: App.SZ + 55 },
		controlPoint1: { x: App.SX, y: App.SY - 39, z: App.SZ + 75 },
		controlPoint2: { x: App.SX - 20, y: App.SY - 39, z: App.SZ + 95 },
		endPoint: { x: App.SX - 40, y: App.SY - 39, z: App.SZ + 95 }
	},
	/*{
		type: 'curve',
		startPoint: { x: App.SX, y: App.SY - 39, z: App.SZ + 55 },
		controlPoint1: { x: App.SX + .7, y: App.SY - 39, z: App.SZ + 55 + 25 },
		controlPoint2: { x: App.SX - 30.7, y: App.SY - 39, z: App.SZ + 55 + 25 },
		endPoint: { x: App.SX - 30, y: App.SY - 39, z: App.SZ + 55 }
	},*/
/*	{
		type: 'straight',
		startPoint: { x: App.SX - 30, y: App.SY - 39, z: App.SZ + 55 },
		controlPoint1: { x: App.SX - 30, y: App.SY - 39, z: App.SZ + 45 },
		controlPoint2: { x: App.SX - 30, y: App.SY - 42, z: App.SZ + 35 },
		endPoint: { x: App.SX - 30, y: App.SY - 42, z: App.SZ + 25}
	},*/
];

/*
const realLayout = [
	Track.CreateStartingAnchor({
		startingPosition: new V3(App.SX, App.SY, App.SZ),
		startingDirectionVector: new V3(1, -.5, 0),
	}),
	Track.CreateStraight({
		length: 13,
		// endPoint: { x: App.SX, y: App.SY - 39, z: App.SZ + 55 },
		contour: {
			controlPoint1: new V3(App.SX, App.SY - 29.25, App.SZ + 40),
			controlPoint2: new V3(App.SX, App.SY - 39, App.SZ + 42)
		},
	}),
	Track.CreateCurve({
		radius: 40,
		degrees: 90,
		curveDirection: Track.CURVE_DIRECTION_NEGATIVE
	})
];
*/

const startingPosition = new V3(App.SX, App.SY, App.SZ);
const startingDirectionVector = new V3(0, -.75, 1);
const startingAnchor = Track.CreateStartingAnchor({ id: 'startAnchor', startingPosition, startingDirectionVector });
const endingAnchor = Track.CreateEndingAnchor({ id: 'endAnchor' });
const straight1 = Track.CreateStraight({
	id: 'straight1',
	length: 20,
	contour: {
		controlPoint1: new V3( 0, -3, 5 ),
		controlPoint2: new V3( 0, -12.6, 6 )
	}
});
const straight2 = Track.CreateStraight({
	id: 'straight2',
	length: 20
});
const curve180 = Track.CreateCurve({
	id: 'curve180',
	radius: 20,
	degrees: 180,
	curveDirection: Track.CURVE_DIRECTION_POSITIVE
});
const tracks = [startingAnchor, straight1, straight2, curve180, endingAnchor];
const realLayout = new Layout({ tracks });
/*realLayout.tracks.forEach((track) => {
	console.log(track.id, track.startingPosition.coordinates(), track.startingDirectionVector.coordinates(), track.endingPosition?.coordinates(), track.endingDirectionVector?.coordinates());
	console.log('   ', track.contour?.controlPoint1.coordinates(), track.contour?.controlPoint2.coordinates());
});*/


const app = new App(layout, realLayout);

