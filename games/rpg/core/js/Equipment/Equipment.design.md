# Equipment

A class that covers items that can be carried by the character. This does NOT include weapons and armor.

## Database
Each database entry will contain the fields from `Item` plus the following:

(There are no additional fields)

## Properties
There are no additional properties.

## Methods
There are no additional methods.

## Static Methods
- `isEquipment(id)` - returns true if the item is equipment. Throws if id is not a string
- `getEquipment(id)` - return the equipment data. Returns undefined if not found. Throws if id is not a string.