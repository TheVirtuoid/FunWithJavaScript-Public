# Attribute

A value that represents an attribute of a character or entity.

## constructor
`new Attribute(args)`: constructs a new Attribute
- `args`: arguments to the attribute. Properties are
    - `id` (string): the type of attribute. Required. Must be a valid attribute id (discovered by `Attribute.IsAttribute()`)
    - `value` (integer): The initial value of the attribute. Required.

## Properties
All properties are read-only.
- `id` (string)
- `value` (integer)
- `category` (symbol) - not stored, but derived from the type (Attribute.GetAttribute)
- `name` (string) - not stored, but derived from the type (Attribute.GetAttribute)
- `description` (string) - not stored, but derived from the type (Attribute.GetAttribute)
- `abbreviation` (string) - not stored, but derived from the type (Attribute.GetAttribute)

## Methods
- `setValue(value)`: sets a new value
    - `value` (integer): The new value.

## Static Methods
- `IsAttribute(id)`: determines if the given attribute is a valid attribute
    - `id` (string): the attribute to check
    - returns (boolean): true if the attribute is valid, false otherwise
- `GetAttribute(id)`: retrieves an attribute by id
    - `id` (id): the id of attribute to retrieve
    - returns (AttributeData | undefined)
- `GetCategoryData(category)`: retrieves all attributes of a given category
    - `category` (symbol): the category of attributes to retrieve
    - returns (Attribute[])

## Notes
- `AttributeData` is defined from the Attribute static private properties `#DATA`, which contains the following fields:
  - `category` (symbol):
  - `name` (string):
  - `description` (string):
  - `abbreviation` (string):

