# Attribute

A value that represents an attribute of a character or entity.

## constructor
`new Attribute(args)`: constructs a new Attribute
- `args`: arguments to the attribute. Properties are
    - `type` (symbol): the type of attribute. Required. Must be a valid attribute type (discovered by `Attribute.IsAttribute()`)
    - `value` (integer): The initial value of the attribute. Required.

## Properties
All properties are read-only.
- `type` (symbol)
- `value` (integer)
- `category` (symbol) - not stored, but derived from the type (Attribute.GetAttribute)
- `name` (string) - not stored, but derived from the type (Attribute.GetAttribute)
- `description` (string) - not stored, but derived from the type (Attribute.GetAttribute)
- `abbreviation` (string) - not stored, but derived from the type (Attribute.GetAttribute)

## Methods
- `setValue(value)`: sets a new value
    - `value` (integer): The new value.

## Static Methods
- `IsAttribute(type)`: determines if the given attribute is a valid attribute
    - `type` (symbol): the attribute to check
    - returns (boolean): true if the attribute is valid, false otherwise
- `GetAttribute(type)`: retrieves an attribute by type
    - `type` (symbol): the type of attribute to retrieve
    - returns (AttributeData | undefined)
- `GetAttributes(category)`: retrieves all attributes of a given category
    - `category` (symbol): the category of attributes to retrieve
    - returns (Attribute[])

## Static Public Properties
Each of the following properties are defined as a Symbol. For example: `static LEVEL = Symbol('level');`
- `LEVEL`: The character's level
- `EXPERIENCE`: Experience points
- `ARMOR_CLASS`: The armor class
- `HIT_POINTS`: Character's hit points
- `ATTACK_BONUS`: Attack bonus, if any
- `GOLD_PIECES`: Gold pieces owned by the character
- `DEATH_POISON`: Death or Poison saving throw
- `WANDS`: Wands saving throw;
- `PARALYZE_STONE`: Paralyzation / Petrification saving throw;
- `DRAGON_BREATH`: Dragon Breath saving throw;
- `SPELLS`: Spells saving throw;
- `ATTRIBUTE_CATEGORY_CHARACTER`: Attribute Catageory "Character" - for character attributes
- `ATTRIBUTE_CATEGORY_SAVING_THROW`: Attribute Category "Saving Throw" - for all saving throws
- `ATTRIBUTE_CATEGORY_MONEY` = Attribute Category "Money" - for all monies;

## Notes
- `AttributeData` is defined from the Attribute static private properties `#DATA`, which contains the following fields:
  - `category` (symbol):
  - `name` (string):
  - `description` (string):
  - `abbreviation` (string):

