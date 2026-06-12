# Item

The base class for anything carried by any character: equipment, armor, weapons, etc.

## Database properties
- `name` (string): The name of the item.
- `price` (number): The price of the item.
- `priceUnit` (string): The unit price of the item.
- `weight` (number): The weight of the item.
    - Use 0 for items that basically have no weight ('**' in the documentation)
    - Use .1 for items that are very light, but collectively can add up ('*' in the documentation)

## Properties
All properties are read-only.
- `id` (uuid): Auto-generated unique identifier.
- `name` (string): The name of the item.
- `price` (number): The price of the item.
- `priceUnit` (string): the unit price of the item. Defaults to "gp"
- `weight` (number): The weight of the item.

## Methods
- `toObject()` (object): creates a copy of the record, passed back as an object.
- `setPrice(number)`: sets the price
- `setPriceUnit(string)`: sets the price unit

## Static Methods
- `GetItems(className)` Array(object): returns an array from items of the specified class name. Empty array if none are found.