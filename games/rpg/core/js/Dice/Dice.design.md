# Dice

Allows for the rolling of dice.

## Constructor
- `new Dice(descriptor)` - creates a new instance of the Dice class with the attached descriptor
  - Throws error if the descriptor is invalid
  - This is optional

## Static Properties
- None

## Static Methods
- Roll(descriptor)
    - descriptor: string – describes how to roll the dice.
    - Returns: integer number – the result of the dice roll.
    - throws error if the descriptor is invalid

## Public Properties
All public properties are read-only
- descriptor: string – the descriptor associated with this instance.

## Methods
- roll(descriptor)
  - Identical to the static method `Roll`.
  - `descriptor` is optional. If no specified, use the descriptor associated with this instance.

## Examples
`const value = Dice.Roll('3d6')`
```
const characterAttributeDice = new Dice('3d6');
const value = characterAttributeDice.roll();

const randomDice = new Dice();
const randomValue = randomDice.roll('1d10');
```

## Descriptor Format

The descriptor has the following format:

`[x]dy`

where:
- `x` (optional) – the number of dice to throw. Integer. Defaults to 1
- `d` (required) – the physical letter 'd'. Both lower and upper case area accepted
- `y` (required) – the 'sides' of the dice. This can be any integer number between 2 and Number.MAX_SAFE_INTEGER 

### Valid examples
- `1d6`
- `2d8`
- `3D100`
- `d6`

### Invalid examples
- `1d`
- `1d1`
- `1d-1`
- `1d1.5`
- `1.5d6`

