# Weapon

A class that covers weapons that can be carried by the character. This does NOT include equipment and armor.

This class extends the `Item` class.

## Database
Each database entry will contain the fields from `Item` plus the following:
- `size` (string): The size of the weapon
- `damage` (string): The dice notation damage for the weapon
- `range` (Array<[number, number]>): The range of the weapon. Specifies distance, bonus for each entry
    - If range is not specified, defaults to undefined. This is not a range weapon.
- `category` (Array<string>): the category of the weapon

## Properties
All additional properties are read-only
- `size` (string): The size of the weapon
- `damage` (string): The dice notation damage for the weapon
- `range` (Array<[number, number]>): The range of the weapon. Specifies distance, bonus for each entry
    - If range is not specified, defaults to undefined. This is not a range weapon.
- `category` (Array<string>): the category of the weapon

## Methods
- `toObject()` - extends the `Iten.toObject()` method to include the new properties.