# Weapon

A class that covers weapons that can be carried by the character. This does NOT include equipment and armor.

This class extends the `Item` class.

## Database
Each database entry will contain the fields from `Item` plus the following:
- `size` (string): The size of the weapon. Abbreviation from the static Size class
- `damage` (string): The dice notation damage for the weapon
- `range` (Array<[number, number]>): The range of the weapon. Specifies distance, bonus for each entry
    - If range is not specified, defaults to undefined. This is not a range weapon.
- `category` (Array<string>): the category of the weapon
- `sharp` (boolean): If a weapon is sharp or not. Defaults to true

## Properties
All additional properties are read-only
- `size` (Symbol): The size of the weapon. Based upon static Size class
- `damage` (string): The dice notation damage for the weapon
- `range` (Array<[number, number]>): The range of the weapon. Specifies distance, bonus for each entry
    - If range is not specified, defaults to undefined. This is not a range weapon.
- `category` (Array<string>): the category of the weapon
- `sharp` (boolean): If a weapon is sharp or not

## Methods
- `toObject()` - extends the `Iten.toObject()` method to include the new properties.