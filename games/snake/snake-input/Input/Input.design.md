# Input

The base class for all input devices.

## constructor(args)
Arguments are:
- `id` (String) - Optional. The id for the input. Defaults to a UUID.
- `vectorReference` (VectorReference) - Required. A vector reference. This is the static vector object reference, not an actual reference.
- `deviceReference` (DeviceReference) - Required. The device reference for this input.
- `deviceData` (DeviceData) - Optional. Depends upon what is expected by the device.

## Properties
All properties are read-only.
- `device`: The device for this input.
- `id`: The id for this input

## Methods
- `dispose` - Disposes the connection between it and the device.

## Events
- `GameEvent.INPUT_CHANGE_DIRECTION` - passes id of the device and the direction to change to.
  - `id` (String) - the id of the input 
  - `direction` (Vector) - The direction to change to.
- `GameEvent.INPUT_CHANGE_SPEED` - (future)
- `GameEvent.INPUT_GAME_PAUSED` - Pauses the game
  - `id` (String) - the id of the input
- `GameEvent.INPUT_GAME_RESET` - Resets the game
    - `id` (String) - the id of the input
- `GameEvent.INPUT_GAME_RESUMED` - Resumes the game
  - `id` (String) - the id of the input
