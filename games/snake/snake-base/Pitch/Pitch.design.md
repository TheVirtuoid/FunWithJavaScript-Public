# Pitch

The playing field on which the snake moves!

## Constructor
`new Pitch({ dimensions, id })`
1. `dimensions` (Vector) - dimensions of the pitch. Required
2. `id` (String) - unique identifier for the pitch.

## Properties

All properties are read-only (getter functions) unless specified otherwise.

### Public
1. `dimensions` (Vector) - dimensions of the pitch.
2. `id` (String) - unique identifier for the pitch.

## Methods

### Public
1. `collision(position)` - checks if a position collides with the perimeter pitch.
   1. `position` (Vector) - position to check. Required
   2. Returns `true` if the position collides with the perimeter, otherwise `false`.
   3. No event is thrown