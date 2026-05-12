# Attribute

A value that represents an attribute of a character or entity.

## constructor
`new Attribute(args)`: constructs a new Attribute
- `args`: arguments to the attribute. Properties are
    - `type` (symbol): the type of attribute. Required. Must be a valid attribute type (discovered by `Attribute.IsAttribute()`)
    - `value` (integer): The initial value of the attribute. Required.

## Properties
All properties are read-only.
- `type` (symbol):
- `value` (integer):

## Methods
- `setValue(value)`: sets a new value
    - `value` (integer): The new value.

## Static Methods
- `IsAttribute(type)`: determines if the given attribute is a valid attribute
    - `type` (symbol): the attribute to check
- `GetAttribute(type)`: retrieves an attribute by type
    - `type` (symbol): the type of attribute to retrieve
- `IsAttributeOfType(type, attributeType)`: determines if the given attribute type is a valid attribute type
    - `type` (symbol): the attribute type to check
    - `attributeType` (symbol): the attribute type to check against