import {
	Matrix,
	Mesh,
	MeshBuilder,
	Tools,
	Vector3
} from "@babylonjs/core";

export function bezierCurve3d(args = {}) {
	const { startPoint, controlPoint1, controlPoint2, endPoint, segments = 10, zAdjust = 0 } = args;
	const points = [];
	for (let t = 0; t <= 1; t += 1 / segments) {
		const x = Math.pow(1 - t, 3) * startPoint.x +
			3 * Math.pow(1 - t, 2) * t * controlPoint1.x +
			3 * (1 - t) * Math.pow(t, 2) * controlPoint2.x +
			Math.pow(t, 3) * endPoint.x;

		const y = Math.pow(1 - t, 3) * startPoint.y +
			3 * Math.pow(1 - t, 2) * t * controlPoint1.y +
			3 * (1 - t) * Math.pow(t, 2) * controlPoint2.y +
			Math.pow(t, 3) * endPoint.y;

		const z = Math.pow(1 - t, 3) * startPoint.z +
			3 * Math.pow(1 - t, 2) * t * controlPoint1.z +
			3 * (1 - t) * Math.pow(t, 2) * controlPoint2.z +
			Math.pow(t, 3) * endPoint.z;

		points.push({ x, y, z });
	}
	points.push({ x: endPoint.x, y: endPoint.y, z: endPoint.z });
	return points;
}

export function renderStraight(args = {}) {
	const {
		startPoint,
		controlPoint1,
		controlPoint2,
		endPoint,
		scene,
		roadWidth = 4,
		segments = 100,
		firstGuardRailScale = { startScale: .6, endScale: .6 },
		secondGuardRailScale = { startScale: .6, endScale: .6 }
	} = args;
	const originalPoints = bezierCurve3d({ startPoint, controlPoint1, controlPoint2, endPoint, segments});
	const offsetDistance = roadWidth / 2;
	const { offsetPoints1, offsetPoints2 } = generateOffsetPoints(originalPoints, offsetDistance);
	const firstGuardRailPoints = offsetPoints1.map((point) => new Vector3(point.x, point.y, point.z));
	const secondGuardRailPoints = offsetPoints2.map((point => new Vector3(point.x, point.y, point.z)));
	const firstGuardRail = generateRailing(firstGuardRailPoints, firstGuardRailScale.startScale, firstGuardRailScale.endScale);
	const secondGuardRail = generateRailing(secondGuardRailPoints, secondGuardRailScale.startScale, secondGuardRailScale.endScale);

	const lastPoint = originalPoints.length - 1;
	return MeshBuilder.CreateRibbon("ribbon", {
		pathArray: [firstGuardRail, offsetPoints1, offsetPoints2, secondGuardRail],
		sideOrientation: Mesh.DOUBLESIDE,
		updatable: true
	}, scene);
}

export function renderCurve(args) {
	const {
		startPoint,
		controlPoint1,
		controlPoint2,
		endPoint,
		scene,
		angle,
		roadWidth = 4,
		segments = 100,
		firstGuardRailScale = { startScale: .6, endScale: .6 },
		secondGuardRailScale = { startScale: .6, endScale: 2 }
	} = args;

	const originalPoints = bezierCurve3d({ startPoint, controlPoint1, controlPoint2, endPoint, segments });
	const offsetDistance = roadWidth / 2;

	const { offsetPoints1, offsetPoints2 } = generateOffsetPointsWithBanking(originalPoints, offsetDistance, angle);
	const firstGuardRailPoints = offsetPoints1.map((point) => new Vector3(point.x, point.y, point.z));
	const secondGuardRailPoints = offsetPoints2.map((point => new Vector3(point.x, point.y, point.z)));
	const firstGuardRail = generateRailing(firstGuardRailPoints, firstGuardRailScale.startScale, firstGuardRailScale.endScale);
	const secondGuardRail = generateRailing(secondGuardRailPoints, secondGuardRailScale.startScale, secondGuardRailScale.endScale);

	return MeshBuilder.CreateRibbon("ribbon", {
		pathArray: [firstGuardRail, offsetPoints1, offsetPoints2, secondGuardRail],
		sideOrientation: Mesh.DOUBLESIDE,
		updatable: true
	}, scene);
}

export function generateRailing(edge, startScale = .4, endScale = .4) {
	const railing = [];
	const front = edge.length / 4;
	const back = front * 3;
	const scaleDistance = (endScale - startScale) / front;
	for(let i = 0; i < edge.length; i++) {
		const point = edge[i];
		let scaleY = endScale;
		if (i < front) {
				scaleY = startScale + i * scaleDistance;
		} else if (i > back) {
				scaleY = endScale - (i - back) * scaleDistance;
		}
		railing.push(new Vector3(point.x, point.y + scaleY, point.z ));
	}
	return railing;
}

export function generateOffsetPoints(points, offsetDistance) {
	const offsetPoints1 = [];
	const offsetPoints2 = [];

	for (let i = 0; i < points.length - 1; i++) {
		const current = points[i];
		const next = points[i + 1];

		// Calculate the direction vector between the current and next points
		const direction = new Vector3(next.x - current.x, next.y - current.y, next.z - current.z).normalize();

		// Calculate a perpendicular vector (cross product with an arbitrary vector)
		const perpendicular = Vector3.Cross(direction, Vector3.Up()).normalize();

		// Offset the current point in both directions
		const offset1 = new Vector3(
			current.x + perpendicular.x * offsetDistance,
			current.y + perpendicular.y * offsetDistance,
			current.z + perpendicular.z * offsetDistance
		);

		const offset2 = new Vector3(
			current.x - perpendicular.x * offsetDistance,
			current.y - perpendicular.y * offsetDistance,
			current.z - perpendicular.z * offsetDistance
		);

		offsetPoints1.push(offset1);
		offsetPoints2.push(offset2);
	}

	// Add the last point offsets
	const last = points[points.length - 1];
	const secondLast = points[points.length - 2];
	const lastDirection = new Vector3(last.x - secondLast.x, last.y - secondLast.y, last.z - secondLast.z).normalize();
	const lastPerpendicular = Vector3.Cross(lastDirection, Vector3.Up()).normalize();

	offsetPoints1.push(new Vector3(
		last.x + lastPerpendicular.x * offsetDistance,
		last.y + lastPerpendicular.y * offsetDistance,
		last.z + lastPerpendicular.z * offsetDistance
	));

	offsetPoints2.push(new Vector3(
		last.x - lastPerpendicular.x * offsetDistance,
		last.y - lastPerpendicular.y * offsetDistance,
		last.z - lastPerpendicular.z * offsetDistance
	));

	return { offsetPoints1, offsetPoints2 };
}

export function generateOffsetPointsWithBanking(points, offsetDistance, maxBankAngle) {
	const offsetPoints1 = [];
	const offsetPoints2 = [];
	const totalPoints = points.length;

	for (let i = 0; i < totalPoints - 1; i++) {
		const current = points[i];
		const next = points[i + 1];

		// Calculate the direction vector between the current and next points
		const direction = new Vector3(next.x - current.x, next.y - current.y, next.z - current.z).normalize();

		// Calculate a perpendicular vector (cross product with an arbitrary vector)
		let perpendicular = Vector3.Cross(direction, Vector3.Up()).normalize();

		// Apply banking: Rotate the perpendicular vector based on the current point's position
		const bankAngle = maxBankAngle * Math.sin((Math.PI * i) / (totalPoints - 1)); // Smooth banking curve
		const rotationMatrix = Matrix.RotationAxis(direction, Tools.ToRadians(bankAngle));
		perpendicular = Vector3.TransformCoordinates(perpendicular, rotationMatrix);

		// Offset the current point in both directions
		const offset1 = new Vector3(
			current.x + perpendicular.x * offsetDistance,
			// current.y + perpendicular.y * offsetDistance,
			current.y,
			current.z + perpendicular.z * offsetDistance
		);

		const offset2 = new Vector3(
			current.x - perpendicular.x * offsetDistance,
			// current.y - perpendicular.y * offsetDistance,
			current.y - perpendicular.y * offsetDistance * 2,
			current.z - perpendicular.z * offsetDistance
		);

		offsetPoints1.push(offset1);
		offsetPoints2.push(offset2);
	}

	// Add the last point offsets
	const last = points[totalPoints - 1];
	const secondLast = points[totalPoints - 2];
	const lastDirection = new Vector3(last.x - secondLast.x, last.y - secondLast.y, last.z - secondLast.z).normalize();
	let lastPerpendicular = Vector3.Cross(lastDirection, Vector3.Up()).normalize();

	const lastRotationMatrix = Matrix.RotationAxis(lastDirection, Tools.ToRadians(0)); // No bank at the end
	lastPerpendicular = Vector3.TransformCoordinates(lastPerpendicular, lastRotationMatrix);

	offsetPoints1.push(new Vector3(
		last.x + lastPerpendicular.x * offsetDistance,
		// last.y + lastPerpendicular.y * offsetDistance,
		last.y,
		last.z + lastPerpendicular.z * offsetDistance
	));

	offsetPoints2.push(new Vector3(
		last.x - lastPerpendicular.x * offsetDistance,
		// last.y - lastPerpendicular.y * offsetDistance,
		last.y - lastPerpendicular.y * offsetDistance * 2,
		last.z - lastPerpendicular.z * offsetDistance
	));

	return { offsetPoints1, offsetPoints2 };
}

