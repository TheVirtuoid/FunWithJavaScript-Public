# Segment

A segment is a unit of the snake's body.

## Constructor
`new Segment({ position, directiond, id })`
1. `position` (Vector) - initial position of the segment. Required
2. `direction` (Vector) - initial direction of the segment. Required
3. `id` (String) - unique identifier for the segment.

## Properties
All properties are read-only (getter functions) unless specified otherwise.

### Public
1. `position` (Vector) - position of the segment.
2. `direction` (Vector) - direction of the segment.
3. `id` (String) - unique identifier for the segment.
4. `segments` (Array of Vector) - the positions of the segments, in order.

## Methods

### Public

1. `move(speed)` - moves the segment in current direction with a speed.
   1. `speed` (Number) - speed of the segment. Default 1
2. `changeDirection(newDirection)` - changes the direction of the segment.
   1. `newDirection` (Vector) - new direction of the segment. Required
3. `getProjectedPosition(speed)` - returns the expected position based upon speed
   1. `speed` (Number) - the speed of the segment. Default 1
