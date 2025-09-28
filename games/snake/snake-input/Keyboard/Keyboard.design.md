# Keyboard

A class that extends the Input class and implements keyboard input.

## Constructor
`new Keyboard(args)` - creates a new Keyboard instance with specified properties.
- `layout` (KeyboardLayout) - an object representing the keyboard layout. This will define the Up/Left/Right/Down keys. Required.
- `id` (String) - the id of the input. Defaults to `window.cyrpto.randomUUID()`.
- `driver` (Symbol) - the driver used for keyboard input. Defaults to `Keyboard.BROWSER`
  - Alternate value: `Keyboard.NODE`

## Properties

### Public
All properties are read-only unless otherwise noted.

- `id` (String) - the id of the input
- `layout` (KeyboardLayout) - the keyboard layout selected

## Events
All events have the payload of the KeyboardLayout value of the keystroke. The keystroke comes from the the `driver`
value passed in the constructor.

- `GameEvent.INPUT_CHANGE_DIRECTION` - Changes direction.
- `GameEvent.INPUT_GAME_PAUSED` - Pauses the game
- `GameEvent.INPUT_GAME_RESUMED` - Resumes the game
- `GameEvent.INPUT_GAME_EXIT` - Exits the game
