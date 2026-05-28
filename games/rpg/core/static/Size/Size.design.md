# Size

A static class that defines all the sizes of weapons (and anything else that has a 'size');

Any returned data will be copies of the data and not the original data.

## constructor
- Throws error if the constructor is called.

## Public Static Properties
- `SMALL`:  Symbol = 'small'
- `MEDIUM`: Symbol = 'medium'
- `LARGE`: Symbol = 'large'
- `SYMBOLS`: Array[Symbol] = An array of all the symbols

## Private Static Properties
- `DATA`: Map<Symbol, Object> = A mapping of all the values. The object will contain:
    - `name` (string): The name of the money
    - `abbr` (string): The abbreviation of the money

## Public Static Methods
- `GetSize(string | symbol)`: Gets the data from `DATA` for the given argument. If the argument is a string, it will be an abbreviation. If a Symbol, then it's a symbol from the list.
    - Return the entry in `DATA` for the money, or `undefined` if the money is not found.
- `IsSize(string | symbol)`: Returns true if the given argument is a valid money. If the argument is a string, it will be an abbreviation. If a Symbol, then it's a symbol from the list.
