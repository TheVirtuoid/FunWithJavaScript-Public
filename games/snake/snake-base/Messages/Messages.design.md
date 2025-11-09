# Messages

A repository for messages during the game

## Constructor
`new Messages(args)` - instantiates the class
- `args` - key/value collection which can contain the following:
  - `id` (String). The ID of the instance. Defaults to UUID.

## Properties

All properties are read-only unless otherwise noted.

- `id` (String) - the ID of the instance

## Methods

For all the methods, the following is the definition of the arguments:
- `messageId` (String) - the ID of the message. This will normally be one of the GameEvent constants
- `message` (String) - the message itself

The methods themselves
- `add(messageId, message)` - adds or replaces a message to the repository
- `get(messageId)` - retrieves a message.
- `getAll()` - retrieves all messages in the repository. Stored in a Map, with the key being the messageId, and the value being the message.
- `remove(messageId)` - removes a message from the repository
- `removeAll()` - removes all messages from the repository


## Default Messages:

Messages are stored internally in a private variable as a Map.

- `GameEvent.GAME_OVER`: 'Game over'
- `GameEvent.GAME_EVENT_INITIALIZED`: 'Game eventing system initialized'
- `GameEvent.SNAKE_COLLISION_WALL`: 'Collided with wall'
- `GameEvent.SNAKE_COLLISION_SELF`: 'Collided with self'
- `GameEvent.SNAKE_COLLISION_PRIZE`: 'Collided with prize'
- `GameEvent.SNAKE_MOVE`: 'Snake has moved'
- `GameEvent.SNAKE_DIRECTION_CHANGED`: 'Snake has changed direction'
- `GameEvent.SNAKE_JUMPED`: 'Snake has jumped'
- `GameEvent.INPUT_CHANGE_DIRECTION`: 'Change direction from input'
- `GameEvent.INPUT_CHANGE_SPEED`: 'Change speed from input'
- `GameEvent.INPUT_GAME_EXIT`: 'Game exit from input'
- `GameEvent.INPUT_GAME_PAUSE`: 'Game pause from input'
- `GameEvent.INPUT_GAME_RESUME`: 'Game resume from input'
- `GameEvent.INPUT_GAME_RESET`: 'Game reset from input'
- `GameEvent.INPUT_GAME_START`: 'Game start from input'
- `GameEvent.GAME_EXIT`: 'Game exit'
- `GameEvent.GAME_PAUSE`: 'Game pause'
- `GameEvent.GAME_RESUME`: 'Game resume'
- `GameEvent.GAME_RESET`: 'Game reset'
- `GameEvent.GAME_START`: 'Game start'
- `GameEvent.DEVICE_CHANGE_DIRECTION`: 'Change direction from device'
- `GameEvent.DEVICE_GAME_EXIT`: 'Game exit from device'
- `GameEvent.DEVICE_GAME_PAUSE`: 'Game pause from device'
- `GameEvent.DEVICE_GAME_RESUME`: 'Game resume from device'
- `GameEvent.UI_START_COUNTDOWN_COMPLETE`: 'Countdown start rendering complete'
- `GameEvent.UI_COUNTDOWN_COMPLETE`: 'Countdown rendering complete'
- `GameEvent.UI_COUNTDOWN_TICK_COMPLETE`: 'Countdown tick rendering complete'
- `GameEvent.UI_CLEAR_COUNTDOWN_COMPLETE`: 'Countdown clear rendering complete'
- `GameEvent.UI_CLEAR_GAME_OVER_COMPLETE`: 'Game over clear rendering complete'
- `GameEvent.UI_DRAW_GAME_OVER_COMPLETE`: 'Game over draw rendering complete'
- `GameEvent.UI_CLEAR_SCORE_COMPLETE`: 'Score clear rendering complete'
- `GameEvent.UI_UPDATE_SCORE_COMPLETE`: 'Score update rendering complete'
- `GameEvent.UI_DRAW_SCORE_COMPLETE`: 'Score draw rendering complete'
- `GameEvent.UI_CLEAR_PRIZE_COMPLETE`: 'Prize clear rendering complete'
- `GameEvent.UI_DRAW_PRIZE_COMPLETE`: 'Prize draw rendering complete'
- `GameEvent.UI_CLEAR_SNAKE_COMPLETE`: 'Snake clear rendering complete'
- `GameEvent.UI_DRAW_SNAKE_COMPLETE`: 'Snake draw rendering complete'
- `GameEvent.UI_UPDATE_SNAKE_COMPLETE`: 'Snake update rendering complete'
- `GameEvent.UI_CLEAR_PITCH_COMPLETE`: 'Pitch clear rendering complete'
- `GameEvent.UI_DRAW_PITCH_COMPLETE`: 'Pitch draw rendering complete'
- `GameEvent.UI_RESET_PITCH_COMPLETE`: 'Pitch reset rendering complete'
