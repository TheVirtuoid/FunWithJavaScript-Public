# Ability

An ability for a character or monster.

## constructor
`new Ability(args)`: constructs a new Ability
- `args`: arguments to the ability. Properties are
  - `id` (string): the id of ability. Required. Must be a valid ability type (discovered by `Ability.IsAbility()`)
  - `value` (integer): The initial value of the ability. Required.
  - `bonus` (integer): The ability score bonus. Optional, default to 0. 

## Properties
All properties are read-only.
- `id` (string):
- `value` (integer):
- `bonus` (integer):

## Methods
- `setValue(value)`: sets a new value
  - `value` (integer): The new value.
- `setBonus(value)`: sets a new bonus
  - `value` (integer): the new value

## Static Public Methods
- `IsAbility(id)`: returns true if the value is a valid ability id
- `GetAbility(ud)`: returns ability data for the given value, or `undefined` if the ability is not found

