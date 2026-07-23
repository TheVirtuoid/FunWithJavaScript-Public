let instance;

const upgrades = [
	{
		id: "power_01",
		path: "Power",
		tier: 1,
		name: "Thorn Chipper",
		cost: 2, // Affordable after clearing a few Thistlebites
		prerequisiteId: null,
		modifier: { stat: "player_damage", type: "ADDITIVE", value: 1.0 }
	},
	{
		id: "power_02",
		path: "Power",
		tier: 2,
		name: "Gravelbane Crush",
		cost: 5, // Requires a couple of Gravelbane kills
		prerequisiteId: "power_01",
		modifier: { stat: "player_damage", type: "ADDITIVE", value: 2.0 }
	},
	{
		id: "power_03",
		path: "Power",
		tier: 3,
		name: "Dreadstalk Cleaver",
		cost: 35, // Late-game capstone requiring high-tier weed farming
		prerequisiteId: "power_02",
		modifier: { stat: "player_damage", type: "MULTIPLIER", value: 1.5 } // Scale exponentially at the end
	},

	// ==========================================
	// PATH 2: SPEED (Movement or Swing Speed)
	// ==========================================
	{
		id: "speed_01",
		path: "Speed",
		tier: 1,
		name: "Light Step",
		cost: 3,
		prerequisiteId: null,
		modifier: { stat: "player_speed", type: "MULTIPLIER", value: 1.10 } // +10% Speed
	},
	{
		id: "speed_02",
		path: "Speed",
		tier: 2,
		name: "Swift Sweep",
		cost: 8,
		prerequisiteId: "speed_01",
		modifier: { stat: "player_speed", type: "MULTIPLIER", value: 1.25 }
	},

	// ==========================================
	// PATH 3: RANGE (Scythe/Tool Reach)
	// ==========================================
	{
		id: "range_01",
		path: "Range",
		tier: 1,
		name: "Long Handle",
		cost: 3,
		prerequisiteId: null,
		modifier: { stat: "tool_range", type: "ADDITIVE", value: 0.5 }
	},
	{
		id: "range_02",
		path: "Range",
		tier: 2,
		name: "Wide Sweep",
		cost: 11,
		prerequisiteId: "range_01",
		modifier: { stat: "tool_range", type: "ADDITIVE", value: 1.2 }
	},

	// ==========================================
	// PATH 4: DURABILITY (Tool wear/Player shield)
	// ==========================================
	{
		id: "durability_01",
		path: "Durability",
		tier: 1,
		name: "Reinforced Grip",
		cost: 2,
		prerequisiteId: null,
		modifier: { stat: "tool_durability", type: "MULTIPLIER", value: 1.20 }
	},
	{
		id: "durability_02",
		path: "Durability",
		tier: 2,
		name: "Ironclad Shaft",
		cost: 14,
		prerequisiteId: "durability_01",
		modifier: { stat: "tool_durability", type: "MULTIPLIER", value: 1.50 }
	},

	// ==========================================
	// PATH 5: TIME (Slow down decay / Extend day)
	// ==========================================
	{
		id: "time_01",
		path: "Time",
		tier: 1,
		name: "Patience",
		cost: 4,
		prerequisiteId: null,
		modifier: { stat: "level_timer", type: "ADDITIVE", value: 15 } // +15 seconds to level clock
	},
	{
		id: "time_02",
		path: "Time",
		tier: 2,
		name: "Temporal Flow",
		cost: 18,
		prerequisiteId: "time_01",
		modifier: { stat: "level_timer", type: "ADDITIVE", value: 45 }
	},

	// ==========================================
	// PATH 6: SPAWN RATE (Increase Weed Frequency for points)
	// ==========================================
	{
		id: "spawn_rate_01",
		path: "Spawn Rate",
		tier: 1,
		name: "Fertilizer Mist",
		cost: 5,
		prerequisiteId: null,
		modifier: { stat: "weed_spawn_interval", type: "MULTIPLIER", value: 0.90 } // Spawns 10% faster
	},
	{
		id: "spawn_rate_02",
		path: "Spawn Rate",
		tier: 2,
		name: "Overgrowth Spores",
		cost: 25,
		prerequisiteId: "spawn_rate_01",
		modifier: { stat: "weed_spawn_interval", type: "MULTIPLIER", value: 0.75 } // Spawns 25% faster
	}
];

export default class Upgrade {
	constructor() {
		if (instance) {
			return instance;
		}
		instance = this;
	}
}