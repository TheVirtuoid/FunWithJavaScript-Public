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

1. `collidedWithWall()` - returns true if the snake has collided with a wall.
2. `collidedWithSelf()` - returns true if the snake has collided with itself.
3. `collidedWithPrize(prize)` - returns true if the snake has collided with the prize
4. `projectSnakePosition()` - projects the snake's next position based on its current direction and speed
5. `processInput(inputEvent)` - processes a generic input

#### Event Handlers
The list that follows each event handler describes the classes/methods that can send the event.

1. `#onGameOver()` - handles game over event.
    - sent by the following classes/methods:
    - `Game.#onSnakeCollisionWall`
    - `Game.#onSnakeCollisionSelf`
    - `Game.#onGameExit`
    - `Game.#onGameReset`
2. `#onGameEventInitialized()` - handles game event initialized event.
    - `GaneEvent.Setup`
3. `#onSnakeCollisionWall()` - handles snake collision with wall event.
    - `Game.#collidedWithWall`
4. `#onSnakeCollisionSelf()` - handles snake collision with self event.
    - `Game.#collidedWithSelf`
5. `#onSnakeCollisionPrize(prize)` - handles snake collision with prize event.
   - `prize` (Prize) - the prize that was collided with.
   - `Game.#collidedWithPrize`
6. `#onSnakeMove()` - handles snake move event.
   - `Game.#projectSnakePosition`
7. `#onSnakeDirectionChanged(newDirection)` - handles snake direction changed event.
   - `newDirection` (Vector) - the new direction of the snake.
   - `Game.#processInput`
8. `#onSnakeJumped({position, direction})` - handles snake jumped event.
   - `position` (Vector) - the new position of the snake.
   - `direction` (Vector) - the new direction of the snake. If not specified, the current direction is used
   - `Game.#onSnakeCollisionWall`
   - `Game.#onSnakeCollisionSelf`
9. `#onInput(inputEvent)` - handles generic input event.
10. `#onGameExit()` - handles when player manually stops the game.
11. `#onGamePause()` - handles when player pauses the game.
12. `#onGameResume()` - handles when player resumes the game.
13. `#onGameReset()` - handles when player resets the game.
14. `#onGameStart()` - handles when player starts the game.