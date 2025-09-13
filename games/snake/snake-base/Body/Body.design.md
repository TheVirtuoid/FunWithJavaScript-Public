# Body

The body of the snake. Everything but the head.

## Constructor
`new Body({ segments, id })`
1. `segments` (Array) - array of Segment instances that make up the body. Defaults to `[]`
2. `id` (String) - unique identifier for the body. Defaults to `uuid()`

## Properties

All properties are read-only (getter functions) unless specified otherwise.

### Public
1. `length` (Number) - number of segments in the body.
2. 'id' (String) - the body ID

## Methods

### Public
1. `grow({ position, direction })` - grow the body. Adds to beginning of array.
   1. `position` (Vector) - position of the new segment. Required
   2. `direction` (Vector) - direction of the new segment. Required
2. `getSegmentAt(index)` - get segment at index.
   1. `index` (Number) - index of the segment. Required
   2. Returns the Segment instance at the specified index, or `undefined` if index is out of bounds.
3. `collision(position)` - did the position collide?
   1. `position` (Vector) - position to check. Required
   2. Returns `true` if the position collides with any part of the body, `false` otherwise.
   3. Will also send the `SNAKE_COLLISION_SELF` event
