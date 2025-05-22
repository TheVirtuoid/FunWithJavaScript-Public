import {Color3, MeshBuilder, StandardMaterial} from "@babylonjs/core";

const buildGround = (scene) => {
	const groundMaterial = new StandardMaterial("grass", scene);
	groundMaterial.diffuseColor = new Color3(0, .25, 0);

	const ground001 = MeshBuilder.CreateBox("ground001", { width: 24.2, height: 10, depth: 10}, scene);
	ground001.material = groundMaterial;
	ground001.position.y = -5;
	ground001.position.x = 5;
	/*ground001.position.z = this.#sz + 85;*/

	const ground002 = MeshBuilder.CreateBox("ground002", { width: 10, height: 10, depth: 10}, scene);
	ground002.material = groundMaterial;
	ground002.position.y = -5;
	ground002.position.x = 12.1;
	ground002.position.z = 10;

	const ground003 = MeshBuilder.CreateBox("ground003", { width: 10, height: 10, depth: 10}, scene);
	ground003.material = groundMaterial;
	ground003.position.y = -5;
	ground003.position.x = -2.1;
	ground003.position.z = 10;

}

export default buildGround;