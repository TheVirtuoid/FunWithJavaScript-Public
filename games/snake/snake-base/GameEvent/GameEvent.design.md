# GameEvent

Handles all event in the game. 

## Constructor

There is no constructor. Use static methods to create events.

## Properties

There are no properties.

## Methods

### Static

1. `Setup(game)` - sets up the interface to the Game object
   1. Sends out the `GameEvent.GAME_EVENT_INITIALIZED` event when completed.
2. `Emit(event, ...data)` - emits an event with data.
   1. `event` (String) - name of the event. Required
   2. `...data` (...any) - data to emit with the event. Can be any number of arguments.

## Events

All events are static in origin.

1. `GAME_OVER`: Emitted when the game is over;
2. `GAME_EVENT_INITIALIZED`: Emitted when the GameEvent object has been initialized. Sent by the `Setup` static method
3. `SNAKE_COLLISION_WALL`: Emitted when the snake collides with a wall
4. `SNAKE_COLLISION_SELF`: Emitted when the snake collides with itself
5. `SNAKE_COLLISION_PRIZE`: Emitted when the snake collides with a prize
6. `SNAKE_MOVE`: Emitted when the snake moves
7. `SNAKE_DIRECTION_INVALID`: Emitted when the snake tries to change direction to an invalid direction
8. `SNAKE_DIRECTION_CHANGED`: Emitted when the snake changes direction
9. `SNAKE_JUMP_INVALID`: Emitted when the snake tries to jump to an invalid position
10. `SNAKE_JUMPED`: Emitted when the snake jumps
11. `SNAKE_RESET`: Emitted when the snake is reset back to initial position
12. `DETECT_WALL_COLLISION`: Emitted when the game is checking for wall collisions
13. `DETECT_PRIZE_COLLISION`: Emitted when the game is checking for prize collisions
14. `DETECT_SELF_COLLISION`: Emitted when the game is checking for self collisions
15. `INPUT_MOVE`: Emitted when the user provides input to move the snake
