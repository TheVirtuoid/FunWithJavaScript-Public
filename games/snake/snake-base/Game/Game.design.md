# Game

The main Game class. Called from the module that is tied to the browser

## Constructor

`new Game({ id })`


## Properties
All properties are read-only unless otherwise noted.

1. `id` (String) - the id of the game instance.
2. `snakePosition` (Vector) - the current position of the snake. Derived from the snake head
3. `snakeDirection` (Vector) - the current direction of the snake. Derived from the snake head
4. `snakeBody` (Array of Vectors) - the current body of the snake. Derived from the snake body and snake head
5. `pitchDimentions` (Vector) - the dimensions of the pitch, assuming one corner is Vector.Zero(). Derived from the pitch
6. `gameEventInitialized` (Boolean) - whether the game event has been initialized.

## Methods

### Public

1. `emit(event, ...data)` - emits an event with data.
   - `event` (GameEvent Event) - name of the event. Required
   - `...data` (...any) - data to emit with the event. Can be any number of arguments.
2. `addPitch(pitch)` - adds a pitch to the game.
   - `pitch` (Pitch) - the pitch to add. Required
3. `addSnake(snake)` - adds a snake to the game.
   - `snake` (Snake) - the snake to add. Required
4. `addPrize(prize)` - adds a prize to the game.
   - `prize` (Prize) - the prize to add. Required

### Private
1. `#onGameOver()` - handles game over event.
    - sent by the following events:
2. `#onGameEventInitialized()` - handles game event initialized event.
3. `#onSnakeCollisionWall()` - handles snake collision with wall event.
4. `#onSnakeCollisionSelf()` - handles snake collision with self event.
5. `#onSnakeCollisionPrize(prize)` - handles snake collision with prize event.
   - `prize` (Prize) - the prize that was collided with.
6. `#onSnakeMove(newHead)` - handles snake move event.
   - `newHead` (Object) - the new head position of the snake.
7. `#onSnakeDirectionInvalid(direction)` - handles invalid snake direction event.
   - `direction` (String) - the invalid direction.
8. `#onSnakeDirectionChanged(newDirection)` - handles snake direction changed event.
   - `newDirection` (String) - the new direction of the snake.
9. `#onSnakeJumpInvalid(position)` - handles invalid snake jump event.
   - `position` (Object) - the position that was attempted to jump to.
10. `#onSnakeJumped(newHead)` - handles snake jumped event.
    - `newHead` (Object) - the new head position of the snake.
11. `#onSnakeReset()` - handles snake reset event.
12. `#onDetectWallCollision()` - handles detect wall collision event.
13. `#onDetectPrizeCollision()` - handles detect prize collision event.
14. `#onDetectSelfCollision()` - handles detect self collision event.
15. `#onInputMove(direction)` - handles input move event.
    - `direction` (String) - the direction to move.    
16. `#onGameExit()` - handles when player manually stops the game.
17. `#onGamePause()` - handles when player pauses the game.
18. `#onGameResume()` - handles when player resumes the game.
19. `#onGameReset()` - handles when player resets the game.
20. `#onGameStart()` - handles when player starts the game.