# Race

The base class for all races in the game.

## Constructor
All arguments are required.
- `name` (string)
- `description` (string)
- `weight` (number)
- `height` (number)
- `age` (number)
- `classes` (Array<classType>)
- `restrictions` (Array<data>)
- `specialAbilities` (Array<object>)
- `savingThrows` (Array<object>)


## Properties
All properties are ready-only. All properties report copies of themselves when queried.

- `id` (uuid): Auto-generated unique id.
- `name` (string): The name of the race.
- `description` (string): A brief description of the race.
- `weight` (number): The weight of the race. This is the average
- `height` (number): The height of the race. This is the average
- `age` (number): The age of the race. This is the MAX number of years.
- `classes` (Array<classType>): An array of character classes this race can be. Derived from the 'Class' design.
- `restrictions` (Array<data>): An array of restrictions that apply to this race.
    - `data` here consists of four properties:
        - `restrictionType` (Symbol): The restriction type, used to determine how the other data is processed. See database below
        - `type` (Symbol or Array<Symbol>): The data that represents the restriction. Determined by the restrictionType.
        - `min` (number): Minimum value of restriction
        - `max` (number): Maximum value of restriction
- `specialAbilities` (Array<object>): An array of special abilities that can be used by this race.
    - TBD
- `savingThrows` (Array<object>): An array of saving throws that are automatically granted to this race.
    - `object` consists of the following properties:
        - `attribute` (Symbol): The attribute that is automatically granted a saving throw bonus
        - `bonus` (number): The bonus that is granted to the saving throw.

## Methods
- `toObject()`: Creates a new object for later serialization 

## Restrictions
There will be a static database of restrictions that can be applied to a race.
- `ABILITY` (Symbol='ability'): A restrction on an Ability
  - `type` is interpreted as an Ability (see the Ability class);
  - `min` is the minimum value for that ability, default 3. Cannot be lower than 3
  - `max` is the maximum value for that ability, default 18. Cannot be higher than 18
- `WEAPON_SIZE` (Symbol='weapon-size'): A restriction on a weapon sizes
    - `type` is an array of Size symbols that cannot be weilded by the race.
- `CHARACTER_CLASS` (Symbol='character-class'): A restriction on a character class
    - `type` is an array of CharacterClass symbols that cannot be used by the race.
- `COMBINATION_CLASSES` (Symbol='combination-classes'): A restriction on combination classes
    - `type` is an array of CharacterClass symbols (that represent combos) that cannot be used by the race.
- `HIT_POINTS` (Symbol='hit-points'): A restriction on hit points
    - `type` is a Dice string representing the dice roll for hit points.