 Money

A static class that defines all the monetary values in the game.

Any returned data will be copies of the data and not the original data.

## constructor
- Throws error if the constructor is called.

## Public Static Properties
- `PLATINUM`:  Symbol = 'platinum'
- `GOLD`: Symbol = 'gold'
- `ELECTRUM`: Symbol = 'electrum'
- `SILVER`: Symbol = 'silver'
- `COPPER`: Symbol = 'copper'
- `SYMBOLS`: Array[Symbol] = An array of all the symbols

## Private Static Properties
- `DATA`: Map<Symbol, Object> = A mapping of all the values. The object will contain:
    - `name` (string): The name of the money
    - `abbr` (string): The abbreviation of the money
    - `exchangeRate` (Array<number, string>): The number of "string" units that can be exchanged for 1 unit of this money. The "string" is the abbreviation of the money.

## Public Static Methods
- `GetMoney(string | symbol)`: Gets the data from `DATA` for the given argument. If the argument is a string, it will be an abbreviation. If a Symbol, then it's a symbol from the list.
    - Return the entry in `DATA` for the money, or `undefined` if the money is not found.
- `IsMoney(string | symbol)`: Returns true if the given argument is a valid money. If the argument is a string, it will be an abbreviation. If a Symbol, then it's a symbol from the list.
- `GetExchangeRate(number, stringFrom | symbolFrom, stringTo | symbolTo)`: Gets the exchange rate for the given amount of money from one type to another.
    - `number` - The amount of money to exchange.
    - `stringFrom | symbolFrom` - The abbreviation of the source money.
    - `stringTo | symbolTo` - The abbreviation or symbol of the target money.
    - Return the number of units of the target money that can be exchanged for the given amount of the source money.
    - Returns undefined if from or to is not a valid money.
