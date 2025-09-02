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
1. `move({ direction, speed })` - moves the snake
   1. If `direction` is provided, changes the direction of the snake before moving
   2. If `speed` is provided, changes the speed of the snake before moving
2. `grow()` - increases the length of the snake by 1 unit



