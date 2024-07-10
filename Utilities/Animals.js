export default class Animals {
	static LIST = [
		{ "type": "Cat", "name": "Fluffy", "class": "Mammalia"},
		{ "type": "Dog", "name": "Fido", "class": "Mammalia"},
		{ "type": "Horse", "name": "Mr. Ed", "class": "Mammalia"},
		{ "type": "Cow", "name": "Betsy", "class": "Mammalia"},
		{ "type": "Coyote", "name": "Wile E.", "class": "Mammalia"},
		{ "type": "Road Runner", "name": "Beep Beep", "class": "Aves"},
		{ "type": "Dolphin", "name": "Flipper",  "class": "Mammalia"},
		{ "type": "Whale", "name": "Moby Dick", "class": "Mammalia"},
		{ "type": "Lizard", "name": "Larry", "class": "Reptilia"}
	];

	static LIST_MAP_OBJECT = new Map(
			Animals.LIST.map((entry) => [entry, entry.type])
	);

	static LIST_MAP = new Map(
			Animals.LIST.map((entry) => [entry.type, entry])
	);

	static LIST_SET_STRING = new Set([...Animals.LIST.map((entry) => entry.name)]);

	static LIST_SET_OBJECT = new Set([...Animals.LIST]);
}