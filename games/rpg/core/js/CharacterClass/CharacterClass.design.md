# CharacterClass

The base class for the different character classes: fighter, cleric, magic-user, thief, etc.

## Constructor
All data is required
- `name` (string)
- `description` (string)
- `restrictions` (Array<object>): Can be an empty array
- `levelData` (Array<object>): Can be an empty array

## Properties
All properties are read-only
- `id` (uuid): Auto-generated
- `name` (string): The name of the class
- `description` (string): A description of the class
- `restrictions` (Array<object>): Restrictions on this class
    - Each object contains the following properties:
    - `restrictionType` (symbol): The restriction symbol (see below). How the rest of the data is interpreted depends upon this value.
    - `type` (symbol): The attribute or ability that is restricted
    - `value` (number): The value of that restriction
- `levelData` (Array<object>): An array of levels for each character
    - This object contains the following properties:
    - `level` (number): The level of the character
    - `experiencePoints` (number): The experience points required to reach this level
    - `hitPoints` (DiceFormula): The hit points of the character
    - `otherAbilities` (Array<object>): An array of abilities that are granted at this level. This can be used by individual classes for specialized abilities (like thief or spells) that do not belong to other classes.

## Methods

## Restrictions
This is the list of restrictions for this class

- `RESTRICTION_MINIMUM_ABILITY` (Symbol: 'restriction-minimum-ability'): The minimum ability score for this class.
    - `type` (symbol): The Ability type
    - `value` (number): The minimum ability score required
- `RESTRICTION_WEAPON_SHARPNESS` (Symbol: 'restriction-weapon-sharpness'): The sharpness requirement for weapons
    - `value` (boolean): Whether the weapon must be sharp or not
- `RESTRICTION_ARMOR_TYPE` (Symbol: 'restriction-armor-type'): The types of armor this class can wear
    - If this restriction is present but with no data, then this class can wear NO armor at all.
    - `type` (symbol): The type of armor
- `RESTRICTION_WEAPON_TYPE` (Symbol: 'restriction-weapon-type'): The type of weapon this class can use
    - `type` (symbol): The type of weapon
