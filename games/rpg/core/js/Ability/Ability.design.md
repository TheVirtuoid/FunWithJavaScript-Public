# Ability

An ability for a character or monster.

## constructor
`new Ability(args)`: constructs a new Ability
- `args`: arguments to the ability. Properties are
  - `type` (symbol): the type of ability. Required. Must be a valid ability type (discovered by `Ability.IsAbility()`)
  - `value` (integer): The initial value of the ability. Required.
  - `bonus` (integer): The ability score bonus. Optional, default to 0. 

## Properties
All properties are read-only.
- `type` (symbol):
- `value` (integer):
- `bonus` (integer):

## Methods
- `setValue(value)`: sets a new value
  - `value` (integer): The new value.
- `setBonus(value)`: sets a new bonus
  - `value` (integer): the new value

## Static Public Methods
- `IsAbility(type)`: returns true if the value is a valid ability type
- `GetAbility(type)`: returns ability data for the given value, or `undefined` if the ability is not found

## Static Public Properties
Each of these properties is a static Symbol in this format: `static STRENGTH -= Symbol('strength')`
- `STRENGTH`: the Strength ability type
- `DEXTERITY`: the Dexterity ability type
- `CONSTITUTION`: the Constitution ability type
- `INTELLIGENCE`: the Intelligence ability type
- `WISDOM`: the Wisdom ability type
- `CHARISMA`: the Charisma ability type

## Static Private Properties
- `DATA`: A `Map()` where the key is the ability and each value is data associated with the ability
  - STRENGTH: `{ name: 'Strength', abbreviation: 'STR' }`
  - DEXTERITY: `{ name: 'Dexterity', abbreviation: 'DEX' }`
  - CONSTITUTION: `{ name: 'Constitution', abbreviation: 'CON' }`
  - INTELLIGENCE: `{ name: 'Intelligence', abbreviation: 'INT' }`
  - WISDOM: `{ name: 'Wisdom', abbreviation: 'WIS' }`
  - CHARISMA: `{ name: 'Charisma', abbreviation: 'CHA' }`
