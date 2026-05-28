# Armor

A class that covers armor that can be carried by the character. This does NOT include equipment and weappons.

This class extends the `Item` class.

## Database
Each database entry will contain the fields from `Item` plus the following:
- `armorClass` (number): The armor class of the armor
- `category` (Array<string>): the category of the armor. Defaults to ['armor']
 

## Properties
All additional properties are read-only
- `armorClass` (number): The armor class of the weapon
- `category` (Array<string>): the category of the armor. Defaults to ['armor']

## Methods
- `toObject()` - extends the `Iten.toObject()` method to include the new properties.