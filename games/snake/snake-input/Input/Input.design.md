# Input

The base class for all input devices.

## constructor(args)
Arguments are:
- `id` (String) - Optional. The id for the input. Defaults to a UUID.

## Properties
All properties are read-only.
- `driver`: The driver for this input.
- `id`: The id for this input

### Methods
- `setInputDriver(driver)`: Sets the driver for this input.
- `onChangeDirection(direction)`: Issues a GameEvent.INPUT_CHANGE_DIRECTION,
  - `id` (String) - the id of the input 
  - `direction` (Vector) - The direction to change to.
- `onChangeSpeed(speed)`: Issues a GameEvent.INPUT_CHANGE_DIRECTION,
  - `speed` (Number) - the new speed.
- `onGamePaused()`: Issues a GameEvent.GAME_PAUSED,
- `onGameEnded()`: Issues a GameEvent.GAME_EXIT,
- `onGameResumed()`: Issues a GameEvent.GAME_RESUMED.
- `onInput(event)`: Event that is fired by the input constructor. Calls one of the other routines.