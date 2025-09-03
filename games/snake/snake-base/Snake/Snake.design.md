# Snake

## Summary

The snake encompasses the head and the snake of the game.

## Constructor
`new Snake({ position, direction, speed, length })`
1. `position` (Vector) - initial position of the snake. Required
2. `direction` (Vector) - initial direction of the snake. Required
3. `speed` (Number) - initial speed of the snake. Default is 1
4. `length` (Number) - initial length of the snake. Default is 0

## Properties

### Public
1. `position` (Vector) - position of the snake. Derived from `head`
2. `speed` (Number) - how fast the snake is moving
3. `direction` (Vector) - the direction the snake is moving. Derived from `head`
4. `length` (Number) - the length of the snake. Derived from `body`

### Private
1. `head` (Head) - the head of the snake
2. `body` (Body) - the body of the snake

## Methods

### Public
1. `move(speed)` - moves the snake
   1. If `speed` is not provided, speed will be 1 unit
2. `grow()` - increases the length of the snake by 1 segment
3. `getBobySegment(index)` - returns a Segment of the body at the given index
   1. If `index` is out of range, returns `null`
4. `changeDirection(direction)` - changes the direction of the snake
   1. `direction` (Vector) - new direction of the snake. Required
5. `getProjectedPosition()` - return the new position based upon current direction and speed. Performs `move()` without moving the snake.
6. `setSpeed(speed)` - sets the speed of the snake
   1. `speed` (Number) - new speed of the snake. Required


