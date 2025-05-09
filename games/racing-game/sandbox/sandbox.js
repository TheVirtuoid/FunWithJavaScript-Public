import './sandbox.pcss';
import App from "./app.js";
import Track from "../src/classes/Track/Track.js";

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

const realLayout = [
	Track.CreateAnchor({ startingPoint: { x: App.SX, y: App.SY, z: App.SZ } }),
	Track.CreateStraight({
		endPoint: { x: App.SX, y: App.SY - 39, z: App.SZ + 55 },
		contour: {
			controlPoint1: { x: App.SX, y: App.SY - 29.25, z: App.SZ + 40 },
			controlPoint2: { x: App.SX, y: App.SY - 39, z: App.SZ + 42 },
		},
	}),
	Track.CreateCurve({
		radius: 40,
		degrees: 90,
		curveDirection: 'left'
	})
];


const app = new App(layout, realLayout);

