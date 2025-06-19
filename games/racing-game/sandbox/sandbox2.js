import './sandbox.pcss';
import App2 from "./app2.js";
import Track from "../src/classes/Track/Track.js";
import V3 from "../src/classes/V3/V3.js";
import Layout from "../src/classes/Layout/Layout.js";

const startingPosition = new V3(App2.SX, App2.SY, App2.SZ);
const startingDirectionVector = new V3(0, -1.55, 1);
const startingAnchor = Track.CreateStartingAnchor({ id: 'startAnchor', startingPosition, startingDirectionVector });
const endingAnchor = Track.CreateEndingAnchor({ id: 'endAnchor' });
const startLine = Track.CreateStartLine({ id: 'startLine' });
const finishLine = Track.CreateFinishLine({ id: 'finishLine' });
const straight0 = Track.CreateStraight({
	id: 'straight0',
	length: 20
});
const straight1 = Track.CreateStraight({
	id: 'straight1',
	endingPosition: new V3(0, -35, 50),
	contour: {
		controlPoint1: new V3( 0, -20, 10),
		controlPoint2: new V3( 0, -35, 20 )
	}
});
const straight2 = Track.CreateStraight({
	id: 'straight2',
	length: 5
});
const straight3 = Track.CreateStraight({
	id: 'straight3',
	endingPosition: new V3(80, -30, 0),
	contour: {
		controlPoint1: new V3( 30, 0, 0 ),
		controlPoint2: new V3( 60, -30, 0 )
	}
});
const straight4 = Track.CreateStraight({
	id: 'straight4',
	length: 5
});
const curve180 = Track.CreateCurve({
	id: 'curve180',
	radius: 20,
	degrees: 180,
	curveDirection: Track.CURVE_DIRECTION_POSITIVE
});
const curve90 = Track.CreateCurve({
	id: 'curve90',
	radius: 25,
	degrees: 90,
	curveDirection: Track.CURVE_DIRECTION_NEGATIVE
});
const straight5 = Track.CreateStraight({
	id: 'straight5',
	endingPosition: new V3(-30, -5, 0),
	contour: {
		controlPoint1: new V3( -10, 0, 0 ),
		controlPoint2: new V3( -16, -5, 0 )
	}
});
const tracks = [
	startingAnchor,
	startLine,
	straight0,
	straight1,
	straight2,
	curve90,
	straight3,
	curve180,
	straight5,
	finishLine,
	straight4,
	endingAnchor];
const layout = new Layout({ tracks });

/*realLayout.tracks.forEach((track) => {
	console.log(track.id, track.startingPosition.coordinates());
	console.log('          ', track.endingPosition?.coordinates());
	console.log('          ', track.startingDirectionVector.coordinates());
	console.log('          ', track.endingDirectionVector?.coordinates());
});*/

const app = new App2(layout);

