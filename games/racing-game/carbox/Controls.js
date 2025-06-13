import {Vector3} from "@babylonjs/core";

export default class Controls {
	#carChassisMass;
	#carChassisFriction;
	#carChassisRestitution;
	#carWheelMass;
	#carWheelFriction;
	#carWheelRestitution;
	#carScale;
	#carMesh;

	#groundFriction;
	#groundRestitution;
	#groundRotationAmount;
	#groundRotationAxis;
	#groundMesh;

	#domCarChassisMass;
	#domCarChassisFriction;
	#domCarChassisRestitution;
	#domCarWheelMass;
	#domCarWheelFriction;
	#domCarWheelRestitution;
	#domCarScale;
	#domGroundFriction;
	#domGroundRestitution;
	#domGroundRotationAmount;
	#domGroundRotationAxis;

	#initialPosition;

	#buttonReset;

	constructor(car, ground, position) {
		this.#domCarChassisMass = document.getElementById('car-chassis-mass');
		this.#domCarChassisFriction = document.getElementById('car-chassis-friction');
		this.#domCarChassisRestitution = document.getElementById('car-chassis-restitution');
		this.#domCarWheelMass = document.getElementById('car-wheel-mass');
		this.#domCarWheelFriction = document.getElementById('car-wheel-friction');
		this.#domCarWheelRestitution = document.getElementById('car-wheel-restitution');
		this.#domCarScale = document.getElementById('car-scale');
		this.#domGroundFriction = document.getElementById('ground-friction');
		this.#domGroundRestitution = document.getElementById('ground-restitution');
		this.#domGroundRotationAmount = document.getElementById('ground-rotation-amount');
		this.#domGroundRotationAxis = document.getElementById('ground-rotation-axis');

		this.#carChassisMass = car.chassis?.mass ?? 1;
		this.#carChassisFriction = car.chassis?.friction ?? .5;
		this.#carChassisRestitution = car.chassis?.restitution ?? .5;
		this.#carWheelMass = car.wheel?.mass ?? 1;
		this.#carWheelFriction = car.wheel?.friction ?? .5;
		this.#carWheelRestitution = car.wheel?.restitution ?? .5;
		this.#carScale = car.scale ?? 1;
		this.#carMesh = car.mesh;

		this.#groundFriction = ground.friction ?? .5;
		this.#groundRestitution = ground.restitution ?? .5;
		this.#groundRotationAmount = ground.rotationAmount ?? 0;
		this.#groundRotationAxis = ground.rotationAxis ?? 'x';
		this.#groundMesh = ground.mesh;

		this.#buttonReset = document.getElementById('reset');
		this.#buttonReset.addEventListener('click', this.#onReset.bind(this));

		this.#initialPosition = position.clone();

		this.#domCarChassisMass.value = this.#carChassisMass;
		this.#domCarChassisFriction.value = this.#carChassisFriction;
		this.#domCarChassisRestitution.value = this.#carChassisRestitution;
		this.#domCarWheelMass.value = this.#carWheelMass;
		this.#domCarWheelFriction.value = this.#carWheelFriction;
		this.#domCarWheelRestitution.value = this.#carWheelRestitution;
		this.#domCarScale.value = this.#carScale;
		this.#domGroundFriction.value = this.#groundFriction;
		this.#domGroundRestitution.value = this.#groundRestitution;
		this.#domGroundRotationAmount.value = this.#groundRotationAmount;
		this.#domGroundRotationAxis.value = this.#groundRotationAxis;
	}

	#onReset() {
		this.#groundMesh.rotate(new Vector3(1, 0, 0),  Math.PI / 2);
	}
}