# Snake Head

The design for the snake head in the Snake game.

## Constructor
All properties are set in the constructor, which takes the following key values:
1. `position` (Vector) - The initial position of the snake head in the game grid. Defaults to VectorFactory.Zero();
2. `direction` (Vector) - The initial movement direction of the snake head. Defaults to VectorFactory.Up();
3. `ui` (UI) - The user interface component for the snake head. Defaults to undefined.
4. `vectorFactory` (Vector) - The factory for creating vector instances. Required.
5. `game` (Game) - The game instance that the snake head belongs to. Required.

## Properties

### Private
1. `position`: (Vector) The current position of the snake head in the game grid.
2. `direction`: (Vector) The current movement direction of the snake head.
3. `ui`: (UI) The user interface component for the snake head.
4. `vectorFactory`: (Vector) The factory for creating vector instances.
5. `game`: (Game) The game instance that the snake head belongs to. 

### Public
All public properties are the be read-only (getter functions) unless specified otherwise.

1. `position`
2. `direction`

## Methods

### Private

### Public
1. `move(speed)`: Moves the snake head in the current direction at the specified speed. 
   1. `speed` (Number) - defaults to 1
   2. Saves the new position of the snake head
   3. Triggers the 'snake-move' event
   4. Checks for collisions with the walls, itself, or prizes
      1. Collision with wall triggers 'snake-collision-wall' event
      2. Collision with itself triggers 'snake-collision-self' event
      3. Collision with prize triggers 'snake-collision-prize' event
2. `changeDirection(newDirection)`: Changes the direction of the snake head.
   1. `newDirection` (Vector) - The new direction to change to
   2. Validates the new direction to ensure it is not opposite to the current direction
      1. Triggers 'snake-direction-invalid' event if the new direction is invalid
      2. 
   3. Saves the new direction
   4. Triggers the 'snake-direction-changed' event
3. `jump(position)`: Teleports the snake head to a new position.
   1. `position` (Vector) - The new position to jump to
   2. Validates the new position to ensure it is within game boundaries
      1. Triggers 'snake-jump-invalid' event if the new position is invalid
   3. Saves the new position
   4. Triggers the 'snake-jumped' event
   5. Checks for collisions with the walls, itself, or prizes
      1. Collision with wall triggers 'snake-collision-wall' event
      2. Collision with itself triggers 'snake-collision-self' event
      3. Collision with prize triggers 'snake-collision-prize' event
4. `reset()`: Resets the snake head to its initial state.
   1. Trigger the 'snake-reset' event
