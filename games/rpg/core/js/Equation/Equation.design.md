# Equation

An equation parser using Hungarian Notation

## constructor
- An error will be thrown upon any attempt to instantiate

## Properties
There are no properties

## Methods
There are no methods

## Static Properties
There are no static properties

## Static Methods
- `Solve(equation)` - solves an equation
  - arguments
    - `equation(string)` - a string representation of the equation
  - throws an error if the equation is malformed

## Rules
- operators supported: `+`, `-`, `/`, `*`, `^`
- parenthesis are supported
- spaces are allowed and are ignored (for readability purposes)
- Equation must start with an operand, or the '+' or '-' operator (for positive / negative numbers).
  - The '+' is assumed if an operator begins 
- operands must either be numeric or a die roll (xyz). See the Dice class for more information
- Precedence rankings:
  - parenthesis
  - exponentiation
  - multiplication / division
  - addition / subtraction
    

## Examples

### Valid
- `1+1`
- `1+1-1`
- `2*2`
- `4/2`
- `2^4`
- `3*(1+2)`
- `3(1+2)` - implied multiplication
- `2d6+1` - A "2d6" die roll (which results in an operand), then add 1
- `3(2d6+1)`
- `3+(6*(4-3)*2d6/6)` - A more complicated example
- `+3+1`
- `-3+1`
- `+2d6`
- `1.5 * 2` - Decimals
- `(1 + 2) (3 + 4)` - Multiple implied multiplications
- `2d6 + 1d4` - Multiple die rolls
- `10 / (2 + 3)` - Order of operations
- `2 ^ 3 ^ 2` - Exponentiation right-associativity (if supported, otherwise left)
- `((1 + 1) * (2 + 2))` - Nested parentheses
- ` 1 + 2 ` - Spaces

### Invalid
- `*4+1` - begins with multiplication
- `/4+1` - begins with division
- `^4+1` - begins with exponentiation
- `4(3+1` - mismatch parenthesis
- `4+1)` - mismatch parenthesis
- `4+1+` - ends with operator (any operator will throw the error)
- `-2d6` - cannot have a negative number of die
- `2d+1` - missing die side argument to (xdy)
- `2+bad` - non-numeric as operand
- `2#3` - invalid operator
- `10 / 0` - Division by zero (optional depending on implementation)
- `1..2` - Malformed decimal
- `2 d 6` - Spaces inside die roll (if not allowed)
- `( )` - Empty parenthesis
- `()` - Empty parenthesis

