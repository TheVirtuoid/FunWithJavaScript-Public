# Prize

When the snake hits the prize, it gives points to the snake and disappears

## Constructor

1. `new Prize(options)` - A new prize
   - `id` (String) - the id of the prize. Defaults to UUID.
   - `type` (Enum) - the type of prize. Defaults to random prize determined by the game.
   - `value` (Number) - the value of the prize. Defaults to 1.
   - `pitch` (Pitch) - current pitch to help determine new location. Required.
   - `snake` (Snake) - current snake to help determine new location. Required.

## Properties
All properties are read-only.

1. `id` (String) - the id of the prize.
2. `type` (Enum) - the type of prize.
3. `value` (Number) - the value of the prize.
4. `position` (Vector) - the position of the prize.

## Methods

### Public
1. `collision(position)` - (Boolean) determines if a collision has occurred.
   - Returns `true` if prize and position match.
   - `position` (Vector) - the position to check.
2. `addBomb(position)` - adds a Bomb position (Vector)

### Private
1. `setPosition()` - determines the position of the prize. 
   - This is set when constructed by the calling program.