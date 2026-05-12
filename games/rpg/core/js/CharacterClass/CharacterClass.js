export default class CharacterClass {
	static FIGHTER = Symbol('fighter');

	static IsCharacterClass(characterClassType) {
		return characterClassType === CharacterClass.FIGHTER;
	}

	#type;

	constructor(args = {}) {
		this.#type = args.type;
	}

	get type() {
		return this.#type;
	}
}