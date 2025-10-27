# Score
Keeps account of the current score

## Constructor
- ` args()` - the arguments object. This object contains:
  - `score` (Number) - the starting score. Default 0.
  - `speed` (Number) - the starting speed. Default 0.
  - `level` (Number) - the starting level. Default 1.
  - `time` (Date) - the current time elapsed. Default 0.
  - `length` (Number) - the starting snake length. Default 0.

## Properties
All properties are read only unless otherwise specified.
- `score` (Number) - the starting score. Default 0.
- `speed` (Number) - the starting speed. Default 0.
- `level` (Number) - the starting level. Default 1.
- `time` (Date) - the current time elapsed. Default 0.
- `length` (Number) - the starting snake length. Default 0.

## Methods
- `incrementScore(value)` - updates the score by `value`. Defaults to 1. Can be negative
- `incrementSpeed(value)` - updates the speed by `value`. Defaults to 1. Can be negative
- `incrementLevel(value)` - updates the level by `value`. Defaults to 1.
- `incrementLength(value)` - updates the length by `value`. Defaults to 1.
- `setTime(value)` - the new time. Value is a Date object.